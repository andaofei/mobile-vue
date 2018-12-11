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
      component: () => import('@/views/Setting/index'),
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
              name: 'TodoList',
              component: () => import('@/views/Home/components/TodoList')
            },
            {
              path: '/dashboard/toberead',
              name: 'TobeRead',
              component: () => import('@/views/Home/components/TobeRead')
            },
            {
              path: '/dashboard/read',
              name: 'Read',
              component: () => import('@/views/Home/components/Read')
            },
            {
              path: '/dashboard/alldone',
              name: 'AllDone',
              component: () => import('@/views/Home/components/AllDone')
            }
          ]
        },
        {
          path: '/initiworkflow',
          component: () => import('@/views/InitiWorkflow/index'),
          name: 'InitiWorkflow',
          meta: { title: 'initiworkflow', icon: 'initiworkflow', noCache: true }
        },
        {
          path: '/myworkflow',
          component: () => import('@/views/MyWorkflow/index'),
          name: 'MyWorkflow',
          meta: { title: 'myworkflow', icon: 'myworkflow', noCache: true }
        },
        {
          path: '/appcenter',
          component: () => import('@/views/AppCenter/index'),
          name: 'AppCenter',
          meta: { title: 'appcenter', icon: 'appcenter', noCache: true }
        }
      ]
    },
    {
      path: '/homeSetting',
      name: 'HomeSetting',
      hidden: true,
      component: () => import('@/components/HomeSetting/index')
    }
  ]
})
