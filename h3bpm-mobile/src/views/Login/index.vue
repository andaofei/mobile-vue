<template>
<div class="login-container">
  <div class="login-logo">
    <img v-lazy="img" alt="">
  </div>
  <div class="login-form">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" maxlength="16" :placeholder="$t('login.username')" name="username" type="text" auto-complete="on"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" maxlength="16" v-model="loginForm.password" :placeholder="$t('login.password')" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon v-if="passwordType ==='password'" icon-class="eye" />
          <svg-icon v-else icon-class="eyeopen" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" size="medium" style="width:100%;margin-bottom:12px;height: 44px" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>

      <div class="login-setting">
        <p>
          <el-checkbox v-model="autoLogin" >{{$t('login.auto')}}</el-checkbox>
        </p>
        <p @click="handleSetting" class="settings">
         <span class="sv-box">
            <svg-icon  icon-class="setting" />
         </span>
         <span>{{$t('login.sysSetting')}}</span>
        </p>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import { ERR_OK } from '@/api/options/statusCode'
import {Toast} from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      img: '/static/default/bpm.jpg',
      loginForm: {
        username: 'administrator',
        password: '000000'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  mounted() {
    if (this.autoLogin) {
      console.log(this.autoLogin)
      this.handleLogin()
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
          this.loading = true
          this.$store.dispatch('LoginSys', this.loginForm).then((res) => {
            if (res.code === ERR_OK) {
              // this.$router.push({ path: this.redirect || '/' })
              let instance = Toast({
                message: this.$t('login.success'),
                iconClass: 'icon el-icon-success'
              })
              setTimeout(() => {
                instance.close()
                this.$router.push({ path: '/dashboard' })
              }, 500)
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSetting() {
      this.$router.push('/setting')
    }
  },
  computed: {
    autoLogin: {
      get() {
        return this.$store.getters.autoLogin
      },
      set(value) {
        this.$store.commit('SET_AUTO_LOGIN', value)
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
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
      height: 44px;
      width: 60%;
      font-size: 14px;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 0 5px 0 1px;
        color: $light_gray;
        height: 44px;
        line-height: 44px;
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
@import "../../commom/scss/mixin";
@import "../../commom/scss/varible";

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
    height: 65%;
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
    padding: 0 20px 0 10px;
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
    height: 100%;
    color: $dark_gray;
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
        font-size: 14px;
      }
      .sv-box{
        color: $mainColor;
      }
    }
  }
}
</style>
