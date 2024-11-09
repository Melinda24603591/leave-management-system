<template>
  <el-card>
     <el-button type="primary" :icon="Plus" @click="()=>dialogFormVisible=true">add</el-button>

      <el-table :data="tableData" border max-height="480" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="width: 100%; margin-top: 10px;">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="nickname" />
        <el-table-column prop="username" label="username" />
        <el-table-column label="password">
          <template #default="scope">
             <el-input class="showpassword"  input-style="background:#fff;"  type="password" v-model="scope.row.password" autocomplete="off" size="large" readonly/>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="phone" label="contact information" /> -->
        <el-table-column label="operation" width="250">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" title="修改SPU" @click="updataUser(scope.row)"></el-button>
            <el-button type="info" :icon="InfoFilled" title="查看SKU" @click="lookUserInfo(scope.row)"></el-button>
            <el-popconfirm title="Are you sure to delete it?" @confirm="deleteUser(scope.row)">
                    <template #reference>
                        <el-button type="danger" :icon="Delete" title="删除SPU"></el-button>
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
      <el-form-item prop="name" label="nickname" :label-width="80" style="width:70% ;margin: auto;margin-bottom:20px">
        <el-input  name="name" v-model="form.name" autocomplete="off" size="large" :disabled="formState"/>
      </el-form-item>
      <el-form-item prop="username" label="administrator name" :label-width="80" style="width:70% ;margin: auto;margin-bottom:20px">
        <el-input  name="username" v-model="form.username" autocomplete="off" size="large" :disabled="formState"/>
      </el-form-item>
      <el-form-item prop="password" label="password" :label-width="80" style="width:70% ;margin: auto; margin-bottom:20px">
        <el-input ref="passwordRef"  name="password" :type="passwordType" v-model="form.password" autocomplete="off" size="large" :disabled="formState"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'ele-Hide' : 'ele-View'" />
        </span>
      </el-form-item>
      <!-- <el-form-item prop="phone" label="contact information" :label-width="80" style="width:70% ;margin: auto;">
        <el-input  name="phone" v-model="form.phone" autocomplete="off" size="large" :disabled="formState"/>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="closeDialog">cancel</el-button>
        <el-button type="primary" v-if="!formState" @click="submitDialog">
          submit
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: 'Student',
}
</script>
<script setup lang="ts">
  import { onMounted, ref ,reactive, nextTick} from "vue";
  import { Plus, Edit, InfoFilled, Delete } from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import { getAdminListApi , addAdminApi ,upAdminApi,deleteAdminApi} from '@/api/product/admin'
  import type { FormInstance } from 'element-plus';
  import { cloneDeep } from 'lodash';


  const formState = ref(false)
  const setoraddState = ref(0)
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(0);
  const dialogTitle = ref('添加管理员')
  const passwordType = ref('password')
  const passwordRef = ref<HTMLInputElement>()

  const dialogFormVisible = ref(false)
  const formRef = ref<FormInstance>()
  const form = ref({
    name:'',
    username: '',
    password: '',
    // phone:''
  })


  const validateUserpassword = (rule: any, value: any, callback: any) => {
     console.log(value)
    if (/^[A-Za-z0-9]{6,40}$/.test(value) == false) {
      callback(new Error("Please input a password"));
    } else {
      //校验通过
      callback();
    }
  }

  const validatephone = (rule: any, value: any, callback: any) => {

   if (/^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(value) == false) {
       callback(new Error("请输入正确的手机号"));
   } else {
       //校验通过
       callback();
   }
}
  const validateName = (rule: any, value: any, callback: any) => {
      if (!value) {
          callback(new Error("Please enter your account name"));
      } else {
          //校验通过
          callback();
      }
  }

  const validateName1 = (rule: any, value: any, callback: any) => {
      if (!value) {
          callback(new Error("Please enter a nickname"));
      } else {
          //校验通过
          callback();
      }
  }
  const userRules = ref({
    password: [{ required: true, validator: validateUserpassword }],
    username:[{ required: true, validator: validateName }],
    name:[{ required: true,  validator: validateName1 }],
    // phone:[{ required: true,  validator: validatephone }]
  })

  const tableData = ref([

  ]);

  onMounted(()=>{
    getUserListRequset()
  })

  const getUserListRequset = async()=>{
       const res:any = await getAdminListApi({
        pageNum:pageSize.value,
        pageSize:currentPage.value
       })
       const data = res.records.map((item:any)=>{
           return{
              id:item.id,
              name:item.name,
              username:item.username,
              password:item.password,
              phone:item.phone,
              invalidStatus:1
           }
       })
       tableData.value = data
       total.value = res.total
  }

  const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    getUserListRequset()
  };

  const handleSizeChange = (limit: number) => {
    currentPage.value = 1;
    pageSize.value = limit;
    getUserListRequset()
  };

  //关闭对话框的回调
  const closeDialog = ()=>{
    reseForm()
  }

  //重置表单
  const reseForm = async()=>{
    dialogTitle.value = '添加管理员'
    passwordType.value = 'password'
    formState.value = false
    setoraddState.value = 0
    dialogFormVisible.value = false
    formRef.value?.resetFields()
      form.value ={
        name:'',
        username: '',
        password: '',
        // phone:''
      }
  }

  //提交对话框更新或修改
  const submitDialog = async()=>{
     formRef.value?.validate().then(async()=>{
      if(setoraddState.value){
        await upAdminApi(form.value)
        getUserListRequset()
        ElMessage.success('Modified successfully')
        reseForm()
     }else{
      await addAdminApi(form.value)
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
    dialogTitle.value = '修改管理员'
    form.value = cloneDeep(item)
    setoraddState.value = 1
    dialogFormVisible.value = true
  }

  //删除该用户
  const deleteUser = async(item:any)=>{
       await deleteAdminApi({id:item.id})
       getUserListRequset()
       ElMessage.success('Delete successfully')
  }

  //查看用户信息
  const lookUserInfo =(item:any)=>{
    dialogTitle.value = '管理员信息'
    formState.value = true
    form.value = cloneDeep(item)
    dialogFormVisible.value = true
  }


/*
切换密码的显示/隐藏
*/
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    passwordRef.value?.focus()
  })
}

</script>

<style lang="scss" scoped>
   input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        /* 取消input框自带的加减 */
    }

    .showpassword{
      width:50%;
      //取消input组件自带边框
     :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
        cursor: default;
        .el-input__inner {
          cursor: default !important;
        }
      }
      :deep(.el-input__inner){
        text-align: center;
      }

    }

    .show-pwd {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 16px;
    color: rgb(96, 92, 92);
    cursor: pointer;
    line-height: 100%;
    user-select: none;
  }
</style>
