import Vue from 'vue'
import Router from 'vue-router'
import Nickname from '@/pages/nickname'
import bus from '@/bus'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: { name: 'nickname' }
  },
  {
    path: '/nickname',
    name: 'nickname',
    component: Nickname,
    isMenu: true,
    meta: {
      title: '花名生成器',
      iconClass: 'el-icon-location'
    }
  },
  {
    path: '/fake-talk',
    name: 'fake-talk',
    isMenu: true,
    meta: {
      title: '微信聊天记录',
      iconClass: 'el-icon-wechat'
    }
  },
  {
    path: '/test',
    children: [
      {
        path: 'demo-1',
        name: 'demo-1',
        isMenu: true,
        meta: {
          title: 'test1',
          iconClass: 'el-icon-location'
        }
      },
      {
        path: 'demo-2',
        name: 'demo-2',
        isMenu: true,
        meta: {
          title: 'test2',
          iconClass: 'el-icon-location'
        }
      }
    ]
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const { title = 'vvliebe' } = to.meta || {}
  bus.$emit('changeTitle', title)
  next()
})

export default router
