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
      component: () => import('@/views/Login/index'),
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
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          redirect: '/dashboard/todolist',
          component: () => import('@/views/Home/index'),
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', noCache: true },
          children: [
            {
              path: '/dashboard/todolist',
              component: () => import('@/views/Home/components/TodoList')
            }
          ]
        },
        {
          path: '/process',
          component: () => import('@/views/Process/index'),
          name: 'Process',
          meta: { title: 'process', icon: 'process', noCache: true }
        }
      ]
    }
  ]
})
