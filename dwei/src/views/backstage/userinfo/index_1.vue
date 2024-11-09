<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="6" :xs="24">
            <el-card class="box-card">
               <template v-slot:header>
                 <div class="clearfix">
                   <span>personal information</span>
                 </div>
               </template>
               <div>
                  <div class="text-center">
                     <userAvatar />
                  </div>
                  <ul class="list-group">
                     <li class="list-group-item">
                        <svg-icon name="ele-User" />User name
                        <div class="pull-right">{{ userInfoStore.name }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-Search" />gender
                        <div class="pull-right">{{ userInfoStore.userInfo.isSex }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-DataBoard" />Date of Birth
                        <div class="pull-right">{{ userInfoStore.userInfo.create_time }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-User" />ID number
                        <div class="pull-right">{{ userInfoStore.userInfo.id_card }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-User" />phone number
                        <div class="pull-right">{{ userInfoStore.userInfo.phone }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-User" />User email
                        <div class="pull-right">{{ userInfoStore.userInfo.email }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-User" />User name
                        <div class="pull-right">{{ userInfoStore.userInfo.username }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon name="ele-User" />password
                        <div class="pull-right">{{ userInfoStore.userInfo.password }}</div>
                     </li>

                  </ul>
               </div>
            </el-card>
         </el-col>
         <el-col :span="18" :xs="24">
            <el-card>
               <template v-slot:header>
                 <div class="clearfix">
                   <span>Basic Information</span>
                 </div>
               </template>
               <el-tabs v-model="activeTab" @tab-click="tabChange">
                  <el-tab-pane label="Basic Information" name="userinfo">
                     <el-form ref="userRef" :model="userForm" :rules="userRules" label-width="80px">
                        <el-form-item label="User nikename" prop="name">
                           <el-input v-model="userForm.name" maxlength="30" />
                        </el-form-item>
                        <el-form-item label="phone number" prop="phone">
                           <el-input v-model="userForm.phone" maxlength="11" />
                        </el-form-item>
                        <el-form-item label="email" prop="email">
                           <el-input v-model="userForm.email" maxlength="50" />
                        </el-form-item>
                        <el-form-item label="gender">
                           <el-radio-group v-model="userForm.sex">
                              <el-radio label="0">male</el-radio>
                              <el-radio label="1">female</el-radio>
                           </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary" @click="userSubmit">preservation</el-button>
                        </el-form-item>
                     </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="Change Password" name="resetPwd">
                     <el-form ref="pwdRef" :model="userForm" :rules="editRules" label-width="80px">
                        <el-form-item label="username" prop="username">
                           <el-input v-model="userForm.username" placeholder="Please enter your account name" maxlength="30" />
                        </el-form-item>
                        <el-form-item label="Old password" prop="oldPassword">
                           <el-input v-model="userForm.oldPassword"  placeholder="Please enter old password" type="text" />
                        </el-form-item>
                        <el-form-item label="New password" prop="password">
                           <el-input  v-model="userForm.password" placeholder="Please enter a new password" type="password" show-password />
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary" @click="editSubmit">preservation</el-button>
                        </el-form-item>
                     </el-form>
                  </el-tab-pane>
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script lang="ts" setup name="Profile">
import userAvatar from "./userAvatar";
import { ref, defineProps, watch, reactive, onMounted } from 'vue';
import { getInfoApi } from '@/api/product/myapi';
import { useUserInfoStore } from '@/stores/userInfo';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { upUserApi } from '@/api/product/myapi';
import { ElMessage } from "element-plus";

const userInfoStore = useUserInfoStore();
const activeTab = ref("userinfo");
const userRef = ref<FormInstance>();
const pwdRef = ref<FormInstance>();
const userForm = ref<any>({});

const equalToPassword = (rule: any, value: any, callback: any) => {
  if (userForm.value.password!== value) {
    callback(new Error("The passwords entered twice are inconsistent"));
  } else {
    callback();
  }
};

const oldlToPassword = (rule: any, value: any, callback: any) => {
  if (userForm.value.oldPassword!== userInfoStore.userInfo.password) {
    callback(new Error("Does not match the original password"));
  } else {
    callback();
  }
};

const userRules = ref<any>({
  name: [{ required: true, message: "User nickname cannot be empty", trigger: "blur" }],
  email: [{ required: true, message: "Email address cannot be empty", trigger: "blur" }, { type: "email", message: "Please enter a correct email address", trigger: ["blur", "change"] }],
  phone: [{ required: true, message: "Mobile phone number cannot be empty", trigger: "blur" }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "Please enter a correct mobile phone number", trigger: "blur" }],
});

const editRules = ref({
  username: [{ required: true, message: "Account name cannot be empty", trigger: "blur" }],
  oldPassword: [{ required: true, message: "Old password cannot be empty", trigger: "blur" }, { required: true, validator: oldlToPassword }],
  password: [{ required: true, message: "New password cannot be empty", trigger: "blur" }, { min: 6, max: 20, message: "Length is between 6 and 20 characters", trigger: "blur" }, { pattern: /^[^<>"'|\\]+$/, message: "Cannot contain illegal characters: < > \" ' \\\ |", trigger: "blur" }],
});

onMounted(() => {
  userForm.value = cloneDeep(userInfoStore.userInfo);
});

const getUserInfoApi = () => {

};

const tabChange = () => {
  userRef.value?.resetFields();
  pwdRef.value?.resetFields();
  userForm.value = cloneDeep(userInfoStore.userInfo);
  userForm.value.password = '';
  userForm.value.username = '';
};

/** Submit button */
function userSubmit() {
  console.log(userForm.value);
  userRef.value?.validate(async (value) => {
    if (value) {
      userForm.value.password = userInfoStore.userInfo.password;
      userForm.value.username = userInfoStore.userInfo.username;
      await upUserApi(userForm.value);
      ElMessage.success('Modified successfully');
      userInfoStore.getInfo();
    } else {
      ElMessage.error('Validation not passed');
    }
  });

};

/** Submit button */
function editSubmit() {
  pwdRef.value?.validate(async (value) => {
    if (value) {
      delete userForm.value.oldPassword;
      await upUserApi(userForm.value);
      ElMessage.success('Modified successfully');
      userInfoStore.getInfo();
      pwdRef.value?.resetFields();
    } else {
      ElMessage.error('Validation not passed');
    }
  });
};


</script>


<style lang="less" scoped>

   .list-group-item{
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #ccc;
      font-family: '楷体';
      font-size: 18px;
      font-weight: 900;
      .pull-right{
         float: right;
         font-size: 15px;
         font-weight: 600;
         font-family: '宋体';
         letter-spacing: 1px;
      }
   }
</style>
