<template>
	<div class="tab-pane fade" id="gscqtj">
		<div class="row">
			<div class="table-responsive">
				<div class="col-md-3 col-lg-3"> 
					<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
						<span>部门：</span>
					</div>
					<div class="col-md-10 col-lg-10">
						<span class="com-sel">
							<depart @departChange='departChange'></depart>
						</span> 
					</div>	
				</div>	
				<div class="col-md-3 col-lg-3"> 
					<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
						<span>职位：</span> 
					</div>
					<div class="col-md-10 col-lg-10">
						<span class="com-sel">
							<position @positionChange='positionChange'></position>
						</span>
					</div>	
				</div>	
				<div class="col-md-3 col-lg-3"> 
					<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
						<span>姓名：</span>
					</div>
					<div class="col-md-10 col-lg-10">
						<span class="com-sel">
							<input type="text" value="" id="" v-model='name' />
						</span> 
					</div>	
				</div>	
				<div class="col-md-3 col-lg-3"> 
					<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
						<span>工号：</span>
					</div>
					<div class="col-md-10 col-lg-10">
						<span class="com-sel">
							<input type="text" value="" id="" v-model="jobNum" />
						</span>
					</div>	
				</div>	
					

				
				<div class="col-md-12 col-lg-12 mtr_a"> 
				<dPicker v-model="beginDate" v-on:change="dateAction('begin')"></dPicker>
					<span>时间：</span> <span>
						
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<dPicker v-model="endDate" v-on:change="dateAction('end')"></dPicker>
					</span> 
					<span class="search">
						<button class="btn btn-warning" v-on:click="searchRYKQInfo('0')">查询所有</button>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchRYKQInfo('1')">查询</button>
					</span> <span class="search">
						<button class="btn btn-primary" @click="exportTableToExcel('employeeAttTB','人员出勤统计')">导出</button>
					</span> 
				</div>
				<div class="col-md-12 col-lg-12 mtr_a"> <span>注：</span> <span style="color:#FF0000; margin-right:10px;">旷工</span> <span style="color:#CD853F; margin-right:10px;">迟到</span>
					<span style="color:#000000; margin-right:10px;">正常</span>
					<span style="color:#9370DB; margin-right:10px;">休息</span> <span style="color:#006400; margin-right:10px;">请假</span>
					<span style="color:#00679D; margin-right:10px;">倒休</span> <span style="color:#FF7F50; margin-right:10px;">打卡异常</span>
					<span style="color:#87CEFA; margin-right:10px;">加班</span> <span style="color:#D2B48C; margin-right:10px;">漏打卡</span>
				</div>
				<table class="table table-bordered table-hover" id='employeeAttTB'>
					<thead>
						<tr>
							<th class="text-center">姓名</th>
							<th class="text-center">工号</th>
							<th class="text-center">部门</th>
							<th class="text-center">职位</th>
							<th class="text-center">上班正常打卡</th>
							<th class="text-center">下班正常打卡</th>
							<th class="text-center">迟到次数</th>
							<th class="text-center">早退次数</th>
							<th class="text-center">旷工次数</th>
							<th class="text-center">上班打卡异常</th>
							<th class="text-center">下班打卡异常</th>
							<th class="text-center">休息天数</th>
							<th class="text-center">加班天数</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in ryKqList" :key="index" v-on:dblclick="showSearchRYKQInfo(item)">
							<td>{{item.ryKQName}}</td>
							<td>{{item.ryJobNum}}</td>
							<td>{{item.ryDepartKQName}}</td>
							<td>{{item.ryPositionKQName}}</td>
							<td>{{item.ryOnNomalPA}}</td>
							<td>{{item.ryDownNomalPA}}</td>
							<td>{{item.ryLaterTimes}}</td>
							<td>{{item.ryLeaveEarlyTimes}}</td>
							<td>{{item.ryMinersTimes}}</td>
							<td>{{item.ryOnPA}}</td>
							<td>{{item.ryDownPA}}</td>
							<td>{{item.ryRestDays}}</td>
							<td>{{item.ryOverTimesDays}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<singleEmp></singleEmp>
	</div>

</template>

<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import {
		timeInit
	} from '../../../assets/js/date.js'
	import depart from '../../vuecommon/department.vue'
	import position from '../../vuecommon/position.vue'
	import singleEmp from './singleEmployeeAtt.vue'
	export default {
		components: {
			depart,
			position,
			singleEmp,
			dPicker,
		},
		data() {
			return {
				departId: '0',
				departName: '',
				positionName: '0',
				name: '',
				jobNum: '',
				beginDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
				endDate: this.moment('', 'YYYY-MM-DD 23:59:59.000'),
				ryKqList: [],
			};
		},
		methods: {
			initDate:function(){
				console.log('employeeAtt')
				this.getRyKqList()
			},
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
			//展示人员列表中单个人员的考勤情况
			showSearchRYKQInfo: function(item) {
				
				item.beginDate = this.beginDate
				item.endDate = this.endDate
				console.log('showSearchRYKQInfo+'+item.accountId)
				this.$children[4].showSearchRYKQInfo(item)
				$("#myPersonalAttendance").modal('show')

			},

			//人员考勤
			searchRYKQInfo: function(param) {
				var departId, pName
				if (param == '0') {
					this.$children[0].departId = '0'
					this.$children[1].position = '0'
					this.name = ''
					this.jobNum = ''
				} else {
					if (this.departId == 0) {
						departId = ''
					} else {
						departId = this.departId
					}

					if (this.positionName == "0") {
						pName = ''
					} else {
						pName = this.positionName
					}
				}
				console.log('searchRYKQInfo--departName:' + this.departName + 'positionName:' + this.positionName)
				var url = this.url + '/kqgl/empkqList'

				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departId: departId,
						positionName: pName,
						name: this.name,
						jobNum: this.jobNum,
						beginDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('ryKqList')
					if (res.retCode == '0000') {
						console.log('ryKqList')
						if (res.resData.length > 0) {
							console.log('ryKqList-length:' + res.resData.length)
							this.ryKqList = res.resData
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
			//获取人员考勤
			async getRyKqList() {

				var url = this.url + '/kqgl/empkqList'
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
							console.log('ryKqList-length:' + res.resData.length)
							this.ryKqList = res.resData
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
