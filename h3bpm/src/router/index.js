import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path*',
          component: () => import('@/views/redirect/index')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/setting',
      component: () => import('@/views/setting/index'),
      hidden: true
    },
    {
      path: '',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/home/index'),
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }
      ]
    }
  ]
})
