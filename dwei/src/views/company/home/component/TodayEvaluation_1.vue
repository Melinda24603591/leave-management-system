<template>
  <div class="todayEvaluation">
    <div class="title">
      <div class="num"><span class="txt">1</span></div>
      <div class="box">
        <div class="shuxian"></div>
        <div class="name">Today's evaluation</div>
      </div>
    </div>
    <div class="today">
      <div class="attribute_item" v-for="(item, index) in data" :key="index">
        <div class="name">{{item.name}}</div>
        <div class="num">{{item.num}}</div>
        <div class="proportion">
          <span>{{item.increaseOrDecrease? 'Year-on-year growth' : 'Year-on-year decline'}}</span>
          <up-outlined v-if="item.increaseOrDecrease" />
          <down-outlined v-else />
          <span :class="item.increaseOrDecrease? 'percentage' : 'percentage active'">{{item.proportion}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive } from "vue";

//  const img = new URL('../../../assets/image/panel/1.png', import.meta.url).href;
const data = reactive([
  {
    name: 'Total number',
    num: 15,
    increaseOrDecrease: 1,
    proportion: 12
  },
  {
    name: 'Number of males',
    num: 79,
    increaseOrDecrease: 0,
    proportion: 2
  },
  {
    name: 'Number of females',
    num: 136,
    increaseOrDecrease: 1,
    proportion: 15
  },
  {
    name: 'Others',
    num: 57,
    increaseOrDecrease: 0,
    proportion: 2
  },
  {
    name: 'Completed',
    num: 5,
    increaseOrDecrease: 0,
    proportion: 5
  },
  {
    name: 'Uncompleted',
    num: 307,
    increaseOrDecrease: 0,
    proportion: 2
  },
  {
    name: 'Warning',
    num: 8,
    increaseOrDecrease: 1,
    proportion: 12
  },
  {
    name: 'In progress',
    num: 4,
    increaseOrDecrease: 1,
    proportion: 2
  }
]);
</script>

<style lang='less' scoped>
.todayEvaluation {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  // background: pink;
  .title {
    display: flex;
    padding: 2px 0;
    box-sizing: border-box;
    .num {
      width: 15px;
      height: 15px;
      line-height: 15px;
      border-radius: 0 50% 50% 50%;
      background: #d9001b;
      transform: rotate(-135deg);
      margin-top: 8px;
      // transform-box: translateX(-20px);
      .txt {
        display: inline-block;
        transform: rotate(135deg);
        text-align: center;
        width: 15px;
        height: 15px;
        color: #fff;
        border-radius: 0 50% 50% 50%;
      }
    }
    .box {
      border-bottom: 2px solid #20bfff;
      // width: 80px;
      padding-right: 5px;
      box-sizing: border-box;
      text-align: right;
      display: flex;
      transform: translateX(-7px);
      .shuxian {
        margin-left: 10px;
        width: 0;
        height: 25px;
        border-top: 4px solid transparent;
        border-left: 4px solid #2ba2f9;
        border-right: 4px solid transparent;
      }
      .name {
        flex: 1;
        margin-right: 5px;
        font-weight: 550;
        font-size: 18px;
      }
    }
  }
  .today {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-left: 20px;
    .attribute_item {
      width: 25%;
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .name {
        font-size: 18px;
      }
      .num {
        margin-top: 10px;
        color: #e8744c;
        font-weight: 550;
        font-size: 24px;
      }
      .proportion {
        font-size: 12px;
        color: #818385;
        .percentage {
          color: #f66f75;
        }
        .anticon-down {
          color: #94fad2;
        }
        .anticon-up {
          color: #f66f75;
        }
        .active {
          color: #94fad2;
        }
      }
    }
  }
}
</style>
