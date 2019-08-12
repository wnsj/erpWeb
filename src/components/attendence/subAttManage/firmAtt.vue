<template>
	<div class="tab-pane fade in active" id="gscqmx">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="table-responsive">
				<div class="col-lg-9 mtr_a"> <span>部门：</span> <span class="com-sel">
						<depart :departName="departName" :departId="departId" @departChange='departChange'></depart>
					</span> <span>职位：</span> <span class="com-sel">
						<position @positionChange='positionChange'></position>
					</span> <span>姓名：</span> <span>
						<input type="text" value="" class="form-control" v-model="kquName" />
					</span> <span>工号：</span> <span>
						<input type="text" value="" class="form-control" v-model="kquJobNum" />
					</span> <span class="search pull-right">
						<button class="btn btn-primary" @click="exportTableToExcel('firmAttTB','公司出勤明细')">导出</button>
					</span> <span class="search pull-right">
						<button class="btn btn-warning" v-on:click="searchKQInfo()">查询</button>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>时间：</span>
						<dPicker v-model="beginDate" v-on:change="dateAction('begin')"></dPicker>
						<span>&nbsp;&nbsp;&nbsp;至：</span>
						<span>
							<dPicker v-model="endDate" v-on:change="dateAction('end')"></dPicker>
						</span>
				</div>
				<div class="col-lg-11 mtr_a"> <span>注：</span> <span style="color:#FF0000; margin-right:10px;">旷工</span> <span style="color:#CD853F; margin-right:10px;">迟到/早退</span>
					<span style="color:#000000; margin-right:10px;">正常</span>
					<span style="color:#9370DB; margin-right:10px;">休息</span> <span style="color:#006400; margin-right:10px;">请假</span>
					<span style="color:#00679D; margin-right:10px;">倒休</span> <span style="color:#FF7F50; margin-right:10px;">打卡异常</span>
					<span style="color:#87CEFA; margin-right:10px;">加班</span> <span style="color:#D2B48C; margin-right:10px;">漏打卡</span>
				</div>
				<table class="table table-bordered table-hover" id="firmAttTB">
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
						<tr v-for="(item,index) in kquList" :key="index">
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
	import dPicker from 'vue2-datepicker'
	import depart from '../../vuecommon/department.vue'
	import position from '../../vuecommon/position.vue'
	import {
		timeInit
	} from '../../../assets/js/date.js'

	export default {
		components: {
			depart,
			position,
			dPicker,
		},
		data() {
			return {
				departId: '0',
				departName: '0',
				beginDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
				endDate: this.moment('', 'YYYY-MM-DD 23:59:59.000'),
				positionName: '0',
				kquName: '',
				kquJobNum: '',
				kquList: [],
			};
		},
		methods: {
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.departId = departId
				this.departName = departName
			},
			positionChange: function(positionId, positionName) {

				this.positionName = positionName
			},
			//更新时间
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
			},
			//
			searchKQInfo: function() {

				var departName, pName
				if (this.departId == 0) {
					departName = ''
				} else {
					departName = this.departName
				}
				if (this.positionName == "0") {
					pName = ''
				} else {
					pName = this.positionName
				}
				var url = this.url + '/kqgl/allFirmKQ'

				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departName: "",
						positionName: "",
						name: "",
						jobNum: "",
						beginDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('getKqList')
					if (res.retCode == '0000') {
						console.log('getKqList')
						if (res.resData.length > 0) {
							console.log('getKqList-length:' + res.resData.length)
							this.kquList = res.resData
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
			//获取公司全部考勤
			async getKqList() {

				var url = this.url + '/kqgl/allKQBaseInfo'

				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departName: "",
						positionName: "",
						name: "",
						jobNum: "",
						beginDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							console.log('getKqList-length:' + res.resData.length)
							this.kquList = res.resData
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败')
				});
			}
		},
		created() {
			this.getKqList()
		}

	}
</script>

<style>

</style>
