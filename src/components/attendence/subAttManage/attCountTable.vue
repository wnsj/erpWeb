<template>
	<div class="tab-pane fade" id="kqtjbb">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-8 mtr_a"> <span>部门：</span> <span class="com-sel">
						<depart></depart>
					</span> <span>时间：</span> <span>
						<input type="date" value="" v-model="beginDate"/>
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<input type="date" value="" v-model="endDate"/>
					</span> <span class="search">
						<button class="btn btn-primary">导出</button>
					</span> <span class="search">
						<button class="btn btn-warning">查询</button>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>姓名：</span> <span>
						<input type="text" value="" id="" v-model="name"/>
					</span> <span>工号：</span> <span>
						<input type="text" value="" id="" v-model="jobNum"/>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>注：</span> <span style="color:#000000; margin-right:10px;">正常</span> <span
					 style="color:#00FFFF; margin-right:10px;">其他</span> </div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">部门</th>
							<th class="text-center">姓名</th>
							<th class="text-center">统计结果</th>
							
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in countKqTableList" :key="index">
							<td>{{item.ryDepartKQName}}</td>
							<td>{{item.ryKQName}}</td>
							<td>{{item.kqTableCount}}</td>
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
				departId:'',
				departName:'',
				name:'',
				jobNum:'',
				beginDate:this.getMonthFirst,
				endDate:this.getMonthLast,
				countKqTableList:[],
			};
		},
		methods:{
			//考勤统计报表
			async getCountKqTableList() {
				// var url= 'http://172.16.2.40:8080/Erp1.1/search/testList'
				var url = this.url + '/kqgl/kqTableCountList'
				// alert(url)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departName:this.departName,
						departId:this.departId,
						name: this.name,
						jobNum: this.jobNum,
						startDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res=response.data
					if(res.retCode=='0000'){
						if(res.resData.length>0){
							this.countKqTableList = res.resData
							console.log('getCountKqTableList')
							console.log(this.countKqTableList)
							$("#myModalQuery").modal('hide');
						}else{
							alert('没有查询到相关数据')
						}
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败')
				});
			},
		},
		created(){
			this.getCountKqTableList()
		}
	}
</script>

<style>

</style>
