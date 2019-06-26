<template>
	<div class="tab-pane fade" id="grcqmx">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-8 mtr_a"> <span>时间：</span> <span>
						<input type="date" value="" v-model="singleBeginDate" />
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<input type="date" value="" v-model="singleEndDate" />
					</span> <span class="search">
						<button class="btn btn-primary">导出</button>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchSingleKqList()">查询</button>
					</span> </div>
				<table class="table table-bordered table-hover">
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
							<td>{{item.shiftDate}}</td>
							<td>{{item.firstTime}}</td>
							<td>{{item.lastTime}}</td>
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
	import {timeInit} from '../../../assets/js/date.js'
	export default {
		data() {
			return {
				singleBeginDate:timeInit(''),
				singleEndDate:timeInit(''),
				singleKqList:[],
			};
		},
		methods:{
			//个人考勤信息汇总
			searchSingleKqList: function() {
				var url = this.url + '/kqgl/singleKQList'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountName: "王杰林",
						beginDate: this.singleBeginDate,
						endDate: this.getYYYYMMDDHHMMSS_24(this.singleEndDate),
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('singleKqList')
					if (res.retCode == '0000') {
						console.log('getSingleKqList')
						if (res.resData.length > 0) {
							console.log('getSingleKqList-length:'+res.resData.length)
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
						accountName: "王杰林",
						beginDate: this.singleBeginDate,
						endDate: this.getYYYYMMDDHHMMSS_24(this.singleEndDate),
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							console.log('getSingleKqList-length:'+res.resData.length)
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
		created(){
			this.getSingleKqList()
		}
	}
</script>

<style>

</style>
