<template>
<div class="login-container">
  <div class="login-logo">
    <img src="/static/images/logo.svg" alt="">
  </div>
  <div class="login-form">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" :placeholder="$t('login.username')" name="username" type="text" auto-complete="on"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" :placeholder="$t('login.password')" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" size="medium" style="width:100%;margin-bottom:10px;height: 40px" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>

      <div class="login-setting">
        <p>
          <el-checkbox v-model="checked">{{$t('login.auto')}}</el-checkbox>
          </p>
        <p @click="handleSetting" class="settings">
          <svg-icon icon-class="setting" />
         <span>{{$t('login.sysSetting')}}</span>
        </p>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      checked: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSetting() {
      this.$router.push('/setting')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 40px;
      width: 60%;
      font-size: 14px;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 0 5px 0 1px;
        color: $light_gray;
        height: 40px;
        line-height: 40px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-form-item__content{
      display: flex;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .login-logo{
    text-align: center;
    padding: 3rem 0;
    img{
      width: 6.5rem;
      height: 6.5rem;
    }
  }
  .login-form {
    height: 55%;
    max-width: 100%;
    padding: 0 2rem;
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
  .svg-container {
    padding: 0 5px 0 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 20px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .login-setting{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .settings{
      span{
        color:$dark_gray;
        font-size: 12px;
      }
    }
  }
}
</style>
