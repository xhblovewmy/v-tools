import Vue from 'vue'
import Router from 'vue-router'
import Nickname from '@/pages/nickname'
import FakeTalk from '@/pages/fake-talk'
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
    component: FakeTalk,
    isMenu: true,
    meta: {
      title: '微信聊天记录',
      iconClass: 'el-icon-menu'
    }
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const { title = 'vvliebe' } = to.meta || {}
  bus.title = title
  next()
})

export default router
