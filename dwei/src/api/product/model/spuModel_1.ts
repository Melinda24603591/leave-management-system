export interface SpuPageListModel {
  total: number;
  records: SpuListModel;
}

export type SpuListModel = SpuModel[]

export interface SpuModel {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number;
  // 所属品牌id,必有
  tmId: number | undefined;
  spuSaleAttrList: null;
  spuImageList: null;
}
