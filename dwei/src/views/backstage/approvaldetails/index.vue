<template>
  <!-- <el-card class="content search">
  </el-card> -->

  <el-card class="content">
    <!-- <el-button type="primary" :icon="Plus" @click="()=>dialogFormVisible=true">add</el-button> -->

    <el-table :data="tableData" border max-height="480" :cell-style="{ textAlign: 'center' }"
              :header-cell-style="{ textAlign: 'center' }" style="width: 100%; margin-top: 10px;">
      <el-table-column prop="spName" label="applicant"/>

      <el-table-column label="state">
        <template #default="scope">
          <span v-if="scope.row.status == 0">Pending approval</span>
          <span v-if="scope.row.status == 1">Already passed</span>
          <span v-if="scope.row.status == 2">Rejected</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Creation time"/>

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

  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="35%" align-center style="border-radius:10px;"
             @close="reseForm">
    <el-form :model="form" ref="formRef">
      <el-form-item label="Approval status" :label-width="80">
        <el-select style="display: block;" v-model="form.status" placeholder="Please choose">
          <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
import {onMounted, ref, reactive} from "vue";
import {Plus, Edit, InfoFilled, Delete, Search, Brush} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {
  approvalLogApi,
  addTypeListApi,
  editTypeListApi,
  approveApi,
  resetPwdUserApi,
  detailTypeListApi
} from '@/api/product/myapi'
import type {FormInstance} from 'element-plus';
import {cloneDeep} from 'lodash';
import {getToken} from '@/utils/token-utils';
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
    value: '0',
    label: 'Pending approval'
  },
  {
    value: 1,
    label: 'Already passed'
  },
  {
    value: 2,
    label: 'Rejected'
  }

])

const detailList = ref<any>([
  {
    itemId: '',
    createTime: ''
  }
])

const dialogFormVisible = ref(false)
const formRef = ref<FormInstance>()
const searchForm = ref<any>({
  name: '',
  typeName: '',
  pageNum: currentPage.value,
  pageSize: pageSize.value
})
const form = ref<any>({
  name: ''
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
  name: [{required: true, validator: validateName}],
  username: [{required: true, validator: validateName}],
  password: [{required: true, validator: validateName}],
  phone: [{required: true, validator: validateName}],
  email: [{required: true, validator: validateName}],
})

const tableData = ref([]);


onMounted(async () => {
  getUserListRequset()
})


const getUserListRequset = async (pagenow?: any) => {
  if (!pagenow) {
    searchForm.value = {pageNum: 1, pageSize: pageSize.value}
  }
  const res: any = await approvalLogApi(searchForm.value)
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
const closeDialog = () => {
  reseForm()
}

//重置表单
const reseForm = async () => {
  dialogTitle.value = 'add'
  formState.value = false
  setoraddState.value = 0
  dialogFormVisible.value = false
  formRef.value?.resetFields()
  form.value = {name: ''}
}

//提交对话框更新或修改
const submitDialog = async () => {
  await approveApi(form.value)
  getUserListRequset()
  ElMessage.success('审批成功')
  reseForm()
}

//修改对话框
const updataUser = (item: any) => {
  dialogTitle.value = 'Approval'
  form.value = cloneDeep(item)
  setoraddState.value = 1
  dialogFormVisible.value = true
}

//删除该用户
const deleteUser = async (item: any) => {
  let data = {
    id: item.id,
    userId: item.userId,
    status: parseInt(item.status),
  }
  await approveApi(data)
  getUserListRequset()
  ElMessage.success('审批成功')
}

//查看用户信息
const lookUserInfo = (item: any) => {
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

.content {
  margin-bottom: 1%;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
}

.content:hover {
  box-shadow: 1px 1px 10px 2px rgb(180, 180, 180);
  color: #8e8d8d;
}

.search {
  :deep(.el-input__wrapper) {
    border-radius: 5px;
    border: 1px solid rgb(189, 196, 203);
  }

  span {
    color: rgb(104, 107, 107);
    font-size: 15px;
    font-family: '宋体';
    font-weight: bolder;
    margin-right: 5px;
  }

  :deep(.el-card__body) {
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
