<template>
	<!-- 删除排班计划 -->
	<div class="tab-pane fade" id="pbjhsc">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-8 mtr_a"> <span>时间：</span> <span>
						<input type="date" v-model="begDate" id="begDate" />
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<input type="date" value="" v-model="endDate" id="endTime" />
					</span> <span class="search">
						<button class="btn btn-warning" @click="getAllShiftsInfor">查询</button>
					</span> <span class="search">
						<button class="btn btn-danger" @click="deleteShiftsInfor">删除</button>
					</span> </div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">员工</th>
							<th class="text-center">工号</th>
							<th class="text-center">班次</th>
							<th class="text-center">排班日期</th>
							<th class="text-center">开始</th>
							<th class="text-center">结束</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in AllShiftsInfor" :key="index" @click="getShiftsId(item)">
							<td class="text-center">{{item.EMPNAME}}</td>
							<td class="text-center">{{item.JOBNUM}}</td>
							<td class="text-center">{{item.NAME}}</td>
							<td class="text-center">{{item.SHIFTDATE}}</td>
							<td class="text-center">{{item.STARTTIME}}</td>
							<td class="text-center">{{item.ENDTIME}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {
		timeInit
	} from '@/assets/js/date.js'
	import {
		isBlank
	} from '@/assets/js/constant.js'

	import $ from 'jquery'

	export default {
		components: {

		},
		data() {
			return {
				AllShiftsInfor: [],
				begDate: timeInit(''),
				endDate: timeInit('')
			}
		},
		methods: {
			// -1) 查询所有人当天排班计划
			getAllShiftsInfor: function() {
				if (isBlank(this.begDate) || isBlank(this.endDate)) {
					alert("查询时间不能为空！");
					return;
				}
				var url = this.url + "/kqParamSetContr/queryAllEmpAttShift";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						begDate: this.begDate,
						endDate: this.endDate
						// begDate: '2017-01-02',
						// endDate: '2017-01-02'
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.AllShiftsInfor = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					(error) => {
						console.log("请求失败处理");
					}
				);
			},
			deleteShiftsInfor() {
				if (isBlank(this.begDate) || isBlank(this.endDate)) {
					alert("查询时间不能为空！");
					return;
				}
				var url = this.url + "/kqParamSetContr/updateEmpAttShift";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						begDate: this.begDate,
						endDate: this.endDate
						// begDate: '2017-01-02',
						// endDate: '2017-01-02'
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.AllShiftsInfor = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch((error) => {
						console.log("请求失败处理");
					}
				);
			},
		},
		mounted() {

		}
	}
</script>

<style>
</style>
