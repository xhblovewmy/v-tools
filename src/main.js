// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Aside,
  Form,
  FormItem,
  Radio,
  Button,
  Menu,
  MenuItem
} from 'element-ui'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
