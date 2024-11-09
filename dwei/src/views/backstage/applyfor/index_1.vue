<template>
  <el-card class="content search">
    <div style="width: 15%;margin-right: 1%;display:flex;align-items: center;">
      <span style="width:30%;text-align:right;white-space: nowrap;">applicant:</span>
      <el-input  v-model="searchForm.name" @input="$event ? searchForm.name = $event : searchForm.name = null"  clearable label="applicant"  autocomplete="off" />
    </div>
    <div style="width: 15%;margin-right: 1%;display:flex;align-items: center;">
      <span style="width:35%;text-align:right;white-space: nowrap;">Application type:</span>
      <el-input  v-model="searchForm.typeName" @input="$event ? searchForm.typeName = $event : searchForm.typeName = null"  clearable label="Application type"  autocomplete="off" />
      <!-- <el-select style="display: block;" v-model="searchForm.typeName" placeholder="Please choose">
                <el-option
                  v-for="item in typeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select> -->
    </div>
    <el-button type="success" :icon="Search" title="search" @click="getUserListRequset(1)">search</el-button>
    <el-button type="danger" :icon="Brush" title="reset" @click="getUserListRequset(0)">reset</el-button>
  </el-card>

  <el-card class="content">
     <el-button type="primary" :icon="Plus" @click="()=>dialogFormVisible=true">add</el-button>

      <el-table :data="tableData" border max-height="480" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="width: 100%; margin-top: 10px;">
        <el-table-column prop="name" label="applicant"/>
        <el-table-column prop="typeName" label="Application type"/>
        <el-table-column label="state">
          <template #default="scope">
            <span v-if="scope.row.status == 0">Pending approval</span>
            <span v-if="scope.row.status == 1">Already passed</span>
            <span v-if="scope.row.status == 2">Rejected</span>
          </template>
        </el-table-column>
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
      <el-row>
          <el-col :span="12">
            <el-form-item label="applicant" prop="userId" :label-width="80">
              <el-select style="display: block;" v-model="form.userId" placeholder="Please choose">
                <el-option
                  v-for="item in userData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Leave type" prop="typeId" :label-width="80">
              <el-select style="display: block;" v-model="form.typeId" placeholder="Please choose">
                <el-option
                  v-for="item in typeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
            <el-form-item label="Start date" prop="startDate">
              <el-date-picker clearable
                v-model="form.startDate"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="Start time"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="End date" prop="endDate" :label-width="80">
              <el-date-picker clearable
                v-model="form.endDate"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="End time"
              />
            </el-form-item>
          </el-col>
      </el-row>
      <!-- <el-form-item label="token"  :label-width="80" v-if="setoraddState == 2">
              <el-input type="textarea"  v-model="form.token"  autocomplete="off"  size="large" :disabled="formState"/>
      </el-form-item> -->
      <el-form-item v-if="dialogTitle !== 'add'" label="Approval status" :label-width="80">
        <el-select style="display: block;" v-model="form.status" placeholder="Please choose">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-input name="email" v-model="form.email"  placeholder="Please fill in the email" autocomplete="off" size="large" :disabled="formState"/> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="closeDialog">cancel</el-button>
        <el-button type="primary" @click="submitDialog">
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
  import { getleaveListApi , addleaveListApi ,editleaveListApi,delleaveListApi,getTypeListApi,detailleaveListApi,getUsersListApi} from '@/api/product/myapi'
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
      value:'0',
      label:'Pending approval'
    },
    {
      value:'1',
      label:'Already passed'
    },
    {
      value:'2',
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
    typeName:'',
    pageNum:currentPage.value,
    pageSize:pageSize.value
  })
  const form = ref<any>({
    startDate:'',
    endDate:''
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
    userId:[{ required: true,  validator: validateName }],
    typeId:[{ required: true,  validator: validateName }]
  })

  const tableData = ref([

  ]);
  const typeData = ref([

    ]);
    const userData = ref([

    ]);


  onMounted(async()=>{
    getUserListRequset()
    getTypeListRequset()
    getUserList()
  })

  const getTypeListRequset = async(pagenow?:any)=>{
       let data = {
        pageSize: 1000,
        pageNum: 1
       }
       const res:any = await getTypeListApi(data)
       typeData.value = res.records
  }

  const getUserList = async()=>{
       const res:any = await getUsersListApi()
       userData.value = res
  }


  const getUserListRequset = async(pagenow?:any)=>{
       if(!pagenow){
        searchForm.value = {pageNum:1,pageSize:pageSize.value}
       }
       const res:any = await getleaveListApi(searchForm.value)
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
    form.value ={}
  }

  //提交对话框更新或修改
  const submitDialog = async()=>{
     formRef.value?.validate().then(async()=>{
      if(setoraddState.value){
        await editleaveListApi(form.value)
        getUserListRequset()
        ElMessage.success('Modified successfully')
        reseForm()
     }else{
      await addleaveListApi(form.value)
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
       await delleaveListApi({id:item.id})
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
