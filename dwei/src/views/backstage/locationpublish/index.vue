<template>
  <!-- <el-card class="content search">
    <div style="width: 15%;margin-right: 1%;display:flex;align-items: center;">
      <span style="width:30%;text-align:right;white-space: nowrap;">Tag Name:</span>
      <el-input  v-model="searchForm.tagName" @input="$event ? searchForm.tagName = $event : searchForm.tagName = null"  clearable label="name"  autocomplete="off" />
    </div>
    <el-button type="success" :icon="Search" title="search" @click="getUserListRequset(1)">search</el-button>
    <el-button type="danger" :icon="Brush" title="reset" @click="getUserListRequset(0)">reset</el-button>
  </el-card> -->

  <el-card class="content">
     <el-button type="primary" :icon="Plus" @click="()=>dialogFormVisible=true">add</el-button>

      <el-table :data="tableData" border max-height="480" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="width: 100%; margin-top: 10px;">
        <el-table-column prop="tagName" label="Electronic tags"/>
        <el-table-column prop="destinationIp" label="Target IP"/>
        <el-table-column prop="destinationPort" label="Target port"/>
        <el-table-column prop="publishInterval" label="time interval(ms)"/>
        <el-table-column prop="status" label="Is it enabled">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeStatus(scope.row)"
            >
          </el-switch>
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
      <el-row>
          <el-col :span="12">
            <el-form-item label="Target IP" prop="destinationIp" :label-width="80">
              <el-input name="destinationIp" v-model="form.destinationIp" placeholder="Please fill in the target IP address" autocomplete="off" size="large" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="port" prop="destinationPort" :label-width="80">
              <el-input name="destinationPort" v-model="form.destinationPort"  placeholder="Please fill in the port number" autocomplete="off" size="large" disabled/>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
            <el-form-item label="Tag Name" prop="tagId" :label-width="80">
              <el-select
                name="tagId"
                v-model="form.tagId"
                placeholder="Please select UWB tag name"
                size="large"
                :disabled="formState"
              >
                <el-option v-for="item in optionUwbList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="time interval" prop="publishInterval" :label-width="80">
              <el-input-number name="publishInterval" v-model="form.publishInterval"  placeholder="1000ms-5000ms" :min="1000" :max="5000" autocomplete="off" size="large" :disabled="formState"/>
            </el-form-item>
          </el-col>
      </el-row>
      <el-form-item label="enable" prop="status" :label-width="100" style="width:80%">
            <el-switch
              name="status"
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              :disabled="formState"
            >
          </el-switch>
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
  name: 'Uwdedit',
}
</script>
<script setup lang="ts">
  import { onMounted, ref ,reactive} from "vue";
  import { Plus, Edit, InfoFilled, Delete ,Search,Brush} from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import { getlocationPublishListApi , addlocationPublishApi ,uplocationPublishApi,deletelocationPublishApi,getAllUwdListApi} from '@/api/product/myapi'
  import type { FormInstance } from 'element-plus';
  import { cloneDeep } from 'lodash';
//下拉框列表
  const optionUwbList = ref<any>([])

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
  const form = ref<any>({
    destinationIp:'10.126.25.7',
    destinationPort:'80'
  })


  const validateName = (rule: any, value: any, callback: any) => {
      if (!value) {
          callback(new Error("Cannot be empty"));
      } else {
          //校验通过
          callback();
      }
  }


  const userRules = ref<any>({
    destinationIp:[{ required: true,  validator: validateName }],
    destinationPort:[{ required: true,  validator: validateName }],
    tagId:[{ required: true,  validator: validateName }],
    publishInterval:[{ required: true,  validator: validateName }],
  })

  const tableData = ref([

  ]);
  const tableTitle = ref<any>([])

  onMounted(async()=>{
    getUserListRequset()
    getOptionList()
  })

    //获取下拉框列表
  const getOptionList = ()=>{
    getAllUwdListApi().then((res:any)=>{
      optionUwbList.value = res
    })
  }

  const changeStatus = (item:any)=>{
    uplocationPublishApi(item)
    getUserListRequset()
    ElMessage.success('Modified successfully')
  }

  const getUserListRequset = async(pagenow?:any)=>{
       if(!pagenow){
        searchForm.value = {pageNum:pageSize.value,pageSize:1}
       }
       const res:any = await getlocationPublishListApi(searchForm.value)
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
    dialogTitle.value = 'add'
    formState.value = false
    setoraddState.value = 0
    dialogFormVisible.value = false
    formRef.value?.resetFields()
      form.value ={
        destinationIp:'10.126.25.7',
        destinationPort:'80'
      }
  }

  //提交对话框更新或修改
  const submitDialog = async()=>{
     formRef.value?.validate().then(async()=>{
      if(setoraddState.value){
        await uplocationPublishApi(form.value)
        getUserListRequset()
        ElMessage.success('Modified successfully')
        reseForm()
     }else{
      await addlocationPublishApi(form.value)
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
    form.value = cloneDeep(item)
    setoraddState.value = 1
    dialogFormVisible.value = true
  }

  //删除该用户
  const deleteUser = async(item:any)=>{
       await deletelocationPublishApi({id:item.id})
       getUserListRequset()
       ElMessage.success('Delete successfully')
  }

  //查看用户信息
  const lookUserInfo =(item:any)=>{
    dialogTitle.value = 'information'
    formState.value = true
    form.value = cloneDeep(item)
    dialogFormVisible.value = true
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
</style>
