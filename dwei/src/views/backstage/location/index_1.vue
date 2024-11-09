<template>
  <div class="page">
    <el-card class="card">
      <div style="width: 40%;margin-right: 1%;display:flex;align-items: center;">
        <span style="width:50%;text-align:right;white-space: nowrap;">Map label name:</span>
        <el-select name="tagId" v-model="tagId" placeholder="Please select a map label name" size="large" @change="changeTagId">
          <el-option v-for="item in optionUwbList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <el-button :class="+(nowTag.status) == 1 ? 'active' : ''" title="search" @click="changeActive('1')">active</el-button>
      <el-button :class="+(nowTag.status) == 0 ? 'active' : ''" title="reset" @click="changeActive('0')">disable</el-button>
      <!-- <el-button :class="+(nowTag.status)==2 ? 'active' : ''" title="reset" >失活</el-button> -->
    </el-card>
    <div id="container"
      :style="`background-image: url('${nowImg.img}');width: ${nowImg.chang}px;height: ${nowImg.kuan}px;`">
      <!-- <img src="/app-dev/download/c3992e56-6cae-45a2-869e-2ae568e86c7c.jpg" class="" style="" alt=""> -->
      <div id="box"
        :style="`transition: top ${((((+(nowpublish.publishInterval)) || 1000)) / 1000)}s ease, left ${(((+(nowpublish.publishInterval))) / 1000)}s ease;`"
        @mouseenter="enterHandle" @mouseleave="leaveHandle">
        <div :class="`content ${contentheight}`">
          <h1>Positioning coordinates</h1>
          <div>X-axis<span>{{ nowX }}</span></div>
          <div>Y-axis<span>{{ nowY }}</span></div>
        </div>
      </div>
    </div>
    <el-card class="right">
      <div class="item">
        <span>IP: <i>{{ nowpublish.destinationIp || '无' }}</i></span>
        <span>port: <i>{{ nowpublish.destinationPort || '无' }}</i></span>
      </div>
      <div class="item">
        <span>time interval: <i>{{ nowpublish.publishInterval + 'ms' }}</i></span>
        <span>port status: <i>{{ nowpublish.status == 0 ? 'disable' : 'enable' }}</i></span>
      </div>
      <div class="item">
        <span>Current X-axis: <i>{{ nowX + 'PX' }}</i></span>
        <span>Current Y-axis: <i>{{ nowY + 'PX' }}</i></span>
      </div>
      <div class="item">
        <span>Initial X-axis: <i>{{ nowLocation.xcoordinate || '无' }}</i></span>
        <span>Initial Y-axis: <i>{{ nowLocation.ycoordinate || '无' }}</i></span>
      </div>
      <div class="item">
        <span>Map length: <i>{{ nowImg.chang + 'PX' }}</i></span>
        <span>Map width: <i>{{ nowImg.kuan + 'PX' }}</i></span>
      </div>
      <div class="item map">
        <span>Map Introduction: <i>{{ nowImg.remark || '无' }}</i></span>
      </div>
      <div class="item map">
        <span>Communication parameters: <i>{{ nowObjectBindings.communicationParameters || '无' }}</i></span>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Location',
}
</script>
<script setup lang="ts">
import { onMounted, ref, reactive, onBeforeUnmount, onBeforeMount, nextTick, watch } from "vue";
import { Plus, Edit, InfoFilled, Delete, Search, Brush } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getAllUwdListApi, getImgInfoApi, getlocationDataListApi, getlocationPublishListApi, upUwdApi, getObjectBindingsListApi } from '@/api/product/myapi'
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { getToken } from '@/utils/token-utils';
import { useRoute,useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
//下拉框列表
const optionUwbList = ref<any>([])
const optionLocationDataList = ref<any>([])
const optionLocationPublishList = ref<any>([])
const optionObjectBindingsList = ref<any>([])
const container = ref()
const box = ref()
const timer = ref()
const nowX = ref()
const nowY = ref()
const contentheight = ref('')
const tagId = ref<any>('')
const nowTag = ref<any>({})
const nowImg = ref<any>({})
const nowpublish = ref<any>({})
const nowLocation = ref<any>({})
const nowObjectBindings = ref<any>({})

onBeforeMount(() => {

  getOptionList()
})
//获取下拉框列表
const getOptionList = async () => {
  const res1: any = await getlocationDataListApi({ pageNum: 1000, pageSize: 1 })
  const res2: any = await getlocationPublishListApi({ pageNum: 1000, pageSize: 1 })
  const res3: any = await getObjectBindingsListApi({ pageNum: 1000, pageSize: 1 })
  optionLocationDataList.value = res1.records
  optionLocationPublishList.value = res2.records
  optionObjectBindingsList.value = res3.records
  getAllUwdListApi().then((res: any) => {
    optionUwbList.value = res
    nowTag.value = res[0]
    tagId.value = res[0].id
    const nowLocationData = res1.records.find((item: any) => item.tagId == res[0].id)
    nowLocation.value = nowLocationData || {}
    nowpublish.value = res2.records.find((item: any) => item.tagId == res[0].id)
    nowObjectBindings.value = res3.records.find((item: any) => item.tagId == res[0].id)
    nextTick(() => {
      if (res[0].status == 0) {
        console.log('disable')
        ElMessage.warning('该地图已禁用')
      } else {
        if(nowpublish.value.publishInterval){
          nowX.value = (+((nowLocationData || {}).xcoordinate)) || 0
          nowY.value = (+((nowLocationData || {}).ycoordinate)) || 0
          box.value.style.top = `${nowY.value}px`;
          box.value.style.left = `${nowX.value}px`;
            timer.value = setInterval(() => {
            moveBox()
            }, +(nowpublish.value.publishInterval))
        }else{
          nowX.value = 0
          nowY.value = 0
          box.value.style.top = `${nowY.value}px`;
          box.value.style.left = `${nowX.value}px`;
          timer.value = setInterval(() => {
            moveBox()
          }, 2000)
        }

      }
    })
    getImgInfoApi({ id: nowTag.value.mapId }).then((res: any) => {
      nowImg.value = res
    })
  })
}

onMounted(() => {
  container.value = document.getElementById('container');
  box.value = document.getElementById('box');
  // startWeizhi()
  // moveBox()
  // timer.value = setInterval(()=>{
  //   moveBox()
  // },1500)
})

let stepadd = 80; // 每次移动的步长
let stepMinus = -80; // 每次移动的步长
let constants = [80, -80, 0];  // 替换为你的常量值

function moveBox() {
  // 计算随机位置（考虑容器的边界和盒子的尺寸）
  const minX = 0; // 盒子的左边界
  const maxX = container.value.offsetWidth - box.value.offsetWidth; // 盒子的右边界
  const minY = 0; // 盒子的上边界
  const maxY = container.value.offsetHeight - box.value.offsetHeight; // 盒子的下边界

  let stepX = 0
  // 生成一个0到1之间的随机数
  const randomIndexX = Math.floor(Math.random() * constants.length);
  // 根据随机数返回对应的常量
  stepX = constants[randomIndexX];
  let stepY = 0
  // 生成一个0到1之间的随机数
  const randomIndexY = Math.floor(Math.random() * constants.length);
  // 根据随机数返回对应的常量
  stepY = constants[randomIndexY];

  // nowX.value = Math.random() * (maxX - minX) + minX;
  // nowY.value = Math.random() * (maxY - minY) + minY;

  if ((nowX.value + stepX) > maxX || (nowX.value + stepX) < minX) {
    nowX.value = nowX.value - stepX
  } else {
    nowX.value = nowX.value + stepX
  }
  if ((nowY.value + stepY) > maxY || (nowY.value + stepY) < minY) {
    nowY.value = nowY.value - stepY
  } else {
    nowY.value = nowY.value + stepY
  }

  // 使用CSS的transform属性也可以，但这里为了简单起见使用top和left
  box.value.style.top = `${nowY.value}px`;
  box.value.style.left = `${nowX.value}px`;
  console.log(nowX.value,nowX.value,stepX,stepY,timer.value)
  // 如果需要持续移动，可以在这里使用setTimeout或requestAnimationFrame来递归调用moveBox函数
}

const enterHandle = () => {
  clearInterval(timer.value);
  contentheight.value = 'contentheight'
}
const leaveHandle = () => {
  contentheight.value = ''
  if (nowTag.value.status == 0) {
    // ElMessage.warning('该地图已禁用')
  } else {
    timer.value = setInterval(() => {
      moveBox()
    }, +(nowpublish.value.publishInterval))
  }
}


onBeforeUnmount(() => {
  setTimeout(() => {
    clearInterval(timer.value);
    console.log('销毁')
  },500)
})

function startWeizhi() {
  // 计算随机位置（考虑容器的边界和盒子的尺寸）
  const minX = 0; // 盒子的左边界
  const maxX = container.value.offsetWidth - box.value.offsetWidth; // 盒子的右边界
  const minY = 0; // 盒子的上边界
  const maxY = container.value.offsetHeight - box.value.offsetHeight; // 盒子的下边界
  nowX.value = Math.random() * (maxX - minX) + minX;
  nowY.value = Math.random() * (maxY - minY) + minY;
}

const changeTagId = async (val: any) => {
  clearInterval(timer.value);
  nowTag.value = optionUwbList.value.find((item: any) => item.id == val)
  nowImg.value = await getImgInfoApi({ id: nowTag.value.mapId })
  const publish = optionLocationPublishList.value.find((item: any) => item.tagId == val)
  const ObjectBindings = optionObjectBindingsList.value.find((item: any) => item.tagId == val)
  const nowLocationData = optionLocationDataList.value.find((item: any) => item.tagId == val)
  ObjectBindings ? nowObjectBindings.value = ObjectBindings : nowObjectBindings.value = {}
  // console.log(nowLocationData)
  if (nowLocationData) {
    nowLocation.value = nowLocationData
    nowX.value = +(nowLocationData.xcoordinate)
    nowY.value = +(nowLocationData.ycoordinate)
    box.value.style.top = `${(nowY.value)}px`;
    box.value.style.left = `${nowX.value}px`;
  } else {
    nowLocation.value = {}
    ElMessage.warning('该地图未设置坐标，初始坐标为0,0')
    nowX.value = 0
    nowY.value = 0
    box.value.style.top = `${nowY.value}px`;
    box.value.style.left = `${nowX.value}px`;
    console.log(nowX.value, nowY.value)
  }
  // console.log(nowpublish.value)
  if (!publish) {
    nowpublish.value = { publishInterval: 2000 }
    ElMessage.warning('该地图未设置发布间隔，将使用默认值2000ms')
    if (nowTag.value.status == 0) {
      // ElMessage.warning('该地图已禁用')
    } else {
      timer.value = setInterval(() => {
        moveBox()
      }, 2000)
    }
  } else {
    nowpublish.value = publish
    if (nowTag.value.status == 0) {
      // ElMessage.warning('该地图已禁用')
    } else {
      timer.value = setInterval(() => {
        moveBox()
      }, +(nowpublish.value.publishInterval))
    }
  }
}

const changeActive = (status: any) => {
  nowTag.value.status = status
  // delete nowTag.value.createTime
  clearInterval(timer.value);
  upUwdApi(nowTag.value)
  if (status == 0) {
    ElMessage.success('已禁用')
  } else {
    moveBox()
    timer.value = setInterval(() => {
      moveBox()
    }, +(nowpublish.value.publishInterval))
    ElMessage.success('已开启')
  }
}

watch(route, () => {
  // getOptionList()
},{immediate:true})
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  position: relative;

  // background: red;
  #container {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // margin: auto;
    // z-index: -1;
    position: relative;

    #box {
      position: absolute;
      /* 绝对定位，以便使用top和left属性来移动 */
      // background-color: red; /* 盒子的颜色 */
      // transition: top 3s ease, left 3s ease; /* 平滑过渡效果 */
      width: 30px;
      height: 45px;
      background-image: url("@/assets/dingwei2.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;

      .content {
        transform: translate(-30px, -110px);
        width: 220px;
        // height: 0px;
        opacity: 0;
        padding: 10px;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 0 5px #ccc;
        transition: all 1s ease;
        position: relative;
      }

      .contentheight {
        height: auto;
        opacity: 1;
      }

      .content:after {
        content: '';
        position: absolute;
        bottom: -20px;
        /* 三角形的顶部位于盒子底部之上的10px */
        left: 20%;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 20px solid transparent;
        border-top: 30px solid #fff;
        /* 与盒子背景色相同或相近 */
      }
    }
  }

  .card {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 60px;
    z-index: 10;
    :deep(.el-card__body) {
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .active {
      background: rgb(125, 214, 241);
      box-shadow: 0 0 5px rgb(125, 214, 241);
    }
  }

  .right {
    flex: 1;
    height: 80%;
    margin-left: 20px;

    .item {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      span {
        font-size: 25px;
        font-family: 'youyuan';
        font-weight: 900;

        i {
          font-size: 22px;
          font-style: normal;
          font-family: 'youyuan';
          font-weight: 500;
        }
      }
    }

    .map {
      margin-top: 30px;
      width: 100%;

      span {
        font-size: 25px;
        font-family: '楷体';
        width: 100%;

        i {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
