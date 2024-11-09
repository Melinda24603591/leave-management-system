<template>
   <div class="scaleEvaluation">
        <div class="title">
         <div class="num"><span class="txt">6</span></div>
         <div class="box">
            <div class="shuxian"></div>
            <div class="name">Scale evaluation</div>
         </div>
        </div>

        <div class="scale">
            <v-chart ref="INSTANCE" autoresize :option="option"/>
        </div>
   </div>
</template>
<script setup lang='ts'>

import { LegendComponent, TitleComponent, DataZoomComponent } from 'echarts/components';
import { BarChart ,PictorialBarChart,LineChart} from 'echarts/charts';
import { use } from "echarts/core";
import { onMounted, ref ,nextTick} from "vue";
use([LegendComponent, TitleComponent, BarChart,PictorialBarChart,LineChart, DataZoomComponent]);
let INSTANCE = ref();

let option = {
    tooltip: {
        trigger: 'axis',
        formatter: function (parms:any) {
            var str =
                '量表名称：' +
                parms[0].axisValue +
                '</br>' +
                parms[0].marker +
                '男性：' +
                parms[0].value +
                '</br>' +
                parms[1].marker +
                '女性：' +
                parms[1].value +
                '</br>' +
                parms[2].marker +
                '预警量表：' +
                parms[2].value +
                '</br>'
            return str;
        },
    },
    legend: {
         top: '0',
         left: 'center',
         icon:'circle',
         itemStyle:{
            // color:'#2276fc'
          },
    },
    dataZoom: [
        {
          // startValue: '2025.12',
          // type: 'inside',
          height: 15,
          type: "slider", //图表下方的伸缩条
          show: true, //是否显示
          realtime: true,
          start: 0,
		  endValue: 5, // 一次性展示5个。。
          bottom:5
        },
        {
          type: 'inside'
        }
  ],
    xAxis: {
        type: 'category',
        data: ['这是量表名称', '这是量表名称', '这是量表名称', '这是量表名称', '这是量表名称', '这是量表名称'],
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
    yAxis: {
        min:0,
        splitNumber:4,
        splitLine: {show: true,lineStyle:{type:'dashed'}},
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {show: true}

    },
    grid: {
        containLabel: true,
        left: '5%',
        top: '14%',
        bottom: '10%',
        right: '5%',
    },
    // color: ['#e54035'],
    series: [{
        name: '男性',
        type: 'pictorialBar',
        //位置偏移
        // barCategoryGap: '10%',
        //图形宽度
        barWidth:50,
        //图形形状
        symbol: 'triangle',
        symbolOffset: ['-25%', 0],//设置图形偏移值
        itemStyle: {
            normal: {
                opacity: 0.9,
                color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#21c9c7',
                        },
                        {
                            offset: 1,
                            color: '#90dbe5',
                        }
                    ],
                  },
            },
            emphasis: {
                opacity: 1
            }
        },
        data: [250, 140, 260, 340,  250, 160],
        z: 10
    },

    {
        name: '女性',
        type: 'pictorialBar',
        //位置偏移
        // barCategoryGap: '10%',
        //图形宽度
        barWidth:50,
        //图形形状
        symbol: 'triangle',
        symbolOffset: ['25%', 0],//设置图形偏移值
        itemStyle: {
            normal: {
                opacity: 0.9,
                color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#f8b544',
                        },
                        {
                            offset: 1,
                            color: '#eae5ee',
                        }
                    ],
                  },
            },
            emphasis: {
                opacity: 1
            }
        },
        data: [220, 240, 170, 210, 370, 250],
        z: 10
    },
    {
      name:'预警量表',
      data: [250, 140, 260, 340,  250, 160],
      type: 'line',
      symbolSize:8,
      itemStyle:{
        color:'#3e42fe',
      },
      lineStyle:{
        color:'#3e42fe',
        width:3
      }
    },
     {
      data: [0, 0, 0, 0, 0, 0],
      type: 'bar',
      barWidth:75,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    },

    // {
    //     name: 'glyph',
    //     type: 'pictorialBar',
    //     // barGap: '-50%',
    //     symbolPosition: 'end',
    //     symbolSize: 50,
    //     symbolOffset: [0, '-150%'],
    // },
    ]
};

onMounted(()=>{
    nextTick(()=>{
        INSTANCE.value.setOption(option);
    })

})


</script>

<style lang='less' scoped>
    .scaleEvaluation{
        flex: 1;
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

        .scale{
        width: 100%;
        height: 100%;
        // padding: 20px 30px;
        }
    }
</style>
