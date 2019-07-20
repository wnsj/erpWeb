// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Cookies from 'js-cookie'
import store from './store'
import axios from 'axios';
import moment from 'moment'

import * as constant from '../src/assets/js/constant.js'
import {exportTableToExcel} from 'vendor/Export2Excel.js'
import * as date from '../src/assets/js/date.js'
// import * as global_date from '../src/assets/js/global_date.js'
require('@/../static/js/bootstrap-datetimepicker.js')
import global_date from '../src/assets/js/global_date'

Vue.config.productionTip = false
Vue.use(VueResource)


// 允许携带cookie
// axios.defaults.withCredentials=true

/*------------------------------------------公共属性-----------------------------------------------------------*/

Vue.prototype.$ajax = axios

/*------本机路径----*/
Vue.prototype.url = process.env.API_HOST
// Vue.prototype.url = '/api'

/*------当月第一天、当天、最后一天----*/

Vue.prototype.getMonthFirst = date.getCurrentMonthFirst()
Vue.prototype.getMonthLast = date.getCurrentMonthLast()
Vue.prototype.getCurrentDay = date.timeInit('')

Vue.prototype.contentType = 'application/json;charset=utf-8'
//token存储在cookie中的过期时间
Vue.prototype.accessTokenLife = 7
Vue.prototype.accountDataLife = 7
//是否使用前端设置cookie
Vue.prototype.isUseSetCookie = true




Vue.prototype.notHaveRule='您没有此项功能操作的权限'




/*------------------------------------------公共方法-----------------------------------------------------------*/
Vue.prototype.accountInfo = function(){
	console.log('已经被调用了')
	return constant.accountInfo()
}
Vue.prototype.getNowFormatDate = function() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
};
Vue.prototype.getCurrentDayAction = function(param) {
	return date.timeInit(param)
}
Vue.prototype.isBlank = function(param) {
	return constant.isBlank(param)
}
Vue.prototype.jsGetAge = function(param) {
	return date.jsGetAge(param)
}
Vue.prototype.getYYYYMMDDHHMMSS_24 = function(param) {
	return date.getYYYYMMDDHHMMSS_24(param)
}
Vue.prototype.getYYYYMMDDHHMMSS_00 = function(param) {
	return date.getYYYYMMDDHHMMSS_00(param)
}
Vue.prototype.exportTableToExcel = function(tbId, fileName) {
	if (!confirm("确定导出?")) {
		return;
	}
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var date = myDate.getDate();
	exportTableToExcel(tbId, fileName + '_' + year + '_' + month + '_' + date);
}
Vue.prototype.has = function(param) {
	return constant.has(param);
}
Vue.prototype.getYYYY_MM_DD_T_HH_MM = function(param){
	return date.getYYYY_MM_DD_T_HH_MM(param)
}
Vue.prototype.getCurrentYYYY_MM_DD_HH_MM_SS = function(){
	return date.getCurrentYYYY_MM_DD_HH_MM_SS();
}
Vue.prototype.moment = function(targetDate, format) {
	var formatStr = "YYYY-MM-DD HH:mm:ss"
	var momentObj = moment();
	if (!constant.isBlank(targetDate)) {
		momentObj = moment(targetDate);
	}
	if (!constant.isBlank(format)) formatStr = format;
	return momentObj.format(formatStr);
}


/*
 **权限判断使用方法:
 ** 1.<div v-has='1'> 测试内容1</div>
 ** 2.<div v-if='has(25)'> 测试内容2</div>
 */
//自定义指令v-has(不包含则删除该标签)
Vue.directive('has', {
	inserted: function(el, binding) {
		if (!constant.has(binding.value)) {
			el.parentNode.removeChild(el);
		}
	}
});

//路由卫士
router.beforeEach((to, from, next) => {
	consolelog(to, from);
	if (to.path == '/login' && from.path == '/mainPage') {
		next();
	} else if (to.path == '/login') {
		next();
	} else {
		let token = Cookies.get('accessToken');
		let accountData = Cookies.get('accountData');
		//consoleLogCookie(token,accountData);
		if (constant.isBlank(token) || constant.isBlank(accountData)) {
			next('/login');
		} else if (to.path == '/') {
			next('/mainPage');
		} else if (to.path == '/login') {
			next('/mainPage');
		} else if (to.path == '/ERP/dist/index.html') {
			next('/mainPage');
		} else {
			next();
		}
	}
});

function consolelog(to, from) {
	console.log("to:" + to.path + ",from:" + from.path);
}

function consoleLogCookie(token, accoutData) {
	console.log("token:" + token + ",accoutData:" + accoutData)
}



//--------------------------------------dingdong---------------------------------

/**
 * 时间过滤器
 */
Vue.filter('dateFormat', function (time, formatStr='YYYY-MM-DD HH:mm') {
  if(constant.isBlank(time)){
    return null
  }else{
    return moment(time).format(formatStr)
  }
})

/**
 * 使用自定义时间js
 */
Vue.use(global_date)






/**
 * 创建VUE实例，其他实例注入
 */
new Vue({
	el: '#app',
	store,
	router,
	data() {
		return {
			accountAccessToken: constant.isBlank(Cookies.get('accessToken')) ? '' : Cookies.get('accessToken'),
			accountAccountData: constant.isBlank(Cookies.get('accountData')) ? '' : Cookies.get('accountData'),
		}
	},
	components: {
		App
	},
	template: '<App/>'
})
