import request from "@/utils/request";

//获取新闻列表
export const getJournalisListApi = () => {
    return request({
        url: '/index/getJournalisList',
        method: 'get',
    });
  };

//获取推荐销售列表
export const getMarketListApi = (query:any) => {
    return request({
        url: '/index/getMarketList',
        method: 'get',
        params:query
    });
  };




