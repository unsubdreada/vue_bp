import axios from 'axios'
import { useRegistrationStore } from '@/engine/authentication'
import router from './router'
import { firebaseConfig } from './firebaseCfg'

const axiosApiInstance = axios.create()

const API_KEY = firebaseConfig.apiKey

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url
  if (
    !url.includes('signInWithPassword') &&
    !url.includes('signUp') &&
    !url.includes('/contacts')
  ) {
    const authStore = useRegistrationStore()
    let params = new URLSearchParams()
    params.append('auth', authStore.userInfo.token)
    config.params = params
  }
  return config
})

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const authStore = useRegistrationStore()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
          {
            grant_type: `refresh_token`,
            refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
          }
        )
        console.log(newTokens.data)
        authStore.userInfo.token = newTokens.data.access_token
        authStore.userInfo.refreshToken = newTokens.data.refresh_token
        authStore.userInfo.uid = JSON.parse(localStorage.getItem('userTokens')).uid

        localStorage.setItem(
          'userTokens',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token,
            uid: authStore.userInfo.uid
          })
        )
      } catch (err) {
        console.log(err)
        localStorage.removeItem('userTokens')
        router.push('/authentication')
        authStore.userInfo.token = ''
        authStore.userInfo.refreshToken = ''
        authStore.userInfo.uid = ''
      }
    }
    //console.log(error.response.data.error.message)
    return Promise.reject(error)
  }
)

export default axiosApiInstance
