// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// 日期插件 dayjs 和 moment一样的api特性
import dayjs from 'dayjs';
import { Loading, Message } from 'element-ui';
import router from './router';
import store from './store';
import './assets/main.scss';
import './assets/font.css';

import App from './App.vue';

Vue.prototype.$dayjs = dayjs;

Vue.config.productionTip = false;

Vue.use(Loading.directive);
Vue.prototype.$message = Message;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
