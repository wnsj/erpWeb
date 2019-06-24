<template>
	<select class="form-control" v-model="departId" v-on:change="departChange(),returnDeptObj()">
		<option value="0">九博健康管理有限公司</option>
		<!-- <option v-for="(item,index) in departmentList" :key="index" v-bind:value="item.id" v-html="item.name">{{item.name}}</option> -->
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
		data() {
			return {
				departName: '',
				departId: '0',
				departmentList: [],
				departSortList: [],
				deptObj:{}
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
				this.departName = this.exchangeDepartName(this.departId)
				// alert(this.departName + '-' + this.departId)
				this.$emit('departChange', this.departId, this.departName)
			},
			//子组件返回dept对象
			returnDeptObj(){
				this.$emit('getDeptObj', this.deptObj);
			},
			setDpart:function(departId){
				this.departId = departId
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeDepartName: function(param) {
				var dp = {}
				for (var i = 0; i < this.departmentList.length; i++) {
					dp = this.departmentList[i];
					this.deptObj = dp;
					if (dp.id == param) {
						return dp.name
					}
				}
			},
			/**
			 * 请求数据通过接口请求数据
			 * 	1、必须导入axios，在main.js或者App.vue中导入可全局使用的，但是暂时不能，不知道是不是配置问题
			 * 	2、在main.js 定义了共用的请求路径
			 * 		Vue.prototype.url = 'http://172.16.2.248:8080/Erp'
			 * 	3、下面为请求方法，没有写带参数的请求，测试后在补充
			 */
			async getDepartment() {
				// var url = this.url + '/search/departList'
				var url = this.url + '/kqParamSetContr/queryDeptTree'
				axios({
						method: 'post',
						url: url
					})
					.then((response) => {
						// this.departmentList = this.departSort(response.data)
						// this.departmentList = this.addPrefix(this.departmentList)
						 this.departmentList = response.data.retData;
					})
					.catch((error) => {
						console.log(error)
					})
			},
	
		},
		created() {
			this.getDepartment()
			//this.getDepartmentSort()
		},
	}
</script>

<style>

</style>
/*
setDepartment(departId){
	this.departId = departId;
}, 
async getDepartmentSort() {
	// var url = "http://172.16.2.248:8080/Erp/search/nationList"
	var url = this.url +'/search/departList'
	// alert(url)
	axios({
			method: 'post',
			url: url
		})
		.then((response) => {
			this.departSortList = this.departSort(response.data)

			console.log(this.departSortList)
		})
		.catch((error) => {
			console.log(error)
		})
},
//部门数据源排序处理
departSort: function(param) {
	var dataList2 = param
	var tempList2 = []

	//排序数据

	this.$set(dataList2[10], 'name', '财务部')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[10])

	this.$set(dataList2[9], 'name', '人力综合办')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[9])

	this.$set(dataList2[16], 'name', '一事业部')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[16])

	this.$set(dataList2[23], 'name', '脑康运营')
	tempList2.push(dataList2[23])

	this.$set(dataList2[13], 'name', '脑康客服')
	tempList2.push(dataList2[13])

	this.$set(dataList2[25], 'name', '长沙运营')
	tempList2.push(dataList2[25])

	this.$set(dataList2[27], 'name', '长沙客服')
	tempList2.push(dataList2[27])

	this.$set(dataList2[1], 'name', '广州运营')
	tempList2.push(dataList2[1])

	this.$set(dataList2[15], 'name', '广州客服')
	tempList2.push(dataList2[15])

	this.$set(dataList2[2], 'name', '国防运营')
	tempList2.push(dataList2[2])

	this.$set(dataList2[14], 'name', '国防客服')
	tempList2.push(dataList2[14])

	this.$set(dataList2[35], 'name', '二事业部')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[35])

	this.$set(dataList2[4], 'name', '天津总院运营')
	tempList2.push(dataList2[4])

	this.$set(dataList2[11], 'name', '天津总院客服')
	tempList2.push(dataList2[11])

	this.$set(dataList2[39], 'name', '天津米悦运营')
	tempList2.push(dataList2[39])

	this.$set(dataList2[40], 'name', '天津米悦客服')
	tempList2.push(dataList2[40])

	this.$set(dataList2[42], 'name', '天津儿科运营')
	tempList2.push(dataList2[42])

	this.$set(dataList2[41], 'name', '天津儿科客服')
	tempList2.push(dataList2[41])

	// dataList2[31].menu_nume = '    ├─米悦新媒体'
	// tempList2.push(dataList2[31])

	this.$set(dataList2[32], 'name', '高端米悦运营')
	tempList2.push(dataList2[32])

	this.$set(dataList2[33], 'name', '高端米悦客服')
	tempList2.push(dataList2[33])

	this.$set(dataList2[36], 'name', '三事业部')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[36])

	this.$set(dataList2[3], 'name', '成都运营')
	tempList2.push(dataList2[3])

	this.$set(dataList2[30], 'name', '成都客服')
	tempList2.push(dataList2[30])

	this.$set(dataList2[37], 'name', '四事业部')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[37])

	this.$set(dataList2[26], 'name', '南昌运营')
	tempList2.push(dataList2[26])

	this.$set(dataList2[29], 'name', '南昌客服')
	tempList2.push(dataList2[29])

	this.$set(dataList2[6], 'name', '重庆运营')
	tempList2.push(dataList2[6])

	this.$set(dataList2[12], 'name', '重庆客服')
	tempList2.push(dataList2[12])

	this.$set(dataList2[5], 'name', '华慈运营')
	tempList2.push(dataList2[5])

	this.$set(dataList2[28], 'name', '华慈客服')
	tempList2.push(dataList2[28])
	
	//柚子健康网

	this.$set(dataList2[34], 'name', '九博健康网')
	tempList2.push(dataList2[34])

	this.$set(dataList2[38], 'name', '公共事业部')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[38])

	this.$set(dataList2[22], 'name', '企划组')
	tempList2.push(dataList2[22])

	this.$set(dataList2[18], 'name', '渠道拓展部')
	tempList2.push(dataList2[18])

	this.$set(dataList2[7], 'name', '外围组')
	tempList2.push(dataList2[7])

	this.$set(dataList2[20], 'name', '技术组')
	tempList2.push(dataList2[20])

	this.$set(dataList2[21], 'name', '开发组')
	tempList2.push(dataList2[21])

	this.$set(dataList2[0], 'name', '运维组')
	tempList2.push(dataList2[0])

	this.$set(dataList2[19], 'name', '策划组')
	tempList2.push(dataList2[19])

	this.$set(dataList2[8], 'name', '优化组')
	tempList2.push(dataList2[8])

	this.$set(dataList2[31], 'name', '新媒体')
	tempList2.push(dataList2[31])

	this.$set(dataList2[17], 'name', '总经办')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[17])

	this.$set(dataList2[24], 'name', '总务科')
	this.$set(dataList2[10], 'level', '1')
	tempList2.push(dataList2[24])

	return tempList2
},
//给排序的部门数据源添加前缀
addPrefix: function(param) {
	var dataList1 = param
	var tempList1 = []

	//添加排序前缀
	this.$set(dataList1[0], 'name', '&nbsp;&nbsp;├财务部')
	tempList1.push(dataList1[0])

	this.$set(dataList1[1], 'name', '&nbsp;&nbsp;├人力综合办')
	tempList1.push(dataList1[1])

	this.$set(dataList1[2], 'name', '&nbsp;&nbsp;├一事业部')
	tempList1.push(dataList1[2])

	this.$set(dataList1[3], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├脑康运营')
	tempList1.push(dataList1[3])

	this.$set(dataList1[4], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├脑康客服')
	tempList1.push(dataList1[4])

	this.$set(dataList1[5], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├长沙运营')
	tempList1.push(dataList1[5])

	this.$set(dataList1[6], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├长沙客服')
	tempList1.push(dataList1[6])

	this.$set(dataList1[7], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├广州运营')
	tempList1.push(dataList1[7])

	this.$set(dataList1[8], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├广州客服')
	tempList1.push(dataList1[8])

	this.$set(dataList1[9], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├国防运营')
	tempList1.push(dataList1[9])

	this.$set(dataList1[10], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;└国防客服')
	tempList1.push(dataList1[10])

	this.$set(dataList1[11], 'name', '&nbsp;&nbsp;├二事业部')
	tempList1.push(dataList1[11])

	this.$set(dataList1[12], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├天津总院运营')
	tempList1.push(dataList1[12])

	this.$set(dataList1[13], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├天津总院客服')
	tempList1.push(dataList1[13])

	this.$set(dataList1[14], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├天津米悦运营')
	tempList1.push(dataList1[14])

	this.$set(dataList1[15], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├天津米悦客服')
	tempList1.push(dataList1[15])

	this.$set(dataList1[16], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├天津儿科运营')
	tempList1.push(dataList1[16])

	this.$set(dataList1[17], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├天津儿科客服')
	tempList1.push(dataList1[17])

	// dataList1[31].menu_nume = '    ├─米悦新媒体'
	// tempList1.push(dataList1[31])

	this.$set(dataList1[18], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├高端米悦运营')
	tempList1.push(dataList1[18])

	this.$set(dataList1[19], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;└高端米悦客服')
	tempList1.push(dataList1[19])

	this.$set(dataList1[20], 'name', '&nbsp;&nbsp;├三事业部')
	tempList1.push(dataList1[20])

	this.$set(dataList1[21], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├成都运营')
	tempList1.push(dataList1[21])

	this.$set(dataList1[22], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;└成都客服')
	tempList1.push(dataList1[22])

	this.$set(dataList1[23], 'name', '&nbsp;&nbsp;├四事业部')
	tempList1.push(dataList1[23])

	this.$set(dataList1[24], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├南昌运营')
	tempList1.push(dataList1[24])

	this.$set(dataList1[25], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├南昌客服')
	tempList1.push(dataList1[25])

	this.$set(dataList1[26], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├重庆运营')
	tempList1.push(dataList1[26])

	this.$set(dataList1[27], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├重庆客服')
	tempList1.push(dataList1[27])

	this.$set(dataList1[28], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├华慈运营')
	tempList1.push(dataList1[28])

	this.$set(dataList1[29], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├华慈客服')
	tempList1.push(dataList1[29])

	this.$set(dataList1[30], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├九博健康网')
	tempList1.push(dataList1[30])

	this.$set(dataList1[31], 'name', '&nbsp;&nbsp;├公共事业部')
	tempList1.push(dataList1[31])

	this.$set(dataList1[32], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├企划组')
	tempList1.push(dataList1[32])

	this.$set(dataList1[33], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├渠道拓展部')
	tempList1.push(dataList1[33])

	this.$set(dataList1[34], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└外围组')
	tempList1.push(dataList1[34])

	this.$set(dataList1[35], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;└技术组')
	tempList1.push(dataList1[35])

	this.$set(dataList1[36], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├开发组')
	tempList1.push(dataList1[36])

	this.$set(dataList1[37], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└运维组')
	tempList1.push(dataList1[37])

	this.$set(dataList1[38], 'name', '&nbsp;&nbsp;├策划组')
	tempList1.push(dataList1[38])

	this.$set(dataList1[39], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;└优化组')
	tempList1.push(dataList1[39])

	this.$set(dataList1[40], 'name', '&nbsp;&nbsp;&nbsp;&nbsp;├新媒体')
	tempList1.push(dataList1[40])

	this.$set(dataList1[41], 'name', '&nbsp;&nbsp;├总经办')
	tempList1.push(dataList1[41])

	this.$set(dataList1[42], 'name', '&nbsp;&nbsp;└总务科')
	tempList1.push(dataList1[42])
	return tempList1
},
*/