<template>
	<select class="form-control" v-model="departId" v-on:change="departChange()">
		<option value="0">└九博健康管理有限公司</option>
		<option v-for="item in departmentList" :key="item.id" v-bind:value="item.id" v-html="item.preFixName">
			{{item.preFixName}}
		</option>
	</select>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'department',
		/**
		 * 通过props定义属性，两种方法
		 * 1、departName: '',直接定义
		 * 2、如下方法定义
		 * 3、定义数组时通过默认方法返回默认值
		 * departmentList:{
				type:Array,
				default:function(){
					return [];
				}
			} 
		 */
		props: {
			deptObj: {}
		},

		data() {
			return {
				departName: '',
				departId: '0',
				departmentList: [],
				departSortList: [],
				depart: ''
			};
		},
		methods: {
			/**
			 * 子组件向父组件传值
			 * 1、定义自己的方法，通过
			 * 	this.$emit('departChange',this.departId,this.departName)
			 * 	这个方法进行传值，第一个参数为方法，第二个开始是参数，可传递多个参数
			 * 2、父组件接收方法
			 * 	首先，接收对应的属性，这个代码写在父组件中,父组件中的接收方法=子组件中的上传方法，引号中只写方法名
			 * 	<department :departName="departName" :departId="departId" :departChange='departChange'></department>
			 * 	其次是接收参数的对应的方法 ,这里的参数就是从子组件中传过来的参数
			 * 	departChange:function(departId,departName){
					this.departName = departName
					},
			 * 
			 */
			//提交部门名称和ID
			departChange: function() {
				this.depart = this.departId;
				this.departName = this.exchangeDepartName(this.departId)
				// alert(this.departName + '-' + this.departId)
				this.$emit('departChange', this.departId, this.departName)
			},
			/**
			 * 请求数据通过接口请求数据
			 * 	1、必须导入axios，在main.js或者App.vue中导入可全局使用的，但是暂时不能，不知道是不是配置问题
			 * 	2、在main.js 定义了共用的请求路径
			 * 		Vue.prototype.url = 'http://172.16.2.248:8080/Erp'
			 * 	3、下面为请求方法，没有写带参数的请求，测试后在补充
			 */
			setDpart: function(departId) {
				this.departId = departId
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeDepartName: function(param) {
				var dp = {}
				for (var i = 0; i < this.departSortList.length; i++) {
					dp = this.departSortList[i]
					if (dp.id == param) {
						return dp.name
					}
				}
			},
			async getDepartment() {
				// var url = "http://172.16.2.248:8080/Erp/search/nationList"
				// var url = this.url + '/search/departList'
				// alert(url)
				axios({
						method: 'post',
						url: 'http://172.16.56.1:8080/Erp/kqParamSetContr/queryDeptTree'
					})
					.then((response) => {
						this.departmentList = response.data.retData;
						//this.departmentList = this.addPrefix(this.departmentList)
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		created() {
			this.getDepartment()
		},
		watch: {
			departId: function(newValue, oldValue) {
				console.log(newValue + "#" + oldValue);
			},
			deptObj: function(newValue, oldValue) {
				console.log(newValue + "#" + oldValue);
			},
			deptId: function(newValue, oldValue) {
				this.departId = newValue;
				console.log(newValue + "#" + oldValue);
			}
		}
	}
</script>

<style>

</style>
