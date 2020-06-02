<template>
	<div class="tab-pane fade" id="kqbb">
		<div class="row">
			<div class="table-responsive">
				<div class="col-md-12 col-lg-12 mtr_a"> <span>
						<input type="radio" checked="checked" name="xm"  v-on:change="conditionChangeAction('depart')"/>
					</span> <span>部门：</span> <span class="com-sel">
						<depart @departChange="departChange"></depart>
					</span> <span>职位：</span> <span class="com-sel">
						<position @positionChange="positionChange"></position>
					</span> <span>姓名：</span> <span>
						<input type="text" value="" id="" v-model="name"/>
					</span> <span>工号：</span> <span>
						<input type="text" value="" id="" v-model="jobNum"/>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchKqTableList('0')">查询所有</button>
					</span> <span class="search">
						<button class="btn btn-warning" v-on:click="searchKqTableList('1')">查询</button>
					</span> <span class="search">
						<button class="btn btn-primary" @click="exportTableToExcel('attTableTB','考勤报表')">导出</button>
					</span> </div>
				<div class="col-lg-12 mtr_a"> <span>
						<input type="radio" name="xm" v-on:change="conditionChangeAction('project')" />
					</span> <span>项目：</span> <span class="com-sel">
						<project @projectChange="projectChange"></project>
					</span> <span>时间：</span> <span>
						<dPicker v-model="beginDate" v-on:change="dateAction('begin')"></dPicker>
					</span> <span>&nbsp;&nbsp;&nbsp;至：</span> <span>
						<dPicker v-model="endDate" v-on:change="dateAction('end')"></dPicker>
					</span> </div>
				<div class="col-lg-11 mtr_a"> <span>注：</span> <span style="color:#FF0000; margin-right:10px;">旷工</span> <span
					 style="color:#CD853F; margin-right:10px;">迟到/早退</span> <span style="color:#000000; margin-right:10px;">正常</span>
					<span style="color:#9370DB; margin-right:10px;">休息</span> <span style="color:#006400; margin-right:10px;">请假</span>
					<span style="color:#00679D; margin-right:10px;">倒休</span> <span style="color:#FF7F50; margin-right:10px;">打卡异常</span>
					<span style="color:#87CEFA; margin-right:10px;">加班</span> <span style="color:#D2B48C; margin-right:10px;">漏打卡</span>
				</div>
				<table class="table table-bordered table-hover" id="attTableTB">
					<thead>
						<tr>
							<th class="text-center">姓名</th>
							<th class="text-center">迟到次数</th>
							<th class="text-center">早退次数</th>
							<th class="text-center">旷工次数</th>
							<th class="text-center">打卡异常</th>
							<th class="text-center" v-for="(item,index) in kqTimeList" :key="index">{{item.dateTime}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in kqTableList" :key="index">
							<td class="text-center">{{item.ryKQName}}</td>
							<td class="text-center">{{item.ryLaterTimes}}</td>
							<td class="text-center">{{item.ryLeaveEarlyTimes}}</td>
							<td class="text-center">{{item.ryMinersTimes}}</td>
							<td class="text-center">{{item.ryOnPA}}</td>
							<td class="text-center" v-for="(item1,index) in item.punchTime" :key="index">{{item1.punchTime}}</td>
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
	import project from '../../vuecommon/project.vue'
	import {timeInit} from '../../../assets/js/date.js'
	export default {
		components:{
			depart,
			position,
			project,
			dPicker,
		},
		data() {
			return {
				departId:'',
				departName:'',
				positionId:'',
				positionName:'',
				projectId:'',
				name:'',
				jobNum:'',
				
				beginDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
				endDate: this.moment('', 'YYYY-MM-DD 23:59:59.000'),
				kqTimeList:[],
				kqTableList:[],
				
				conditionChange:'depart',
			};
		},
		methods:{
			initDate:function(){
				// console.log('attTable')
				this.getKqTableList()
			},
			//查询变化  部门和项目 
			conditionChangeAction:function(param){
				this.conditionChange=param
			},
			//更新时间
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
			},
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.departId = departId
				this.departName = departName
			},
			positionChange:function(positionId,positionName){
				this.positionName = positionName
			},
			projectChange:function(projectId){
				this.projectId=projectId
			},
			//搜索考勤报表
			searchKqTableList: function(param) {
				var dId,pN,pId,dId,pjId
				if (param=='0'){
					dId=''
					pN=''
					this.name=''
					this.jobNum=''
					this.$children[0].departId='0'
					this.departName=''
					this.$children[1].positionId='0'
					this.positionName=''
					this.$children[2].projectId='0'
					this.beginDate=timeInit('')
					this.endDate=timeInit('')
				}else{
					if(this.conditionChange=='depart'){
						pjId=''
						if (this.departId=='0'){
							dId=''
						}else{
							dId=this.departId
						}
					}else{
						dId=''
						if(this.projectId=='0'){
							pjId = ''
						}else{
							pjId = this.projectId
						}
					}
					if(this.positionName=='0'){
						pN=''
					}else{
						pN=this.positionName
					}
				}
				var url = this.url + '/kqgl/kqTableList'
				
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departId:dId,
						positionName: pN,
						name: this.name,
						jobNum: this.jobNum,
						projectId: pjId,
						beginDate: this.beginDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res=response.data
					if(res.retCode=='0000'){
						if(res.resData.length>0){
							this.kqTableList = res.resData
							this.kqTimeList = this.kqTableList[0].punchTime
							console.log('getKqTableList')
							console.log(this.kqTableList)
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
			//获取考勤报表
			async getKqTableList() {
			
				var url = this.url + '/kqgl/kqTableList'
				// alert(url)
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
					
					var res=response.data
					
					if(res.retCode=='0000'){
						if(res.resData.length>0){
							this.kqTableList = res.resData
							this.kqTimeList = this.kqTableList[0].punchTime
							console.log('getKqTableList',this.kqTableList.length)
							console.log(this.kqTableList[0].punchTime)
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
			}
		},
		
	}
</script>

<style>

</style>
