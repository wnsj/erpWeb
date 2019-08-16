<template>
	<div class="tab-pane fade" id="grcqmx">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-8 mtr_a"> <span>时间：</span> <span>
						<dPicker v-model="beginDate" v-on:change="dateAction('begin')"></dPicker>
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<dPicker v-model="endDate" v-on:change="dateAction('end')"></dPicker>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchSingleKqList()">查询</button>
					</span> <span class="search">
						<button class="btn btn-primary" @click="exportTableToExcel('personalAttTB','个人出勤明细')">导出</button>
					</span> </div>
				<table class="table table-bordered table-hover" id='personalAttTB'>
					<thead>
						<tr>
							<th class="text-center">姓名</th>
							<th class="text-center">工号</th>
							<th class="text-center">部门</th>
							<th class="text-center">职位</th>
							<th class="text-center">班次</th>
							<th class="text-center">出勤班次日期</th>
							<th class="text-center">第一次打卡时间</th>
							<th class="text-center">最后一次打卡时间</th>
							<th class="text-center">上班</th>
							<th class="text-center">下班</th>
							<th class="text-center">状态</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in singleKqList" :key="index">
							<td>{{item.name}}</td>
							<td>{{item.jobNum}}</td>
							<td>{{item.departname}}</td>
							<td>{{item.positionName}}</td>
							<td>{{item.classTimeName}}</td>
							<td>{{item.shiftDate | dateFormatFilter('YYYY-MM-DD HH:MM')}}</td>
							<td>{{item.firstTime | dateFormatFilter('YYYY-MM-DD HH:MM')}}</td>
							<td>{{item.lastTime | dateFormatFilter('YYYY-MM-DD HH:MM')}}</td>
							<td>{{item.firstTimeState}}</td>
							<td>{{item.lastTimeState}}</td>
							<td>{{item.status}}</td>
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
	import {
		timeInit
	} from '../../../assets/js/date.js'
	export default {
		components:{
			dPicker,
		},
		data() {
			return {
				beginDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
				endDate: this.moment('', 'YYYY-MM-DD 23:59:59.000'),
				singleKqList: [],
			};
		},
		methods: {
			initDate:function(){
				console.log('personalAtt')
				this.getSingleKqList()
			},
			//更新时间
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
			},
			//个人考勤信息汇总
			searchSingleKqList: function() {
				var url = this.url + '/kqgl/allFirmKQ'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountName: this.accountInfo().account_Name,
						beginDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('singleKqList')
					if (res.retCode == '0000') {
						console.log('getSingleKqList')
						if (res.resData.length > 0) {
							console.log('getSingleKqList-length:' + res.resData.length)
							this.singleKqList = res.resData
						} else {
							alert('没有查询到本人的考勤相关数据')
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败')
				});
			},
			//获取个人考勤
			async getSingleKqList() {
				var url = this.url + '/kqgl/singleKQList'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountName: this.accountInfo().account_Name,
						beginDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							console.log('getSingleKqList-length:' + res.resData.length)
							this.singleKqList = res.resData
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败')
				});
			},
		},
		created() {
			
		}
	}
</script>

<style>

</style>
