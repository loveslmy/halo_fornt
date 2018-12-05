import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import SiteFooter from '@/components/base/SiteFooter'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import axios from "@/util/Http";
import MessageBox from "@/util/Message";

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 200,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'change|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'zh_CN',
  validity: false
};

Vue.use(VeeValidate, config);
Vue.component("site-footer", SiteFooter);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$message = MessageBox;
// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('zh_CN', zh_CN);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
