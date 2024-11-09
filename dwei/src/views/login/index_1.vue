<template>
  <div class="login-container">
    <div :class="`bgimg ${mouseEvent.addBg} ${setBgimg}` "></div>
    <div class="name">Redis Experiment Management System</div>
    <el-form v-if="!registerState" ref="formRef" :model="loginForm" :rules="loginRules"
      :class="`login-form ${mouseEvent.addLogin}`" auto-complete="on" label-position="left"
      @mouseenter="loginUnitEnter"
        @mouseleave="()=>mouseEvent={addLogin:'',addBg:''}">
      <el-dropdown class="loginmode" @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="svg-admin">
              <svg-icon name="ele-User" />
            </span>
            {{ loginMode.name }}
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="0" divided>Administrator login</el-dropdown-item>
            <el-dropdown-item :command="1" divided>User login</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="title-container">
        <!-- <h3 class="title">{{ loginMode.title }}</h3> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="ele-UserFilled" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="ele-Lock" />
        </span>
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'ele-Hide' : 'ele-View'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" class="loginBtn" style="width:100%;margin-top:30px;height: 40px;"
        @click.native.prevent="handleLogin">login</el-button>
      <!-- <div class="register" v-if="loginMode.mode" @click="toRegister">
        去注册
      </div> -->
    </el-form>

    <el-form v-if="registerState" :model="registerForm" :rules="registerRules" ref="registerFormRef" class="register-form">
        <span class="huanhui" @click="toLogin">back</span>
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="name" style="margin-right:5px;">
               <span class="svg-container">
               <svg-icon name="ele-WalletFilled"/>
               </span>
               <el-input name="name" placeholder="Please enter a nickname" v-model="registerForm.name" autocomplete="off"  size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="username" style="margin-left:5px;">
              <span class="svg-container">
              <svg-icon name="ele-UserFilled"/>
              </span>
              <el-input name="username" placeholder="Please enter your account name" v-model="registerForm.username" autocomplete="off"  size="large"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="password" style="margin-right:5px;">
                  <span class="svg-container">
                  <svg-icon name="ele-Lock" />
                </span>
                  <el-input name="password" placeholder="Please input a password" v-model="registerForm.password" autocomplete="off" size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="enterPassWord" style="margin-left:5px;">
              <span class="svg-container">
              <svg-icon name="ele-GoodsFilled" />
            </span>
              <el-input name="enterPassWord" placeholder="Confirm password" v-model="registerForm.enterPassWord" autocomplete="off" size="large"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item  prop="phone">
          <span class="svg-container">
          <svg-icon name="ele-Phone"/>
          </span>
          <el-input name="phone" placeholder="Please enter your contact information" v-model="registerForm.phone" autocomplete="off"  size="large"/>
        </el-form-item>


        <el-button @click="goRegister" :loading="loading" type="primary" class="regis" style="width:100%;margin-top:30px;height: 40px;"
       >register</el-button>
    </el-form>

  </div>
</template>

<script lang="ts">
export default {
  name: 'Login',
}
</script>
<script lang="ts" setup>

import { onBeforeMount } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo';
import { getMode } from '@/utils/token-utils';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { registerApi } from '@/api/product/login';
import { cloneDeep } from 'lodash';

onBeforeMount(() => {
  const mode = getMode() || 0
  if (!mode) {
    setBgimg.value = ''
    loginMode.value = { title: 'Redis Experiment Management System', name: 'Administrator login', mode: 0 }
  } else {
    setBgimg.value = 'setBgimg'
    loginMode.value = { title: 'Redis Experiment Management System', name: 'User login', mode: 1 }
  }
})

const userInfoStore = useUserInfoStore()
const route = useRoute()
const router = useRouter()
const loginForm = ref({
  username: '',
  password: ''
})

// Member registration form
const registerForm = ref<any>({
  type: 0
})

const registerState = ref(false)
const loading = ref(false)
const passwordType = ref('password')
const redirect = ref('')
const passwordRef = ref<HTMLInputElement>()
const formRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
const loginMode = ref<any>({
  title: 'Redis Experiment Management System',
  name: 'Administrator login',
  mode: 0
})
const mouseEvent = ref({
  addLogin: '',
  addBg: ''
})
const setBgimg = ref('')

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('Please enter username'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 5) {
    callback(new Error('Password length cannot be less than 5 characters'))
  } else {
    callback()
  }
}

const loginRules = {
  username: [{ required: true, validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}

// Registration validation
const validateUserName = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("Please enter your account name"));
  } else {
    // Validation passed
    callback();
  }
}

const validate2 = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("Please enter a nickname"));
  } else {
    // Validation passed
    callback();
  }
}


const validateUserpassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("Cannot be empty"));
  } else {
    if (/^[A-Za-z0-9]{5,40}$/.test(value) == false) {
      callback(new Error("At least five digits"));
    } else {
      // Validation passed
      callback();
    }
  }
}

const validateEnterUserpassword = (rule: any, value: any, callback: any) => {
  if (value == registerForm.value.password) {
    if (/^[A-Za-z0-9]{6,40}$/.test(value) == false) {
      callback(new Error("Please confirm password"));
    } else {
      // Validation passed
      callback();
    }
  } else {
    callback(new Error("The passwords entered twice are inconsistent"));
  }

}

const validatephone = (rule: any, value: any, callback: any) => {

  if (/^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(value) == false) {
    callback(new Error("Please enter a correct mobile phone number"));
  } else {
    // Validation passed
    callback();
  }
}

const validateEmail = (rule: any, value: any, callback: any) => {

  if (/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test(value) == false) {
    callback(new Error("Please enter a correct email address"));
  } else {
    // Validation passed
    callback();
  }
}



// Member registration validation
const registerRules = {
  username: [{ required: true, validator: validateUserName }],
  password: [{ required: true, validator: validateUserpassword }],
  enterPassWord: [{ required: true, validator: validateEnterUserpassword }],
  name: [{ required: true, validator: validate2 }],
  phone: [{ required: true, validator: validatephone }],
}


watch(route, () => {
  redirect.value = route.query && route.query.redirect as string
}, { immediate: true })


const handleCommand = (command: string | number | object) => {
  if (!command) {
    setBgimg.value = ''
    loginMode.value = { title: 'Redis Experiment Management System', name: 'Administrator login', mode: 0 }
  } else {
    setBgimg.value = 'setBgimg'
    loginMode.value = { title: 'Redis Experiment Management System', name: 'User login', mode: 1 }
  }
}

// Style switching under different login modes
const loginUnitEnter = () => {
  // console.log(loginMode.value.mode)
  if (loginMode.value.mode == 1) {
    mouseEvent.value = { addLogin: 'addhover', addBg: 'addbg' }
  }
}


/*
Switch the display/hide of the password
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

/*
Callback when clicking login
*/

const handleLogin = async () => {
  await formRef.value?.validate()
  loading.value = true
  const { username, password } = loginForm.value
  try {
    await userInfoStore.login(username, password, loginMode.value.mode)
    // router.push({ path: redirect.value || '/' })
    router.push({ path: '/' })
  } finally {
    loading.value = false
  }
}

// Event triggered by clicking register
const toRegister = async () => {
  registerState.value = true
}

// Event triggered by returning to login
const toLogin = () => {
  registerState.value = false
  registerFormRef.value?.resetFields()
  registerForm.value = {
    type: 0
  }
}

const goRegister = () => {
  registerFormRef.value?.validate().then(async () => {
    const userForm = cloneDeep(registerForm.value)
    delete userForm.enterPassWord
    await registerApi(userForm)
    setTimeout(() => {
      toLogin()
      ElMessage.success('Registration successful')
    }, 500);
  }, () => {
    ElMessage.warning('Please fill in complete information')
  })
}

</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
   .el-select{

     .el-select__wrapper{
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      height: 47px;
      padding: 12px 5px 12px 28px;
      span{
        color: #bab6b6;
      }
     }
   }
   .el-form-item__content{
    background: rgb(255, 255, 255,0.2);
    border-radius: 10px;
   }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-input__wrapper {
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      input {
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__content{
      flex-wrap: nowrap;
    }
    .el-form-item__label{
          line-height: 47px;
          float: left;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  // background-image: url("src/assets/bg.jpg");
  position: relative;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bgimg{
  position: absolute;
  width: 100%;
  background-image: url("src/assets/bg5.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  transition: 0.5s ease-in;
  z-index: -1;
  /* filter: blur(5px); 添加模糊效果，参数值越大则模糊程度越高 */
 }
 .name{
   font-size: 30px;
   color: #fff;
   font-family: 'YouYuan';
   font-weight: 900;
   transform: translateY(-200%);
   letter-spacing: 1px;
 }
 .addbg{
  filter: blur(5px);
 }
 .setBgimg{
  background-image: url("src/assets/bg6.jpg");
 }
  .login-form {
    position: relative;
    width: 500px;
    min-height:350px;
    max-width: 100%;
    padding: 0 50px;
    overflow: hidden;
    background: rgba(40, 38, 38, 0.6);
    box-shadow: 0px 0px 10px 5px rgba(50, 50, 50, 0.5);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.5s ease-in;
    .loginmode{
      position: absolute;
      top: 20px;
      left: 20px;

    }
   .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }
    .register{
      position: absolute;
      bottom: 5%;
      right: 5%;
      color: #aeaeba;
      cursor: pointer;
    }
  }
  .addhover{
  border: none;
  box-shadow: none;
  margin: 0 auto;
  background-color: rgba(50, 50, 50, 0);
}

 .register-form{
    position: relative;
    width: 500px;
    min-height: 50vh;
    max-width: 100%;
    padding: 0 50px;
    overflow: hidden;
    background: rgba(43, 41, 41, 0.5);
    box-shadow: 0px 0px 10px 5px rgba(50, 50, 50, 0.5);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .huanhui{
      position: absolute;
      top: 20px;
      left: 20px;
      color: #889aa4;
      letter-spacing: 5px;
      cursor: pointer;
    }
 }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-admin{
    width: 20px;
    color: $dark_gray;
    display: inline-block;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    // background: rgba(227, 238, 250,0.2);
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      letter-spacing: 10px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginBtn{
    background: rgba(0, 0, 0, 0.6);
    border: none;
  }
  .loginBtn:hover{
    background: rgba(0, 0, 0, 0.8);
  }
  .regis{
    background: rgba(0, 0, 0, 0.6);
    border: none;
  }
  .regis:hover{
    background: rgba(0, 0, 0, 0.8);
  }
}


</style>
