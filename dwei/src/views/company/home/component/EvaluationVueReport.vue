<template>
  <div class="evaluationVueReport">
    <div class="title">
      <div class="num"><span class="txt">2</span></div>
      <div class="box">
        <div class="shuxian"></div>
        <div class="name">Evaluation Report</div>
      </div>
    </div>
    <div class="report">
      <div class="left">
        <div class="report_left">
          <div><div class="icon"></div>Regular Report</div>
          <div>70%</div>
        </div>
        <div class="report_left">
          <div><div class="icon" style="background:#d3f8ff;"></div>Warning Report</div>
          <div style="color:#e8754e;">30%</div>
        </div>
      </div>
      <div class="center">
        <v-chart ref="INSTANCE" style="width:75%;height:75%;" autoresize />
      </div>
      <div class="right">
        <div class="report_right">
          <div>Completed Scale</div>
          <div>40%</div>
        </div>
        <div class="report_right">
          <div>Uncompleted Scale</div>
          <div>30%</div>
        </div>
        <div class="report_right">
          <div>Used Scale</div>
          <div>20%</div>
        </div>
        <div class="report_right">
          <div>Unused Scale</div>
          <div>10%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
    import { onMounted, ref,nextTick } from "vue";
    import 'echarts-liquidfill'
    let text1 = 16;
    let text2 = 22;
    let reportData = ref([0.75,0.7,0.7])

    const INSTANCE = ref();
    const option = {
        // backgroundColor: "#000", //背景色
        title: {
            text: '',
            textStyle: {
            fontSize: 20,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: "#fff",
            },
            x: "center",
            y: "48%",
        },
        series: [
            {
            type: "liquidFill", //配置echarts图类型
            radius: "90%",
            amplitude:8,
            center: ["50%", "50%"],
            //  shape: 'roundRect',// 设置水球图类型（矩形[rect]，菱形[diamond]，三角形[triangle]，水滴状[pin],箭头[arrow]...） 默认为圆形
            data: reportData.value,  //设置波浪的值
            //waveAnimation:false, //静止的波浪
            backgroundStyle: {
                borderWidth: 1,
                color: "rgb(211,248,255)",//水球图内部背景色
            },
            outline: {
                borderDistance: 0, //边界距离
                itemStyle: {
                borderWidth: 4,
                borderColor: "#024fff",
                },
            },
            color: [ //波浪颜色
                {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                    offset: 1,
                    color: "rgba(144,192,255,0.5)", //下
                    },
                    {
                    offset: 0,
                    color: "rgba(144,192,255,0.5)",
                    },
                ],
                globalCoord: false,
                },
                {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                    offset: 1,
                    color: "rgba(144,192,255,0.5)", //下
                    },
                    {
                    offset: 0,
                    color: "rgba(144,192,255,0.5)",
                    },
                ],
                globalCoord: false,
                },
                {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                    offset: 1,
                    color: "rgba(59,130,246,1)", //下
                    },
                    {
                    offset: 0,
                    color: "rgba(59,130,246,1)",
                    },
                ],
                globalCoord: false,
                },
            ],
            label: {
                show: true,
                fontSize: 14,
                position: ['50%', '50%'],
                color: 'rgba(254, 253, 244, 1.00)',
                // insideColor: 'rgba(244, 120, 34, 1.00)',
                formatter: '{total2|' + '总报告数' + '}' + '\n\r\n\r' + '{active|7631}',
                rich: {
                    total2: {
                        fontSize: 16,
                        fontFamily: "微软雅黑",
                    },
                    active: {
                        fontFamily: "微软雅黑",
                        fontSize: 22,
                    },
                }
            },
            },

        ],
    };

    onMounted(()=>{
        INSTANCE.value.clear()
        nextTick(()=>{
            INSTANCE.value.setOption(option);
        })
    //     window.addEventListener('resize', () => {
    //     INSTANCE.value.resize() //当浏览器窗口大小发生变化时，图表可以进行自适应
    //    })
    })

    // onBeforeUnmount(()=>{
    //     window.removeEventListener("resize", () => {
    //         INSTANCE.value.resize()
    //   });
    // })

</script>

<style lang='less' scoped>
    .evaluationVueReport{
        flex: 1;
        // background: sandybrown;
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

        .report{
           flex: 1;
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 0 30px;
           .left{
            display: flex;
            flex-direction: column;
              .report_left{
                    margin-bottom: 15px;
                    display: flex;
                    flex-direction: column;
                    div:nth-child(1){
                        display: flex;
                        align-items: center;
                        font-size: 18px;
                        .icon{
                            width: 7px;
                            height: 7px;
                            background: #129bff;
                            margin-right: 5px;
                        }
                    }
                    div:nth-child(2){
                        margin-top: 10px;
                        font-size: 26px;
                        color: #5ccd8c;
                        font-weight: 550;
                    }
              }
           }

           .center{
              flex: 1;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
           }

           .right{
               display: flex;
               flex-direction: column;
               .report_right{
                   display: flex;
                   flex-direction: column;
                   margin-bottom: 7px;
                   div:nth-child(1){
                    font-size: 12px;
                   }
                   div:nth-child(2){
                    font-size: 14px;
                    text-align: right;
                   }
               }
           }
        }
    }
</style>
