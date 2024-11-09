<template>
  <div class="user-info-head" @click="editCropper()">
    <img :src="options.img" title="Click to upload avatar" class="img-circle"/>
    <el-dialog :title="title" v-model="open" width="800px" append-to-body align-center @opened="modalOpened" @close="closeDialog">
      <!-- <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :outputType="options.outputType"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar">
            <img height="120" :src="options.previews.url" :style="options.previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button>
              选择
              <el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button :icon="Plus" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button :icon="Minus" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button :icon="RefreshLeft" @click="rotateLeft()"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button :icon="RefreshRight" @click="rotateRight()"></el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button :type="primary" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row> -->
    </el-dialog>

  </div>
  <el-dialog
    v-model="centerDialogVisible"
    width="400"
    align-center
    center
  >
      <div class="box">
        <el-upload
            class="avatar-uploader"
            action="/app-dev/djangowenzhen/upload/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="options.img" :src="options.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
      </div>
</el-dialog>
</template>

<script lang="ts" setup>
import { ref ,defineProps,watch,reactive,getCurrentInstance} from 'vue'
import { VueCropper } from "vue-cropper";
import 'vue-cropper/dist/index.css'
import { Plus, Minus, RefreshLeft, RefreshRight ,Brush} from "@element-plus/icons-vue";
import { cloneDeep } from 'lodash';
import { upUserApi,uploadApi } from '@/api/product/myapi'
import { ElMessage } from "element-plus";
import { useUserInfoStore } from '@/stores/userInfo';

const userinfo = ref()
const userInfoStore = useUserInfoStore()
const { proxy } = getCurrentInstance();
const open = ref(false);
const visible = ref(false);
const title = ref("修改头像");
const previews = ref({})

const centerDialogVisible = ref(false)

//图片裁剪数据
const options = reactive<any>({
  img: userInfoStore.avatar,     // 裁剪图片的地址
  autoCrop: true,            // 是否默认生成截图框
  autoCropWidth: 200,        // 默认生成截图框宽度
  autoCropHeight: 200,       // 默认生成截图框高度
  fixedBox: true,            // 固定截图框大小 不允许改变
  outputType: "png",         // 默认生成截图为PNG格式
  filename: 'avatar',        // 文件名称
  previews: {}               //预览数据
});

/** 编辑头像 */
function editCropper() {
  centerDialogVisible.value = true;
}
/** 打开弹出层结束时的回调 */
function modalOpened() {
  visible.value = true;
}
/** 覆盖默认上传行为 */
function requestUpload() {}
/** 向左旋转 */
function rotateLeft() {
  proxy.$refs.cropper.rotateLeft();
}
/** 向右旋转 */
function rotateRight() {
  proxy.$refs.cropper.rotateRight();
}
/** 图片缩放 */
function changeScale(num) {
  num = num || 1;
  proxy.$refs.cropper.changeScale(num);
}
/** 上传预处理 */
function beforeUpload(file) {
  if (file.type.indexOf("image/") == -1) {
    proxy.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.img = reader.result;
      options.filename = file.name;
    };
  }
}
/** 上传图片 */
function uploadImg() {
  proxy.$refs.cropper.getCropBlob((data) => {
      // data.lastModifiedDate = new Date();
      // data.name = options.filename;
      // let formData = new FormData();
      // formData.append("avatarfile", result, options.filename);
      // await uploadApi(data)
      // ElMessage.success("上传成功");

      // open.value = false;
      // visible.value = false;
    blobToDataURI(data, async function (result) {
      const files = dataURLtoFile(result, options.filename)
      userinfo.value = cloneDeep(userInfoStore.userInfo)
      userinfo.value.profile = result
      console.log(result)

      await upUserApi(userinfo.value)
      // let formData = new FormData();
      // formData.append("avatarfile", result, options.filename);
      ElMessage.success("上传成功");
      open.value = false;
      visible.value = false;
    });

  });
}

const handleAvatarSuccess = async(res:any)=>{
   options.img = '/app-dev/djangowenzhen/download/?filename=' + res.data;
   userinfo.value = cloneDeep(userInfoStore.userInfo)
   userinfo.value.profile = options.img
   await upUserApi(userinfo.value)
   ElMessage.success('Modified successfully')
   userInfoStore.getInfo()
   centerDialogVisible.value = false;
}

//将base64转换为文件
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}


// blob 转 base64
function blobToDataURI(blob, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function (e) {
    callback(e.target.result);
  };
}


function realTime(data) {
  options.previews = data;
}
/** 关闭窗口 */
function closeDialog() {
  open.value = false
}
</script>

<style lang='scss' scoped>

.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
  left: 50%;
  transform: translateX(-50%);
  .img-circle{
    height: 120px !important;
    width: 120px;
    border-radius: 50%;
  }
}

.user-info-head:hover:after {
  content: "+";
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}

.avatar{
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  margin-top: 50%;
  transform: translateY(-50%);
}

.box{
 display: flex;
 justify-content: center;
 align-items: center;
 .avatar-uploader{
  height: 200px;
 }
}

</style>
