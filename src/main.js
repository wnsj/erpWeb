// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'


import store from './store'
import {getCurrentMonthFirst} from '../src/assets/js/date.js'
import {getCurrentMonthLast} from '../src/assets/js/date.js'
import {timeInit} from '../src/assets/js/date.js'
import {isBlank} from '../src/assets/js/constant.js'
import {jsGetAge} from '../src/assets/js/date.js'
import {getYYYYMMDDHHMMSS_24} from '../src/assets/js/date.js'
import {getYYYYMMDDHHMM} from '../src/assets/js/date.js'
import {exportTableToExcel} from 'vendor/Export2Excel.js'



Vue.config.productionTip = false
import axios from 'axios';
Vue.use(VueResource)

/*------------------------------------------公共属性-----------------------------------------------------------*/

Vue.prototype.$ajax = axios


/*------本机路径----*/
Vue.prototype.url = process.env.API_HOST
// Vue.prototype.url = '/api'

/*------当月第一天、当天、最后一天----*/
Vue.prototype.getMonthFirst = getCurrentMonthFirst()
Vue.prototype.getMonthLast = getCurrentMonthLast()
Vue.prototype.getCurrentDay = timeInit('')
//获取当前带有时分的时间
Vue.prototype.getYYYYMMDDHHMM = getYYYYMMDDHHMM()

/*-----------------------------------------公共方法---------------------------------------------------*/

/**
 * 获取当前时间
 * 格式YYYY-MM-DD
 */
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
Vue.prototype.getCurrentDayAction = function(param){
	return timeInit(param)
}
Vue.prototype.isBlank = function(param){
	return isBlank(param)
}
Vue.prototype.jsGetAge = function(param){
  return jsGetAge(param)
}
Vue.prototype.getYYYYMMDDHHMMSS_24 = function(param){
	return getYYYYMMDDHHMMSS_24(param)
}
Vue.prototype.exportTableToExcel = function(tbId,fileName){
	if (confirm("确定导出?") == false){ 
			return;
	}
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var date = myDate.getDate();
	exportTableToExcel(tbId,fileName+'_'+year+'_'+month+'_'+date);
}




/**
 * 创建VUE实例，其他实例注入
 */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
