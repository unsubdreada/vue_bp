import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '@/api'
import { firebaseConfig } from '../firebaseCfg'

const API_KEY = firebaseConfig.apiKey

export const useRegistrationStore = defineStore('registration', () => {
  const userInfo = ref({
    token: '',
    refreshToken: '',
    uid: '',
    login: '',
    email: '',
    password: ''
  })
  const errorMessage = ref('')
  const authentication = async (payload, type) => {
    const stringUrl = type === 'signUp' ? 'signUp' : 'signInWithPassword'
    errorMessage.value = ''
    if (type === 'signUp') {
      if (!payload.email || !payload.password || !payload.confirmPassword) {
        errorMessage.value = 'Пожалуйста, заполните все поля'
        return
      }
      if (payload.password !== payload.confirmPassword) {
        errorMessage.value = 'Пароли не совпадают'
        return
      }
    }
    try {
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      userInfo.value = {
        token: response.data.idToken,
        refreshToken: response.data.refreshToken,
        uid: response.data.localId,
        login: payload.login,
        email: payload.email,
        password: payload.password
      }

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          uid: userInfo.value.uid
        })
      )
      if (type === 'signUp') {
        addUserOnDB(userInfo.value)
      }
    } catch (error) {
      switch (error.response.data.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage.value = 'Email уже зарегистрирован'
          break
        case 'OPERATION_NOT_ALLOWED':
          errorMessage.value = 'Операция запрещена'
          break
        case 'EMAIL_NOT_FOUND':
          errorMessage.value = 'Пользователь с таким Email не найден'
          break
        case 'INVALID_PASSWORD':
          errorMessage.value = 'Неверный пароль'
          break
        case 'USER_DISABLED':
          errorMessage.value = 'Пользователь заблокирован администратором'
          break
        default:
          errorMessage.value = 'Неизвестная ошибка'
          break
      }
      throw errorMessage.value
    }
  }

  const addUserOnDB = async (userInfo) => {
    try {
      const response = await axiosApiInstance.put(
        `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${userInfo.uid}.json`,
        {
          login: userInfo.login,
          email: userInfo.email,
          password: userInfo.password
        }
      )
      console.log('User added successfully:', response.data)
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const exit = () => {
    userInfo.value = {
      token: '',
      refreshToken: '',
      uid: '',
      email: '',
      password: ''
    }
  }
  return { authentication, userInfo, errorMessage, exit }
})
