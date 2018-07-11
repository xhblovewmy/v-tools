import Vue from 'vue'
import Router from 'vue-router'
import Nickname from '@/pages/nickname'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nickname',
      component: Nickname
    }
  ]
})
