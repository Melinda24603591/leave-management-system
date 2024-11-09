<template>
  <el-card class="content search">
    <div style="width: 15%;margin-right: 1%;display:flex;align-items: center;">
      <span style="width:40%;text-align:right;white-space: nowrap;">Application type:</span>
      <el-input  v-model="searchForm.name" @input="$event ? searchForm.name = $event : searchForm.name = null"  clearable label="name"  autocomplete="off" />
    </div>
    <el-button type="success" :icon="Search" title="search" @click="getUserListRequset(1)">search</el-button>
    <el-button type="danger" :icon="Brush" title="reset" @click="getUserListRequset(0)">reset</el-button>
  </el-card>

  <el-card class="content">
     <el-button type="primary" :icon="Plus" @click="()=>dialogFormVisible=true">add</el-button>

      <el-table :data="tableData" border max-height="480" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="width: 100%; margin-top: 10px;">
        <el-table-column prop="name" label="name"/>
        <el-table-column prop="createTime" label="Creation time"/>
        <el-table-column label="operation" width="250">
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

      <el-form-item label="Type name"  :label-width="80" >
            <el-input :readonly="dialogTitle == 'information'"  v-model="form.name"  autocomplete="off"/>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="closeDialog">cancel</el-button>
        <el-button v-if="dialogTitle != 'information'" type="primary" @click="submitDialog">
          submit
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script lang="ts">
export default {
  name: 'Usermanage',
}
</script>
<script setup lang="ts">
  import { onMounted, ref ,reactive} from "vue";
  import { Plus, Edit, InfoFilled, Delete ,Search,Brush} from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import { getTypeListApi , addTypeListApi ,editTypeListApi,delTypeListApi,resetPwdUserApi,detailTypeListApi} from '@/api/product/myapi'
  import type { FormInstance } from 'element-plus';
  import { cloneDeep } from 'lodash';
  import { getToken } from '@/utils/token-utils';
//下拉框列表
  const optionList = ref<any>([])

  const formState = ref(false)
  const setoraddState = ref(0)
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(0);
  const dialogTitle = ref('add')
  const oldPassword = ref('')

  const statusList = ref<any>([
    {
      value:0,
      label:'Pending approval'
    },
    {
      value:1,
      label:'Already passed'
    },
    {
      value:2,
      label:'Rejected'
    }

  ])

  const detailList = ref<any>([
    {
      itemId:'',
      createTime:''
    }
  ])

  const dialogFormVisible = ref(false)
  const formRef = ref<FormInstance>()
  const searchForm = ref<any>({
    name:'',
    pageNum:currentPage.value,
    pageSize:pageSize.value
  })
  const form = ref<any>({
    name:''
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
    name:[{ required: true,  validator: validateName }],
    username:[{ required: true,  validator: validateName }],
    password:[{ required: true,  validator: validateName }],
    phone:[{ required: true,  validator: validateName }],
    email:[{ required: true,  validator: validateName }],
  })

  const tableData = ref([

  ]);


  onMounted(async()=>{
    getUserListRequset()
  })


  const getUserListRequset = async(pagenow?:any)=>{
       if(!pagenow){
        searchForm.value = {pageNum:1,pageSize:pageSize.value}
       }
       const res:any = await getTypeListApi(searchForm.value)
       tableData.value = res.records
       total.value = res.total
  }

  const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    searchForm.value.pageNum = page
    getUserListRequset(1)
  };

  const handleSizeChange = (limit: number) => {
    currentPage.value = 1;
    pageSize.value = limit;
    searchForm.value.pageSize = limit
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
    form.value ={name:''}
  }

  //提交对话框更新或修改
  const submitDialog = async()=>{
     formRef.value?.validate().then(async()=>{
      if(setoraddState.value){
        await editTypeListApi(form.value)
        getUserListRequset()
        ElMessage.success('Modified successfully')
        reseForm()
     }else{
      await addTypeListApi(form.value)
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
       await delTypeListApi({id:item.id})
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
      color: #8e8d8d;
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
