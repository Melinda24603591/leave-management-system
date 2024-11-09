<template>
  <el-card>
    <el-form :inline="true" label-width="120px" :disabled="disabled">
      <el-form-item label="一级分类">
        <el-select v-model="category1Id" placeholder="Please choose">
          <el-option
            v-for="(category1, index) in categoryStore.category1List"
            :key="category1.id"
            :label="category1.name"
            :value="category1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="category2Id" placeholder="Please choose">
          <el-option
            v-for="(category2, index) in categoryStore.category2List"
            :key="category2.id"
            :label="category2.name"
            :value="category2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="category3Id" placeholder="Please choose">
          <el-option
            v-for="(category3, index) in categoryStore.category3List"
            :key="category3.id"
            :label="category3.name"
            :value="category3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "CategorySeletor",
};
</script>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useCategoryStore } from "@/stores/category";

interface Props{
  disabled:boolean
}
const props = defineProps<Props>()

const categoryStore = useCategoryStore();

const category1Id = computed({
  get() {
    return categoryStore.category1Id;
  },
  set(id: any) {
    // 调用pinia中的getCategory2List方法传id回去
    categoryStore.getCategory2List(id);
  },
});

const category2Id = computed({
  get() {
    return categoryStore.category2Id;
  },
  set(id: any) {
    // 调用pinia中的getCategory3List方法传id回去
    categoryStore.getCategory3List(id);
  },
});

const category3Id = computed({
  get() {
    return categoryStore.category3Id;
  },
  set(id: any) {
    // 调用pinia中的getCategory3List方法传id回去使其能渲染页面
    categoryStore.setCategory3Id(id);
  },
});

// 请求数据
onMounted(() => {
  // 调用pinia中的getCategory1List方法
  categoryStore.getCategory1List();
});
</script>

<style scoped></style>
