// const TokenKey = 'vue_admin_template_token'
// import { useUserInfoStore } from '@/stores/userInfo';

const TokenKey = "atguigu_admin_token";

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}


export function getMode(){
  const res:any =localStorage.getItem('mode')
  return JSON.parse(res)
}

export function getLoginInfo(){
  const res:any =localStorage.getItem('loginInfo')
  return JSON.parse(res)
}