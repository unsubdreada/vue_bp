import axios from 'axios'
import { useRegistrationStore } from '@/engine/authentication'
import router from './router'

const axiosApiInstance = axios.create()

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE

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

        localStorage.setItem(
          'userTokens',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token,
          })
        )
      } catch (err) {
        console.log(err)
        localStorage.removeItem('userTokens')
        router.push('/authentication')
        authStore.userInfo.token = ''
        authStore.userInfo.refreshToken = ''
      }
    }
    console.log(error)
  }
)

export default axiosApiInstance