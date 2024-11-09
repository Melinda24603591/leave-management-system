export interface AttrValueModel{
  id?: number
  valueName: string
  attrId?: number
  isEdit?:boolean
}

export type AttrValueListModel = AttrValueModel[]

export interface AttrModel {
  // ?号的使用场景就是新增没有,修改有
  id?: number,
  attrName: string
  // 该属性必须要有,只是刚开始的时候不知道值是多少,最后用的时候会有值
  categoryId: number | undefined
  categoryLevel: number
  attrValueList:AttrValueListModel
}

export type AttrListModel = AttrModel[]