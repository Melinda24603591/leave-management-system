import { defineStore } from 'pinia';
import { getToken, removeToken, setToken,getMode,getLoginInfo } from '../utils/token-utils';
import type { UserInfoState } from './interface';
import {ElMessage} from 'element-plus'
import {staticRoutes,allAsyncRoutes,userAsyncRoutes,doctorAsyncRoutes} from '@/router/routes'
import { cloneDeep } from 'lodash';
import type { RouteRecordRaw } from 'vue-router';
import router from '@/router';
import { loginApi } from '@/api/product/login';

function filterAsyncRoutes(asyncRoutes: RouteRecordRaw[]){
  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{

    // if(routeObj.children&&routeObj.children.length>0){
    if(routeObj.children?.length){

      // 需要将children数组进行过滤,将过滤的结果放回children属性中
      routeObj.children = filterAsyncRoutes(routeObj.children);
    }

    return true;
  })
  
  return newAsyncRoutes;
}

function addRoutes(asyncRoutes:RouteRecordRaw[]){
  asyncRoutes.forEach((routeObj)=>{
    router.addRoute(routeObj)
  })
  // console.log(router.getRoutes())
}
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

	state: (): UserInfoState => ({
    token: getToken() as string,
    name: '',
    avatar: '',
    menuRoutes: [],
    loginMode:getMode() as number,
    // loginMode:0,
    userInfo:getLoginInfo() as Object
  }),

	actions: {
   async login (username: string, password: string,type:any) {
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     if (username==='admin' && password==='111111') {
      //       const token = 'token-atguigu'
      //       setToken(token)
      //       this.token = token
      //       resolve(token)
      //     } else {
      //       reject(new Error('用户名或密码错误!'))
      //       ElMessage.error('用户名或密码错误!')
      //     }
      //   }, 1000)
      // })
        const res:any = await loginApi({username,password,type})
        const token = 'token-atguigu'
        localStorage.setItem('mode',type)
        localStorage.setItem('loginInfo',JSON.stringify(res))
        setToken(res.token || token)
        this.token = res.token || token
        this.loginMode = type
        this.userInfo = res
        setTimeout(()=>{
          ElMessage.success(`欢迎${res.name}! 登录`)
        },1000)
        
    },

    getInfo () {
      return new Promise((resolve, reject) => {
        this.setRoutes();
        // const res:any = await getInfoApi({id:this.userInfo.id})
        // localStorage.setItem('loginInfo',JSON.stringify(res))
        // this.userInfo = res
        // this.name = res.name
        // this.avatar = res.profile || 'https://cdn.pixabay.com/animation/2022/12/05/15/23/15-23-06-837_512.gif'
        // resolve({name: this.name, avatar: this.avatar, token: this.token})
        setTimeout(() => {
          this.name = this.userInfo.name
          // this.avatar = 'https://cdn.pixabay.com/animation/2022/12/05/15/23/15-23-06-837_512.gif'
          // this.avatar = 'https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-33-168_512.gif'
          // this.name = 'admin'
          this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          resolve({name: this.name, avatar: this.avatar, token: this.token})
        }, 1000)
      })
    },

    async reset () {
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''
      this.userInfo={}
      localStorage.removeItem('loginInfo')
      // console.log(this.menuRoutes)
      await router.getRoutes().forEach((item:any,index)=>{
            router.removeRoute(item.name)
      })  
      addRoutes(staticRoutes)
    },

    setRoutes(){
      // 根据服务器返回的routeNames数组以及项目中切割出来的异步路由数组,实现异步过滤效果
      // 只留下用户能访问的异步路由信息
      let asyncRoutes:any = []
      // asyncRoutes = cloneDeep(allAsyncRoutes)
      // addRoutes(asyncRoutes);
      // this.menuRoutes = [...staticRoutes,...asyncRoutes];
      if(!this.loginMode){
        asyncRoutes = cloneDeep(allAsyncRoutes)
        addRoutes(asyncRoutes);
        this.menuRoutes = [...staticRoutes,...asyncRoutes];
      }else{
          asyncRoutes = cloneDeep(userAsyncRoutes)
          addRoutes(asyncRoutes);
          this.menuRoutes = [...staticRoutes,...asyncRoutes];
      }

    }
	},
});
