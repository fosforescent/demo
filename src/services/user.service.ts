'use client'
// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js

import { BehaviorSubject } from 'rxjs'

import { fetchWrapper } from '../helpers/fetch-wrapper'

import { publicRuntimeConfig } from '@/app/config'


const baseUrl = `${publicRuntimeConfig.apiUrl}/users`
const userSubject = new BehaviorSubject(
  typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('user') || 'null'),
)

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  login,
  logout,
  register,
  getAll,
  getData,
  setData,
}

function getData(){
  return fetchWrapper.get(`${baseUrl}/${userSubject.value.id}`).then((user) => {
    userSubject.next(user)
    return user
  })
}

function setData(data: any){
  return fetchWrapper.post(`${baseUrl}/${userSubject.value.id}`, {...userSubject.value, ...data}).then((user) => {
    userSubject.next(user)
    return user
  })
}

function login(username: any, password: any) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }).then((user) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user)
    localStorage.setItem('user', JSON.stringify({...user}))
    return user
  })
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  // TODO: invalildate token on server

  localStorage.removeItem('user')
  userSubject.next(null)
  window.location.href = '/login'
}

function getAll() {
  return fetchWrapper.get(baseUrl)
}

function register(username: any, password: any) {
  return fetchWrapper.post(`${baseUrl}/register`, { username, password }).then((user) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user)
    localStorage.setItem('user', JSON.stringify(user))

    return user
  })
}
