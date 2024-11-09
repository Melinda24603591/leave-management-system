export interface TrademarkModel {
  id?: number;
  logoUrl: string;
  tmName: string;
}

export type TrademarkListModel = TrademarkModel[];

export interface TrademarkPageListModel {
  total: number;
  records: TrademarkListModel;
}
