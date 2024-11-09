<template>
  <el-card class="content search">
    <div style="width: 15%;margin-right: 1%;display:flex;align-items: center;">
      <span style="width:30%;text-align:right;white-space: nowrap;">name:</span>
      <el-input  v-model="searchForm.name" @input="$event ? searchForm.name = $event : searchForm.name = null"  clearable label="name"  autocomplete="off" />
    </div>
    <el-button type="success" :icon="Search" title="search" @click="getUserListRequset(1)">search</el-button>
    <el-button type="danger" :icon="Brush" title="reset" @click="getUserListRequset(0)">reset</el-button>
  </el-card>

  <el-card class="content">
     <el-button type="primary" :icon="Plus" @click="()=>dialogFormVisible=true">add</el-button>

      <el-table :data="tableData" border max-height="480" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="width: 100%; margin-top: 10px;">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="name" label="name"/>
        <el-table-column prop="chang" label="long(px)"/>
        <el-table-column prop="kuan" label="width(px)"/>
        <el-table-column prop="remark" label="introduce"/>
        <el-table-column prop="img" label="image">
          <template #default="scope">
            <img :src="scope.row.img" width="150"  alt="">
          </template>
        </el-table-column>
        <el-table-column label="operation" width="200">
          <template #default="scope">
            <el-button type="text" :icon="Edit" title="update" @click="updataUser(scope.row)">update</el-button>
            <el-button type="text" :icon="InfoFilled" title="details" style="color:#8e8d8d" @click="lookUserInfo(scope.row)">details</el-button>
            <el-popconfirm title="Are you sure to delete it?" @confirm="deleteUser(scope.row)">
                    <template #reference>
                        <el-button type="text" :icon="Delete" title="delete" style="color:red">delete</el-button>
                    </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 10px"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 6, 9, 12]"
        layout="prev, pager, next, jumper, ->, sizes, total "
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="35%" align-center style="border-radius:10px;" @close="reseForm">
    <el-form :model="form" :rules="userRules" ref="formRef">
      <el-form-item label="name" prop="name" :label-width="80">
        <el-input name="name" v-model="form.name" placeholder="Please fill in the name" autocomplete="off" size="large" :disabled="formState"/>
      </el-form-item>
      <el-row>
          <el-col :span="12">
            <el-form-item label="long(px)" prop="chang" :label-width="80">
              <el-input-number name="chang" v-model="form.chang"  placeholder="500-850" :min="500" :max="850" autocomplete="off" size="large" :disabled="formState"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="width(px)" prop="kuan" :label-width="80">
              <el-input-number name="kuan" v-model="form.kuan"  placeholder="300-500" :min="300" :max="500" autocomplete="off" size="large" :disabled="formState"/>
            </el-form-item>
          </el-col>
      </el-row>
      <el-form-item label="Image Introduction" prop="remark" :label-width="80">
        <el-input type="textarea" name="remark" v-model="form.remark" placeholder="Please fill in the image description" maxlength="50" show-word-limit autocomplete="off" size="large" :disabled="formState"/>
      </el-form-item>
      <el-form-item label="upload" prop="img" :label-width="80">
        <el-upload
            class="avatar-uploader"
            action="/app-dev/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept=".jpg,.png,.jpeg,.webp"
            :disabled="formState"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="closeDialog">cancel</el-button>
        <el-button type="primary" v-if="!formState" @click="submitDialog">
          submit
        </el-button>
      </div>
    </template>
          <!-- <el-select
          name="status"
          v-model="searchForm.name"
          placeholder="请选择物料"
          size="large"
          style="width: 65%;"
          @clear="getUserListRequset(1)"
          clearable
      >
          <el-option v-for="item in optionList" :key="item.id" :label="item.name" :value="item.name" />
      </el-select> -->
  </el-dialog>

</template>
<script lang="ts">
export default {
  name: 'Img',
}
</script>
<script setup lang="ts">
  import { onMounted, ref ,reactive} from "vue";
  import { Plus, Edit, InfoFilled, Delete ,Search,Brush} from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import { getImgListApi , addImgApi ,upImgApi,deleteImgApi} from '@/api/product/myapi'
  import type { FormInstance } from 'element-plus';
  import { cloneDeep } from 'lodash';
//下拉框列表
  const optionList = ref<any>([])

  const formState = ref(false)
  const setoraddState = ref(0)
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(0);
  const dialogTitle = ref('add')

  const dialogFormVisible = ref(false)
  const formRef = ref<FormInstance>()
  const searchForm = ref<any>({
    // name:'',
    pageNum:pageSize.value,
    pageSize:currentPage.value
  })
  const form = ref<any>({})

  const imageUrl = ref('')


  const validateName = (rule: any, value: any, callback: any) => {
      if (!value) {
          callback(new Error("Cannot be empty"));
      } else {
          //校验通过
          callback();
      }
  }


  const userRules = ref<any>({
    name:[{ required: true,  validator: validateName }],
    chang:[{ required: true,  validator: validateName }],
    kuan:[{ required: true,  validator: validateName }],
    remark:[{ required: true,  validator: validateName }],
  })

  const tableData = ref([

  ]);

  onMounted(async()=>{
    getUserListRequset()
  })

  const getUserListRequset = async(pagenow?:any)=>{
       if(!pagenow){
        searchForm.value = {pageNum:pageSize.value,pageSize:1}
       }
       const res:any = await getImgListApi(searchForm.value)
       tableData.value = res.records
       total.value = res.total
  }

  const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    searchForm.value.pageSize = page
    getUserListRequset(1)
  };

  const handleSizeChange = (limit: number) => {
    currentPage.value = 1;
    pageSize.value = limit;
    searchForm.value.pageNum = limit
    getUserListRequset(1)
  };

  //关闭对话框的回调
  const closeDialog = ()=>{
    reseForm()
  }

  //重置表单
  const reseForm = async()=>{
    imageUrl.value = ''
    dialogTitle.value = 'add'
    formState.value = false
    setoraddState.value = 0
    dialogFormVisible.value = false
    formRef.value?.resetFields()
      form.value ={}
  }

  //提交对话框更新或修改
  const submitDialog = async()=>{
     formRef.value?.validate().then(async()=>{
      if(setoraddState.value){
        await upImgApi(form.value)
        getUserListRequset()
        ElMessage.success('Modified successfully')
        reseForm()
     }else{
      await addImgApi(form.value)
      getUserListRequset()
      ElMessage.success('Added successfully')
      reseForm()
     }
     }).catch(()=>{
       ElMessage.warning('Please fill in the information')
     })

  }

  //修改对话框
  const updataUser = (item:any)=>{
    dialogTitle.value = 'update'
    imageUrl.value = item.img
    form.value = cloneDeep(item)
    setoraddState.value = 1
    dialogFormVisible.value = true
  }

  //删除该用户
  const deleteUser = async(item:any)=>{
       await deleteImgApi({id:item.id})
       getUserListRequset()
       ElMessage.success('Delete successfully')
  }

  //查看用户信息
  const lookUserInfo =(item:any)=>{
    dialogTitle.value = 'information'
    imageUrl.value = item.img
    formState.value = true
    form.value = cloneDeep(item)
    dialogFormVisible.value = true
  }
  //保存图片回显图片
  const handleAvatarSuccess = (res:any, file:any)=> {
      form.value.img = '/app-dev/download/' + res.data
      imageUrl.value = URL.createObjectURL(file.raw);
  }
</script>

<style lang="scss" scoped>
   input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        /* 取消input框自带的加减 */
    }
    .content{
      margin-bottom: 1%;
      border-radius: 5px;
      transition: all 0.5s ease-in-out;
    }
    .content:hover{
      box-shadow: 1px 1px 10px 2px rgb(180, 180, 180);
    }

    .search{
      :deep(.el-input__wrapper){
        border-radius: 5px;
        border: 1px solid  rgb(189, 196, 203);
      }
      span{
        color: rgb(104, 107, 107);
        font-size: 15px;
        font-family: '宋体';
        font-weight: bolder;
        margin-right: 5px;
      }
      :deep(.el-card__body){
        width: 100%;
        display: flex;
        align-items: center;
      }
    }


  :deep(.avatar-uploader) .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  :deep(.avatar-uploader) .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
