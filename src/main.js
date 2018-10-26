import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import SiteFooter from '@/components/base/SiteFooter'

Vue.config.productionTip = false

Vue.component("site-footer", SiteFooter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
