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
              component: () => import('@/views/Home/components/TodoList'),
              meta: { title: 'ToDoList', noCache: true, id: 0 }
            },
            {
              path: '/dashboard/toberead',
              name: 'TobeRead',
              component: () => import('@/views/Home/components/TobeRead'),
              meta: { title: 'TobeRead', noCache: true, id: 1 }
            },
            {
              path: '/dashboard/alldone',
              name: 'AllDone',
              component: () => import('@/views/Home/components/AllDone'),
              meta: { title: 'AllDone', noCache: true, id: 2 }
            },
            {
              path: '/dashboard/read',
              name: 'Read',
              component: () => import('@/views/Home/components/Read'),
              meta: { title: 'Read', noCache: true, id: 3 }
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
    },
    {
      path: '/selectPerson',
      name: 'SelectPerson',
      hidden: true,
      component: () => import('@/components/SelectPerson/index')
    },
    {
      path: '/selectDepart',
      name: 'selectDepart',
      hidden: true,
      redirect: '/selectDepart/selectDepartDefault',
      component: () => import('@/components/selectDepart/index'),
      children: [
        {
          path: '/selectDepart/selectDepartDefault',
          name: 'selectDepartDefault',
          hidden: true,
          component: () => import('@/components/selectDepart/SelectDepartDedault/index')
        },
        {
          path: '/selectDepart/selectDepartChild',
          name: 'selectDepartChild',
          hidden: true,
          component: () => import('@/components/selectDepartChild/index')
        },
        {
          path: '/selectDepart/selectDepartList',
          name: 'SelectDepartList',
          hidden: true,
          component: () => import('@/components/SelectDepartList/index')
        }
      ]
    }
  ]
})
