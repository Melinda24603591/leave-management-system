import request from "@/utils/request";


//获取设备系统列表
export const getEquipmentSystemListApi= (query:any) => {
    return request({
        url: '/failitySystem/list',
        method: 'get',
        params:query
    });
  };


//添加设备系统
export const addEquipmentSystemApi = (query:any) => {
    return request({
        url: '/failitySystem/add',
        method: 'post',
        params:query
    });
  };

//修改设备系统
export const upEquipmentSystemApi= (query:any) => {
    return request({
        url: '/failitySystem/edit',
        method: 'put',
        params:query
    });
  };

//删除设备系统
export const deleteEquipmentSystemApi = (query:any) => {
    return request({
        url: '/failitySystem/delete',
        method: 'delete',
        params:query
    });
};



export const getUsersListApi= () => {
    return request({
        url: '/user/getList',
        method: 'get',
    });
  };

//获取用户列表
export const getUserListApi= (query:any) => {
    return request({
        url: '/user/list',
        method: 'get',
        params:query
    });
  };


//添加用户
export const addUserApi = (query:any) => {
    return request({
        url: '/user/add',
        method: 'post',
        data:query
    });
  };

//修改用户
export const upUserApi= (query:any) => {
    return request({
        url: '/user/edit',
        method: 'put',
        data:query
    });
  };

//删除用户
export const deleteUserApi = (query:any) => {
    return request({
        url: '/user/delete',
        method: 'delete',
        params:query
    });
};


//获取申请列表
export const getleaveListApi= (data:any) => {
    return request({
        url: '/leave/getList',
        method: 'post',
        data:data
    });
  };
// 添加申请
  export const addleaveListApi= (data:any) => {
    return request({
        url: '/leave/add',
        method: 'post',
        data:data
    });
  };
  // 编辑申请
  export const editleaveListApi= (data:any) => {
    return request({
        url: '/leave/edit',
        method: 'post',
        data:data
    });
  };
  // 查看申请
  export const detailleaveListApi= (query:any) => {
    return request({
        url: '/leave/getInfo',
        method: 'get',
        params:query
    });
  };
  // 删除申请
  export const delleaveListApi= (query:any) => {
    return request({
        url: '/leave/delete',
        method: 'get',
        params:query
    });
  };


/////////////////////////////////////////////////
//获取类型列表
export const getTypeListApi= (data:any) => {
    return request({
        url: '/leaveType/getList',
        method: 'post',
        data:data
    });
  };
// 新增类型
  export const addTypeListApi= (data:any) => {
    return request({
        url: '/leaveType/add',
        method: 'post',
        data:data
    });
  };
  // 编辑类型
  export const editTypeListApi= (data:any) => {
    return request({
        url: '/leaveType/edit',
        method: 'post',
        data:data
    });
  };
  // 查看类型
  export const detailTypeListApi= (query:any) => {
    return request({
        url: '/leaveType/getInfo',
        method: 'get',
        params:query
    });
  };
  // 删除类型
  export const delTypeListApi= (query:any) => {
    return request({
        url: '/leaveType/delete',
        method: 'get',
        params:query
    });
  };


//   待审批列表
export const getPendingListApi= (data:any) => {
    return request({
        url: '/leave/getList',
        method: 'post',
        data:data
    });
  };

  export const approveApi= (data:any) => {
    return request({
        url: '/leave/sp',
        method: 'post',
        data:data
    });
  };

  //   我发起的审批列表
export const myApprovalApi= (data:any) => {
    return request({
        url: '/leave/getList',
        method: 'post',
        data:data
    });
  };

  export const approvalLogApi= (query:any) => {
    return request({
        url: '/Log/getList',
        method: 'get',
        params:query
    });
  };

  
  

//重置用户密码
export const resetPwdUserApi = (query:any) => {
    return request({
        url: '/user/resetPwd',
        method: 'post',
        data:query
    });
};




//获取uwd列表
export const getUwdListApi= (query:any) => {
    return request({
        url: '/uwbTags/list',
        method: 'get',
        params:query
    });
  };


//添加uwd
export const addUwdApi = (query:any) => {
    return request({
        url: '/uwbTags/add',
        method: 'post',
        data:query
    });
  };

//修改uwd
export const upUwdApi= (query:any) => {
    return request({
        url: '/uwbTags/edit',
        method: 'put',
        data:query
    });
  };

//删除uwd
export const deleteUwdApi = (query:any) => {
    return request({
        url: '/uwbTags/delete',
        method: 'delete',
        params:query
    });
};




//获取img列表
export const getImgListApi= (query:any) => {
    return request({
        url: '/sceneMaps/list',
        method: 'get',
        params:query
    });
  };


//添加img
export const addImgApi = (query:any) => {
    return request({
        url: '/sceneMaps/add',
        method: 'post',
        data:query
    });
  };

//修改img
export const upImgApi= (query:any) => {
    return request({
        url: '/sceneMaps/edit',
        method: 'put',
        data:query
    });
  };

//删除img
export const deleteImgApi = (query:any) => {
    return request({
        url: '/sceneMaps/delete',
        method: 'delete',
        params:query
    });
};




//获取位置信息列表
export const getlocationDataListApi= (query:any) => {
    return request({
        url: '/locationData/list',
        method: 'get',
        params:query
    });
  };


//添加位置信息
export const addlocationDataApi = (query:any) => {
    return request({
        url: '/locationData/add',
        method: 'post',
        data:query
    });
  };

//修改位置信息
export const uplocationDataApi= (query:any) => {
    return request({
        url: '/locationData/edit',
        method: 'put',
        data:query
    });
  };

//删除位置信息
export const deletelocationDataApi = (query:any) => {
    return request({
        url: '/locationData/delete',
        method: 'delete',
        params:query
    });
};





//获取位置发布列表
export const getlocationPublishListApi= (query:any) => {
    return request({
        url: '/locationPublishSettings/list',
        method: 'get',
        params:query
    });
  };


//添加位置发布
export const addlocationPublishApi = (query:any) => {
    return request({
        url: '/locationPublishSettings/add',
        method: 'post',
        data:query
    });
  };

//修改位置发布
export const uplocationPublishApi= (query:any) => {
    return request({
        url: '/locationPublishSettings/edit',
        method: 'put',
        data:query
    });
  };

//删除位置发布
export const deletelocationPublishApi = (query:any) => {
    return request({
        url: '/locationPublishSettings/delete',
        method: 'delete',
        params:query
    });
};





//获取对象绑定列表
export const getObjectBindingsListApi= (query:any) => {
    return request({
        url: '/objectBindings/list',
        method: 'get',
        params:query
    });
  };


//添加对象绑定
export const addObjectBindingsApi = (query:any) => {
    return request({
        url: '/objectBindings/add',
        method: 'post',
        data:query
    });
  };

//修改对象绑定
export const upObjectBindingsApi= (query:any) => {
    return request({
        url: '/objectBindings/edit',
        method: 'put',
        data:query
    });
  };

//删除对象绑定
export const deleteObjectBindingsApi = (query:any) => {
    return request({
        url: '/objectBindings/delete',
        method: 'delete',
        params:query
    });
};












//获取所有uwd列表
export const getAllUwdListApi = () => {
    return request({
        url: '/uwbTags/getList',
        method: 'get',
    });
};

//获取img列表所有
export const getAllImgListApi = () => {
    return request({
        url: '/sceneMaps/getList',
        method: 'get',
    });
};

//获取img列表所有
export const getImgInfoApi = (query:any) => {
    return request({
        url: '/sceneMaps/getInfo',
        method: 'get',
        params:query
    });
};