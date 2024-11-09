// 非严格模式下,undefined和null是所有类型的子类型
// 但严格模式下不是
export type Numberable = number | undefined

export interface CategoryIdsModel {
  category1Id: Numberable;
  category2Id: Numberable;
  category3Id: Numberable;
}

export interface CategoryModel {
  id: number;
  name: string;
}

export type CategoryListModel = CategoryModel[];

// export interface CategoryStateModel {
//   category1Id: Numberable;
//   category2Id: Numberable;
//   category3Id: Numberable;

//   category1List: CategoryListModel;
//   category2List: CategoryListModel;
//   category3List: CategoryListModel;
// }

export interface CategoryStateModel extends CategoryIdsModel {
  category1List: CategoryListModel;
  category2List: CategoryListModel;
  category3List: CategoryListModel;
}

