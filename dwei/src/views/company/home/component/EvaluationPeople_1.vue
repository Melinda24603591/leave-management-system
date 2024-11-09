<template>
   <div class="evaluationPeople">
      <div class="title">
         <div class="num"><span class="txt">4</span></div>
         <div class="box">
            <div class="shuxian"></div>
            <div class="name">Pie chart display</div>
         </div>
      </div>

      <div class="people">
           <div class="piechart">
               <v-chart ref="INSTANCE" autoresize :option="option"/>
           </div>

      </div>
   </div>
</template>
<script setup lang='ts'>
   import { getHomePieListApi } from "@/api/product/home";
   import { TitleComponent } from 'echarts/components';
   import { LegendComponent } from 'echarts/components';
   import { PieChart } from "echarts/charts";
   import { use } from "echarts/core";
   import { onMounted, ref ,reactive, nextTick} from "vue";
   use([TitleComponent, LegendComponent,PieChart]);
    let INSTANCE = ref();

   let  option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

      const pieData = ref<any>([])

    onMounted(async()=>{
        const res = await getHomePieListApi()
        pieData.value = res
        option.series[0].data = res
      nextTick(()=>{
         INSTANCE.value.setOption(option);
      })

    })


</script>

<style lang='less' scoped>
   .evaluationPeople{
      flex: 1;
      // background: greenyellow;
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

      .people{
         display: flex;
         height: 100%;
         .piechart{
            transform: translateX(50%);
            width: 45%;
            display: flex;
            align-items: center;
            justify-content: center;
         }

      }
   }
</style>
