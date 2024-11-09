import axios, { type AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import pinia from "@/stores/index";
import { useUserInfoStore } from "../stores/userInfo";
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

/* 定义response对象的data接口 */
interface ResponseData<T> {
  code: number;
  data: T;
  msg: string;
}

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// function toFormData(obj:any) {  
//   const formBody = [];  
//   for (const key in obj) {  
//     if (obj.hasOwnProperty(key)) {  
//       formBody.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));  
//     }  
//   }  
//   return formBody.join('&');  
// }  

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // if (config.data && typeof config.data === 'object') {  
  //   config.data = toFormData(config.data); // 使用上面的toFormData函数  
  //   (<any>config.headers)['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; // 设置正确的Content-Type  
  // }
  const userInfoStore = useUserInfoStore(pinia);
  NProgress.start()
  // 在发送请求之前做些什么 token
  if (userInfoStore.token) {
    (<any>config.headers)["token"] = userInfoStore.token;
  }
  return config;
});

// 添加响应拦截器
service.interceptors.response.use(
  /* 约束一下response */
  async (response: AxiosResponse<ResponseData<any>>) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code !== 20000 && res.code !== 200) {
      /* 成功数据的code值为20000/200 */
      // 统一的错误提示
      ElMessage({
        message:
          (typeof res.data == "string" && res.data) || res.msg || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // `token` 过期或者账号已在别处登录
      if (response.status === 401) {
        const storeUserInfo = useUserInfoStore(pinia);
        await storeUserInfo.reset();
        window.location.href = "/"; // 去登录页
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => {})
          .catch(() => {});
      }
      NProgress.done()
      return Promise.reject(service.interceptors.response);
    } else {
      NProgress.done()
      return res.data; /* 返回成功响应数据中的data属性数据 */
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    NProgress.done()
    return Promise.reject(error);
  }
);

export default service;
