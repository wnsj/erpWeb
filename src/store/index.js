import Vue from 'vue'
import Vuex from 'vuex'
import { asyncRouterMap, constantRouterMap } from '@/router';

Vue.use(Vuex)
/*
vuex教程：
	1.帖子https://segmentfault.com/a/1190000015782272?utm_source=tag-newest
	2.官网https://vuex.vuejs.org/
*/
const store = new Vuex.Store({
	/*外部获取state中的值的方法
	*在外部组件的计算属性（computed）中定义返回方法
	* 例1：
	* computed:{
	*	accountInfo(){
	*		return this.$store.state.accountInfo;
	*	}
	*}
	*在data中定义变量使用
	* 例2：
	* data() {
	*	return {
	*		accountInfo : this.$store.state.accountInfo
	*	}
	* }
	*/
	state: {
		count: 1,
		accountInfo:{}
	},
	mutations: {
		increment(state) {
			state.count++
		},
		//外部组件中修改accountInfo的值使用this.$store.commit('setAccountData',account);
		setAccountData(state,account){
			state.accountInfo = account;
		}
	},
	//实时监听state值的变化(最新状态)
	getters : {   
		//方法名随意,主要是用来承载变化的accountInfo的值
		//外部使用this.$store.getters.getAccountData调用 
		getAccountData(state){ 
		   return state.accountInfo;
		}
	},
	actions:{
		//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
		//外部使用方法this.$store.dispatch('commintAccountInfo',6) //6要变化的实参
		commintAccountInfo(context,value){
			context.commit('setAccountData',value);//value为参数
		}
	}
})

export default store;
