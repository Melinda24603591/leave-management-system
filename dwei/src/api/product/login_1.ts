import request from "@/utils/request";



//register
export const registerApi = (query:any) => {
    return request({
        url: '/register',
        method: 'get',
        params:query
    });
};

//登录
export const loginApi = (query:any) => {
    return request({
        url: '/login',
        method: 'get',
        params:query
    });
};




