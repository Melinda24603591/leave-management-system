<template>
   <div class="monthEvaluation">
        <div class="title">
         <div class="num"><span class="txt">3</span></div>
         <div class="box">
            <div class="shuxian"></div>
            <div class="name">Monthly evaluation</div>
         </div>
      </div>

       <div class="month">
           <v-chart ref="INSTANCE" autoresize />
       </div>
   </div>
</template>
<script setup lang='ts'>
import { onMounted, ref,nextTick } from "vue";
import { LegendComponent, TitleComponent, DataZoomComponent } from 'echarts/components';
import { BarChart ,PictorialBarChart} from 'echarts/charts';
import { use } from "echarts/core";
// import { any } from 'vue-types';
use([LegendComponent, TitleComponent, BarChart,PictorialBarChart, DataZoomComponent]);
let INSTANCE = ref();


var xList = ['2014', '2015', '2016', '2017', '2018', '2019', '2020'];
var bottomList = [1, 1, 1, 1, 1, 1, 1];
var typeOneList = [10, 50, 100, 35, 55, 30, 20] ; //上衣
var typeTwoList = [15, 25, 90, 40, 26, 30, 20] ; //裤子

var HighestList = ref<any>([]);
var topList = ref<any>([]);


let option = {
   //  backgroundColor: '#000E1A', //背景色
    tooltip: {
        trigger: 'axis',
       formatter: function (parms:any) {
            var str =
                '年份：' +
                parms[0].axisValue +
                '</br>' +
                parms[0].marker +
                '男性客户：' +
                parms[0].value +
                '</br>' +
                parms[1].marker +
                '女性客户：' +
                parms[1].value +
                '</br>'
            return str;
        },
    },
    textStyle: {
        color: '#C9C9C9',
    },

    // color: ['#fbc292', '#06fbfe',  '#f06e91'],
    legend: {
         top: '0',
         left: 'center',
         icon:'circle',
         itemStyle:{
            // color:'#2276fc'
          },
    },
    grid: {
        containLabel: true,
        left: '5%',
        top: '14%',
        bottom: '10%',
        right: '5%',
    },
    xAxis: {
        type: 'category',
        data: xList,
        axisLine: {
            show: true,
            lineStyle: {
                color: '#3f6796',
                width:2,
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            margin: 5, //刻度标签与轴线之间的距离。
            textStyle: {
                fontFamily: 'Microsoft YaHei',
                color:'black'
            },
            fontStyle: 'bold',
        },
    },
    yAxis: [
        {
            type: 'value',
            splitNumber:4,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#B5B5B5',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    type: "dashed",
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    fontFamily: 'Microsoft YaHei',
                    color: 'black',
                },

            },
        },
        {
            show: false,
            type: 'value',
        },
    ],
    series: [
        {
            type: 'bar',
            name: '男性客户',
            data: typeOneList,
            stack: 'zs',
            barMaxWidth: 'auto',
            barWidth: 40,
            itemStyle: {
                color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#5b88b5',
                        },
                        {
                            offset: 0.5,
                            color: '#5b88b5',
                        },
                        {
                            offset: 0.5,
                            color: '#5cb5e6',
                        },
                        {
                            offset: 1,
                            color: '#5cb5e6',
                        },
                    ],
                },
            },
        },

        {
            name: '女性客户',
            type: 'bar',
            data: typeTwoList,
            stack: 'zs',
            barMaxWidth: 'auto',
            barWidth: 40,
            itemStyle: {
                color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#7a7efe',
                        },
                        {
                            offset: 0.5,
                            color: '#7a7efe',
                        },
                        {
                            offset: 0.5,
                            color: '#9ca0fe',
                        },
                        {
                            offset: 1,
                            color: '#9ca0fe',
                        },
                    ],
                },
            },
        },


        {
            data: bottomList, // 最小面平面
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            // symbolOffset: [0, '50%'],
            symbolSize: [40, 10],
            zlevel: 2,
            itemStyle: {
                normal: {
                    color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#5b88b5',
                        },
                        {
                            offset: 0.5,
                            color: '#5b88b5',
                        },
                        {
                            offset: 0.5,
                            color: '#5cb5e6',
                        },
                        {
                            offset: 1,
                            color: '#5cb5e6',
                        },
                    ],
                  },
                },
            },
        },
        {
            data: topList.value, // 第一个和第二个之间平面
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [40, 10],
            zlevel: 2,
            itemStyle: {
                normal: {
                    color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#59aed1',
                        },
                        {
                            offset: 0.5,
                            color: '#59aed1',
                        },
                        {
                            offset: 0.5,
                            color: '#6fdefa',
                        },
                        {
                            offset: 1,
                            color: '#6fdefa',
                        },
                    ],
                  },
                },
            },
        },
        {
            data: HighestList.value, // 最上方平面
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [40, 10],
            zlevel: 2,
            itemStyle: {
                normal: {
                    color: '#5d60fe',
                },
            },
        },
    ],
};

onMounted(()=>{

   for (let i = 0; i < typeOneList.length; i++) {
      HighestList.value.push(typeOneList[i] + typeTwoList[i]);
   }
   for (let i = 0; i < typeOneList.length; i++) {
      topList.value.push(typeOneList[i]);
   }
   nextTick(()=>{
    INSTANCE.value.clear()
    INSTANCE.value.setOption(option);
   })

})

</script>

<style lang='less' scoped>
   .monthEvaluation{
    width: 50%;
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
                  margin-right: 5px;
                  font-weight: 550;
                  font-size: 18px;
               }
         }

    }

    .month{
      width: 100%;
      height: 100%;
      // padding: 20px 30px;
    }
   }
</style>
