import request from "@/utils/request";


//获取管理员列表
export const getAdminListApi = (query:any) => {
    return request({
        url: '/admin/list',
        method: 'get',
        params:query
    });
  };
  
  //添加管理员
  export const addAdminApi = (query:any) => {
    return request({
        url: '/admin/add',
        method: 'post',
        params:query
    });
  };
  
  //更新管理员
  export const upAdminApi = (query:any) => {
    return request({
        url: '/admin/edit',
        method: 'put',
        params:query
    });
  };
  
  //删除管理员
  export const deleteAdminApi = (query:any) => {
    return request({
        url: '/admin/delete',
        method: 'delete',
        params:query
    });
  };








