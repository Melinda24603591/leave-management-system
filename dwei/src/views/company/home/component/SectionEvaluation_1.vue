<template>
   <div class="sectionEvaluation">
     <div class="title">
         <div class="num"><span class="txt">5</span></div>
         <div class="box">
            <div class="shuxian"></div>
            <div class="name">Column chart display</div>
         </div>
      </div>

      <div class="section">
          <v-chart ref="INSTANCE" autoresize :option="option"/>
      </div>
   </div>
</template>
<script setup lang='ts'>
    import { getHomelineListApi } from "@/api/product/home";
    import { LegendComponent, TitleComponent, DataZoomComponent } from 'echarts/components';
    import { BarChart } from 'echarts/charts';
    import { use } from "echarts/core";
    import { onMounted, ref , nextTick} from "vue";
    // import { any } from 'vue-types';
    use([LegendComponent, TitleComponent, BarChart, DataZoomComponent]);

    let INSTANCE = ref();

    let option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {},
        grid:{ // 让图表占满容器
            containLabel: true,
            top:"0px",
            left:"0px",
            right:"7%",
            bottom:"0px"
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            data: ['皮肤科','骨科','耳鼻喉科','脑科','内科','心理科', ]
        },
        series: {
            type: 'bar',
            data: [1200,1500,2400,3100,2100,3700],
            itemStyle:{
                color:'#5ccd8c'
            }
        }

    };


    onMounted(async()=>{
        const res:any =  await getHomelineListApi()
        option.series.data = res.x
        option.yAxis.data = res.y
        nextTick(()=>{
            INSTANCE.value.setOption(option);
        })
    })

</script>

<style lang='less' scoped>
    .sectionEvaluation{
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
        .section{
            // flex: 1;
            width: 100%;
            height: 100%;
            padding: 20px 30px;
        }
    }
</style>
