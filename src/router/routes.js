import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'

const Chart = () => import('@/components/views/Chart')
const NotFound = () => import('@/components/pages/NotFound')
const Register = () => import('@/components/pages/Register')
const E404 = () => import('@/components/pages/E404')
const Icon = () => import('@/components/pages/Icon')
const Login = () => import('@/components/pages/Login')
const Table = () => import('@/components/views/Table')
const Detail = () => import('@/components/views/Detail')
const List = () => import('@/components/views/List')
const Filter = () => import('@/components/pages/Filter')
const Lock = () => import('@/components/layout/base/Lock')
const Course = () => import('@/components/pages/Course')
const Tasks = () => import('@/components/pages/Tasks')
const MyTask = () => import('@/components/pages/MyTask')
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    props: true, // 启用 props 传参
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        },
        props: true // 启用 props 传参
      },
      {
        path: '/chart',
        name: 'chart',
        component: Chart,
        meta: {
          requiresAuth: true // 是否需要登录
        },
        props: true // 启用 props 传参
      },
      {
        path: '/Course',
        name: 'Course',
        component: Course,
        meta: {
          requiresAuth: true // 是否需要登录
        },
        props: true // 启用 props 传参
      },
      {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
          requiresAuth: true // 是否需要登录
        },
        props: true // 启用 props 传参
      },
      {
        path: '/detail',
        name: 'detail',
        component: Detail,
        icon: 'icon-addpeople_fill',
        meta: {
          requiresAuth: true // 是否需要登录
        },
        props: true // 启用 props 传参
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/icon',
        name: 'icon',
        component: Icon,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/filter',
        name: 'filter',
        component: Filter,
        meta: {
          requiresAuth: true // 是否需要登录
        },
        props: true // 启用 props 传参
      },
      {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/tasks/:taskId',
        name: 'tasks/:taskId',
        component: Tasks,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/myTask',
        name: 'myTask',
        component: MyTask,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/course/:courseId',
        name: '/course/:courseId',
        component: Course,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/error404',
    name: 'error404',
    component: E404
  },
  {
    path: '/lock',
    name: 'lock',
    component: Lock
  },
  {
    path: '*',
    redirect: '/notFound'
  }

]

export default routes
