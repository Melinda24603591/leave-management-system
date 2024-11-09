import request from "@/utils/request";

//获取列表
export const getList= (query:any) => {
    return request({
        url: '/routing/list',
        method: 'get',
        params:query
    });
  };


//添加Item
export const addItem = (query:any) => {
    return request({
        url: '/routing/add',
        method: 'post',
        params:query
    });
  };

//修改Item
export const upItem= (query:any) => {
    return request({
        url: '/routing/edit',
        method: 'put',
        params:query
    });
  };

//删除Item
export const deleteItem = (query:any) => {
    return request({
        url: '/routing/delete',
        method: 'delete',
        params:query
    });
};


