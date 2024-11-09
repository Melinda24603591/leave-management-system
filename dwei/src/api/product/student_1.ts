import request from "@/utils/request";
import type {
  TrademarkPageListModel,
  TrademarkModel,
} from "./model/TrademarkModel";

enum Api {
  getTrademarkPageListApi = "/admin/product/baseTrademark",
  saveTrademarkApi = "/admin/product/baseTrademark/save",
  updataTrademarkApi = "/admin/product/baseTrademark/update",
  deleteTrademarkApi = "/admin/product/baseTrademark/remove",
}

// 用于请求品牌管理模块的品牌分页列表数据
export const getTrademarkPageListApi = (page: number, limit: number) => {
  return request.get<any, TrademarkPageListModel>(
    `${Api.getTrademarkPageListApi}/${page}/${limit}`
  );
};

// 用于新增品牌数据
export const saveTrademarkApi = (trademark: TrademarkModel) => {
  return request.post<any, null>(Api.saveTrademarkApi, trademark);
};

// 用于更新品牌数据
export const updataTrademarkApi = (trademark: TrademarkModel) => {
  return request.put<any, null>(Api.updataTrademarkApi, trademark);
};
// 用于删除品牌数据
export const deleteTrademarkApi = (id:number) => {
  return request.delete<any, null>(`${Api.deleteTrademarkApi}/${id}`);
};
