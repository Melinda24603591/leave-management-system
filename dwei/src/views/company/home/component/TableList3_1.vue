<template>
  <div class="table-wrap">
      <div class="title">
          <div class="num"><span class="txt">3</span></div>
          <div class="box">
              <div class="shuxian"></div>
              <div class="name">Recommended drug list</div>
          </div>
      </div>
      <el-table
        class="table-card-container"
        :data="tableData"
        max-height="300"
        style="width: 100%"
      >
        <template v-for="column in tableColumn">
          <el-table-column
            v-if="column.isShow"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :fixed="column.fixed"
            :width="column.width"
            :align="column.align"
          >
            <!-- :label="column.label" -->
            <!-- <template #header></template> -->
            <template #default="scope">
              <!-- <div v-if="column.label == '币种'" class="bz-icon">
                <img :src="getIcon(scope.row.bz)" />
                {{ scope.row.bz }}
              </div>
              <div v-if="column.label == '价格(24h%)'">
                <span
                  :class="{
                    'long-color': +scope.row.jg24 >= 0,
                    'short-color': +scope.row.jg24 < 0
                  }"
                >
                  {{ formatValue(scope.row.jg24, 'zfb') }}
                </span>
              </div> -->
            </template>
          </el-table-column>
        </template>
      </el-table>
  </div>
</template>
<script lang="ts">
export default {
  name: "TableList3",
};
</script>
<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import {
  Plus,
  Edit,
  InfoFilled,
  Delete,
  Search,
} from "@element-plus/icons-vue";
import { getMarketListApi } from "@/api/product/home";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";

onMounted(async()=>{
   const res = await getMarketListApi({status:1})
   tableData.value = res
})

const tableColumn = ref([
  {
    label: '药品ID',
    prop: 'id',
    fixed: false,
    width: 80,
    isShow: true,
    align: 'center'
  },
  {
    label: '药品名',
    prop: 'title',
    fixed: false,
    width: 120,
    isShow: true,
    align: 'center'
  },
  {
    label: '药品介绍',
    prop: 'remark',
    fixed: false,
    width: 340,
    isShow: true,
    align: 'center'
  },
  {
    label: 'Creation time',
    prop: 'createTime',
    fixed: false,
    width: 130,
    isShow: true,
    align: 'center'
  },
]);
const tableData = ref<any>([
  {
    pt: 'BTC',
    pm: '1',
    ccl: '123.32BTC',
    cce: '$131.32亿',
    zb: '1',
    ccbh1: '0.0032',
    ccbh4: '0.002',
    ccbh24: '0.0649',
    cc24cjl: '0.243243'
  }
])

</script>

<style lang="less" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  /* 取消input框自带的加减 */
}
.table-wrap{
    flex: 1;
    width: 100%;
    padding-right: 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .title{
         display: flex;
         padding: 2px 0;
         box-sizing: border-box;
         .num{
               width: 15px;
               height: 15px;
               line-height: 15px;
               border-radius: 0 50% 50% 50%;
               background:#d9001b ;
               transform: rotate(-135deg);
               margin-top: 8px;
               // transform-box: translateX(-20px);
               .txt{
                  display: inline-block;
                  transform: rotate(135deg);
                  text-align: center;
                  width: 15px;
                  height: 15px;
                  color: #fff;
                  border-radius: 0 50% 50% 50%;
               }
         }
         .box{
               border-bottom: 2px solid #20bfff;
               // width: 80px;
               padding-right: 5px;
               box-sizing: border-box;
               text-align: right;
               display: flex;
               transform: translateX(-7px);
               .shuxian{
                  margin-left: 10px;
                  width: 0;
                  height: 25px;
                  border-top: 4px solid transparent;
                  border-left: 4px solid #2ba2f9;
                  border-right: 4px solid  transparent;
               }
               .name{
                  flex: 1;
                  font-family: '楷体';
                  margin-right: 5px;
                  font-weight: 600;
                  font-size: 20px;
               }
         }

      }
}
.table-card-container {
     @gray-bg: #6eb8d8;
    // --el-table-border: none;
    --el-table-border-color:#252525;
    --el-table-row-hover-bg-color:@gray-bg;
    --el-fill-color-blank: @gray-bg;
    border-radius: 10px;
    transform: translateY(10%);
    :deep(.el-table__header) {
      .el-table__cell {
        padding: 0;
        height: 50px;
        background: @gray-bg;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
        color: #3f3838;

        // &.ascending {
        //   .caret-wrapper {
        //     .sort-caret.ascending {
        //       border-bottom-color: #0ECB81;
        //     }
        //   }
        // }

        // &.descending {
        //   .caret-wrapper {
        //     .sort-caret.descending {
        //       border-top-color: #0ECB81;
        //     }
        //   }
        // }
      }

    }

    :deep(.el-table__body) {

    //   .el-table__row:nth-child(2n) {
    //     background: @gray-bg;
    //   }

      // .el-table__body{
      //   background: @gray-bg;
      // }

      .el-table__row {
        padding: 0;
        height: 60px;
        font-family: DIN,DIN-Medium, arial, sans-serif;
        font-size: 14px;
        color: #FFFFFF;
        --el-table-tr-bg-color: @gray-bg;
        .el-table__cell{
          --el-bg-color: @gray-bg;
        }
      }
      // .hover-row{
      //   --el-table-row-hover-bg-color:@gray-bg;
      // }

    }
    :deep(.el-table__body-wrapper) {
      background-color: @gray-bg;
    }
    :deep(.el-pagination) {
      --el-pagination-bg-color: #fff;
      --el-pagination-button-disabled-bg-color: transparent;
      --el-pagination-button-disabled-color: #868E9B;
      --el-pagination-hover-color: #0ECB81;
      --el-pagination-button-color: #868E9B;
      --el-pagination-font-size: 14px;
      font-family: DIN-Medium, arial, sans-serif;
      margin-top: 50px;
      justify-content: center;

      .btn-prev .el-icon,
      .btn-next .el-icon {
        font-size: 15px;
      }
      .el-pager {
        .number {
          margin: 0 8px
        }
        .is-active {
          background: #0ECB81;
          color: #fff;
        }
      }
    }
  }
</style>
