// stores/counter.js
import { defineStore } from "pinia";
import {
  getCategory1ListApi,
  getCategory2ListApi,
  getCategory3ListApi,
} from "@/api/product/category";
import type { CategoryStateModel } from "@/api/product/model/categoryModel";

export const useCategoryStore = defineStore("category", {
  state: (): CategoryStateModel => {
    return {
      // 以下三个属性用于收集用户真正选择的分类id
      category1Id: undefined,
      category2Id: undefined,
      category3Id: undefined,

      // 以下三个属性用于收集服务器返回的分类列表信息
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  actions: {
    // 请求一级列表
    async getCategory1List() {
      const re = await getCategory1ListApi();
      // 请求回来的数据赋值给category1List
      this.category1List = re;
    },

    async getCategory2List(id: number) {
      // 操作其他选项时,清空列表数据
      this.category2Id = undefined;
      this.category3Id = undefined;

      // 拿一级分类的id,然后渲染页面的一级分类
      this.category1Id = id;
      // 拿到一级分类的id去请求数据
      const re = await getCategory2ListApi(id);
      // 请求回来的数据赋值给category2List
      this.category2List = re;

      // 清空三级分类列表数据
      this.category3List = [];
    },

    async getCategory3List(id: number) {
      // 拿二级分类的id,然后渲染页面的二级分类
      this.category2Id = id;
      const re = await getCategory3ListApi(id);
      this.category3List = re;

      // 清空旧的三级分类数据
      this.category3Id = undefined;
    },

    setCategory3Id(id: number) {
      // 拿三级分类的id,然后渲染页面的三级分类
      this.category3Id = id;
    },
  },
  getters: {},
});
