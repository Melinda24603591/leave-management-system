<template>
  <div class="statisticsScale">
    <div class="statistics">
      <v-chart ref="INSTANCE" autoresize/>
    </div>
  </div>
</template>
<script setup lang='ts'>
import {getPie3D, getParametricEquation} from "@/utils/largeScreen"
import {TitleComponent} from 'echarts/components';
import {LegendComponent} from 'echarts/components';
import {PieChart} from "echarts/charts";
import {use} from "echarts/core";
import 'echarts-gl';
import {onMounted, ref, onBeforeUnmount} from "vue";

use([TitleComponent, LegendComponent, PieChart]);
let option1 = ref({})

let INSTANCE = ref();
onMounted(() => {
  intit()
})

function intit() {

  //初始化挂载
  const optionData = [
    {
      value: 20,
      heightValue: 600,
      name: 'Scale 1',
      itemStyle: {color: '#564af1'}
    },
    {
      value: 30,
      heightValue: 510,
      name: 'Scale 2',
      itemStyle: {color: '#2b8ef3'}
    },
    {
      value: 5,
      heightValue: 450,
      name: 'Scale 3',
      itemStyle: {color: '#e5489e'}
    },
    {
      value: 5,
      heightValue: 370,
      name: 'Scale 4',
      itemStyle: {color: '#3254dd'}
    },
    {
      value: 10,
      heightValue: 270,
      name: 'Scale 5',
      itemStyle: {color: '#bee5fb'}
    },
    {
      value: 10,
      heightValue: 200,
      name: 'Scale 6',
      itemStyle: {color: '#3cd495'}
    }
  ]
  const option = getPie3D(optionData, 0.8, 240, 30, 30, 0.6)
  INSTANCE.value.setOption(option)
  option1.value = option
  //添加配置
  INSTANCE.value.setOption(option)
  // 自适应
  // window.onresize = function () {
  //     INSTANCE.value.resize()
  // }
}

onMounted(() => {
  window.addEventListener('resize', () => {
    INSTANCE.value.resize() //当浏览器窗口大小发生变化时，图表可以进行自适应
    INSTANCE.value.setOption(option1.value)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    INSTANCE.value.resize()
  });
})
</script>

<style lang='less' scoped>
.statisticsScale {
  height: 100%;
  //  background: yellow;
  display: flex;
  justify-content: center;

  .statistics {
    width: 70%;
    height: 70%;
    // padding: 20px 30px;

  }
}
</style>
