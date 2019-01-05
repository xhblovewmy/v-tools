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
  RadioGroup,
  Button,
  Menu,
  MenuItem,
  TimePicker,
  Input,
  InputNumber,
  Collapse,
  CollapseItem,
  Upload,
  Card,
  Select,
  Option
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
Vue.use(RadioGroup)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(TimePicker)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
