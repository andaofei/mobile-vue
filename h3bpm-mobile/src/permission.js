import router from './router'
// import store from './store'
import NProgress from 'nprogress' // progress bar
import './commom/nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false})// NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/setting']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token */
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      next()
      // next({...to, replace: true})
      // console.log(store.getters.roles)
      // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   store.dispatch('GetUserInfo').then(res => { // 拉取user_info
      //     // console.log(to)
      //     next({...to, replace: true})
      //   }).catch(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       next({path: '/'})
      //     })
      //   })
      // }
      // else {
      //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      //   if (hasPermission(store.getters.roles, to.meta.roles)) {
      //     next()
      //   } else {
      //     // next({path: '/401', replace: true, query: {noGoBack: true}})
      //   }
      //   // 可删 ↑
      // }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
