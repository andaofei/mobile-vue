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
      hidden: true,
      name: 'Login'
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
          path: '/initworkflow',
          redirect: '/initworkflow/all',
          component: () => import('@/views/InitiWorkflow/index'),
          name: 'Initworkflow',
          meta: { title: 'initworkflow', icon: 'initworkflow', noCache: true },
          children: [
            {
              path: '/initworkflow/all',
              name: 'All',
              component: () => import('@/views/InitiWorkflow/components/all/index'),
              meta: { title: 'All', noCache: true, id: 0 }
            },
            {
              path: '/initworkflow/hist',
              name: 'Hist',
              component: () => import('@/views/InitiWorkflow/components/hist/index'),
              meta: { title: 'Hist', noCache: true, id: 1 }
            }
          ]
        },
        {
          path: '/myworkflow',
          component: () => import('@/views/MyWorkflow/index'),
          name: 'MyWorkflow',
          redirect: '/myworkflow/doing',
          meta: { title: 'myworkflow', icon: 'myworkflow', noCache: true },
          children: [
            {
              path: '/myworkflow/doing',
              component: () => import('@/views/MyWorkflow/components/doing.vue'),
              name: 'Doing',
              meta: { title: 'Doing', noCache: true, id: 4 }
            },
            {
              path: '/myworkflow/done',
              component: () => import('@/views/MyWorkflow/components/done.vue'),
              name: 'Done',
              meta: { title: 'Done', noCache: true, id: 5 }
            },
            {
              path: '/myworkflow/cancel',
              component: () => import('@/views/MyWorkflow/components/cancel.vue'),
              name: 'Cancel',
              meta: { title: 'Cancel', noCache: true, id: 6 }
            }
          ]
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
      path: '/selectPerson', // 选人
      name: 'SelectPerson',
      hidden: true,
      component: () => import('@/components/SelectPerson/index')
    },
    {
      path: '/selectDepart', // 选择组织
      name: 'SelectDepart',
      hidden: true,
      redirect: '/selectDepart/selectDepartDefault',
      component: () => import('@/components/selectDepart/index'),
      children: [
        {
          path: '/selectDepart/selectDepartDefault',
          name: 'SelectDepartDefault',
          hidden: true,
          component: () => import('@/components/selectDepart/SelectDepartDedault/index'),
          meta: { title: 'selectdepart', icon: 'selectdepart', noCache: true }
        },
        {
          path: '/selectDepart/selectDepartChild',
          name: 'SelectDepartChild',
          hidden: true,
          component: () => import('@/components/selectDepartChild/index'),
          meta: { title: 'departchild', icon: 'departchild', noCache: true }
        },
        {
          path: '/selectDepart/selectDepartList',
          name: 'SelectDepartList',
          hidden: true,
          component: () => import('@/components/SelectDepartList/index'),
          meta: { title: 'departList', icon: 'departList', noCache: true }
        }
      ]
    },
    {
      path: '/appcenter/child', // 应用中心
      component: () => import('@/views/AppCenter/components/child'),
      name: 'child'
    },
    {
      path: '/appcenter/detail', // 应用中心
      component: () => import('@/views/AppCenter/components/detail'),
      name: 'detail'
    }
  ]
})
