<template>
	<!--+  弹出-->

			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" v-on:click="closex()">×</button>
					<h4 id="myModalLabel" class="modal-title">选择人员</h4>


					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
							<p>部门：</p>
						</div>
						<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
							<depart @departChange='departChange'></depart>
						</div>
					</div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>姓名：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<span>
								<input type="text" value="" class="form-control" v-model="name" />
							</span>
						</div>
					</div>

					<button type="button" class="btn btn-warning pull-right m_r_10" v-on:click="empList()">查询</button>

					<div class="col-xs-12  col-sm-12 col-md-12 col-lg-12 leave_table">
						<table class="table table-bordered table-hover user-table">
							<thead>
								<tr>
									<th class="text-center">姓名</th>
									<th class="text-center">部门</th>
									<th class="text-center">职位</th>
									<th class="text-center">选择</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in emps" :key='index'>
									<td class="text-center">{{item.employeeName}}</td>
									<td class="text-center">{{item.departName}}</td>
									<td class="text-center">{{item.positionName}}</td>
									<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 	 v-on:click="backAciton(item)">选择</button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
	

</template>

<script>
	import axios from 'axios'
	import depart from '../../vuecommon/department.vue'
	export default {
		components:{
			depart
		},
		data() {
			return {
				emps:[],
				departId:'',
				name:''
			};
		},
		methods:{
			//初始化
			initData:function(){
				this.$children[0].departId=this.accountInfo().departId
				this.departId=this.accountInfo().departId
				this.empList()
			},
			departChange:function(param1,param2){
				this.departId=param1
				this.empList()
			},
			backAciton:function(item){
				this.$emit('backAciton', item)
				
			},
			closex:function(){
				$("#myModalJoin_modify").modal('hide')
				$("#myModalJoin_add").modal('hide')
			},
			empList:function(){
				var url = this.url + '/wzbg/departOfEmpList'
				console.log('checkEmpList:'+url)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departId:this.departId ,
						accountId:this.accountInfo().account_ID
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						console.log(res.resData.length)
						console.log("agent:"+res.resData)
						if (res.resData.length > 0) {
							this.emps = res.resData
							$("#myModalQuery").modal('hide');
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}
							
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
		}
		
	}
</script>

<style>

</style>
