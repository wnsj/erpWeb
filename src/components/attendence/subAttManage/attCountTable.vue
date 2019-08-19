<template>
	<div class="tab-pane fade" id="kqtjbb">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-8 mtr_a"> <span>部门：</span> <span class="com-sel">
						<depart @departChange='departChange'></depart>
					</span> <span>时间：</span> <span>
						<dPicker v-model="beginDate" v-on:change="dateAction('begin')"></dPicker>
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<dPicker v-model="endDate" v-on:change="dateAction('end')"></dPicker>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="getCountKqTableList()">查询</button>
					</span> <span class="search">
						<button class="btn btn-primary" @click="exportTableToExcel('attCountTableTB','考勤统计报表')">导出</button>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>姓名：</span> <span>
						<input type="text" value="" id="" v-model="name"/>
					</span> <span>工号：</span> <span>
						<input type="text" value="" id="" v-model="jobNum"/>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>注：</span> <span style="color:#000000; margin-right:10px;">正常</span> <span
					 style="color:#00FFFF; margin-right:10px;">其他</span> </div>
				<table class="table table-bordered table-hover" id="attCountTableTB">
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
							<td>{{ryKQContentAction(item)}}
								{{item.ryNotPA>0 ? item.ryNotPA+'次未排班（原因包括忘打卡或打卡机故障）,' : ''}}
								{{item.ryLaterTimes>0 ? item.ryLaterTimes+'次迟到,' : ''}}
								{{item.ryLeaveEarlyTimes>0 ? item.ryLeaveEarlyTimes+'次早退,' : ''}}
								{{item.ryMinersTimes>0 ? item.ryMinersTimes+'次旷工,' : ''}}
								{{item.ryOnPA>0? item.ryOnPA+'次打卡异常（原因包括忘打卡或打卡机故障）,' : ''}}
								{{item.notEntry=='入职' ? item.ryEnteryTime+',' : ''}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import depart from '../../vuecommon/department.vue'
	export default {
		components:{
			depart,
			dPicker,
		},
		data() {
			return {
				departId:'',
				departName:'',
				name:'',
				jobNum:'',
				beginDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
				endDate: this.moment('', 'YYYY-MM-DD 23:59:59.000'),
				countKqTableList:[],
				
				ryKQContent:''//考勤统计的内容
			};
		},
		methods:{
			initDate:function(){
				// console.log('attCount')
				this.getCountKqTableList()
			},
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.departId = departId
				this.departName = departName
			},
			//更新时间
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
			},
			//考勤统计的内容
// 			{{item.ryNotPA>0 ? item.ryNotPA+'次未排班（原因包括忘打卡或打卡机故障）,' : ''}}
// 			{{item.ryLaterTimes>0 ? item.ryLaterTimes+'次迟到,' : ''}}
// 			{{item.ryLeaveEarlyTimes>0 ? item.ryLeaveEarlyTimes+'次早退,' : ''}}
// 			{{item.ryMinersTimes>0 ? item.ryMinersTimes+'次旷工,' : ''}}
// 			{{item.ryOnPA>0? item.ryOnPA+'次打卡异常（原因包括忘打卡或打卡机故障）,' : ''}}
// 			{{item.notEntry=='入职' ? item.ryEnteryTime+',' : ''}}
			ryKQContentAction:function(item){
				
				if(item.ryLaterTimes>0){
					this.ryKQContent = this.ryKQContent+item.ryLaterTimes+'次迟到,'
				}
				if(item.ryLeaveEarlyTimes>0){
					this.ryKQContent = this.ryKQContent+item.ryLeaveEarlyTimes+'次早退,'
				}
				if(item.ryMinersTimes>0){
					this.ryKQContent = this.ryKQContent+item.ryMinersTimes+'次旷工,'
				}
				if(item.ryOnPA>0){
					this.ryKQContent = this.ryKQContent+item.ryOnPA+'次打卡异常,'
				}
				if(item.ryOnPA>0){
					this.ryKQContent = this.ryKQContent+item.ryOnPA+'次打卡异常,'
				}
				if(item.ryOnPA>0){
					this.ryKQContent = this.ryKQContent+item.ryOnPA+'次打卡异常,'
				}
				if(item.ryLaterTimes<=0 && item.ryLeaveEarlyTimes<=0 && item.ryLeaveEarlyTimes <= 0 
				&& item.ryLeaveEarlyTimes<=0 &&item.ryNotPA <= 0){
					this.ryKQContent = '全勤'
				}
				return this.ryKQContent
			},
			//考勤统计报表
			async getCountKqTableList() {
				// var url= 'http://172.16.2.40:8080/Erp1.1/search/testList'
				var url = this.url + '/kqgl/kqCountTable'
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
						accountName: this.name,
						jobNum: this.jobNum,
						beginDate: this.beginDate,
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
		
	}
</script>

<style>

</style>
