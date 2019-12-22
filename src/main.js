import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import * as VueFire from 'vuefire'
// import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
// Vue.use(VueFire)
// Vue.use(firestorePlugin)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
