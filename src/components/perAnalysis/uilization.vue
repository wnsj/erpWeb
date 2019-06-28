<template>
	<div id="page-inner">
		<div class="row">
			<div class="col-md-12 col-lg-12 main-title">
				<h2> 人力资源利用率分析表</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<!-- Advanced Tables -->
				<div class="panel panel-default">
					<div class="panel-heading">
						人力资源利用率分析表
					</div>
					<div>

					</div>
					<ul class="panel-condition">
						<li>
							<span class="countdate">部门：</span>
							<department @departChange='departChange'></department>
						</li>

						<li>
							<span class="countdate">统计日期：</span>
							<input type="date" class="form-control" v-model="begDate">
						</li>
						<li>
							<span class="countdate">包括当月入职：</span>
							<select class="btn btn-default dropdown-toggle" title="" v-model="isEntry">
								<option value="1">否</option>
								<option value="0">是</option>
							</select>
						</li>
						<li>
							<span class="countdate">包括当月离职：</span>
							<select class="btn btn-default dropdown-toggle" title="" v-model="isQuit">
								<option value="1">否</option>
								<option value="0">是</option>
							</select>
						</li>

						<button class="btn btn-default" @click="queryUlilization">查询</button>
						<button class="btn btn-default" @click="dowmelxe('人力资源利用率分析表')">导出</button>
					</ul>

					<div class="panel-body">
						<div class="table-responsive">
							<div class="col-md-12">
								<table id="table_zz_01" class="table table-bordered context-menu-one">
									<tbody>
										<tr>
											<td rowspan="2">部门</td>
											<td rowspan="2">总人数</td>
											<td colspan="3">总出勤天数</td>
											<td rowspan="2">本月天数</td>
											<td rowspan="2">月平均出勤人数</td>
											<td rowspan="2">排班休假天数</td>
											<td rowspan="2">合理缺勤人数</td>
											<td rowspan="2">超出缺勤人数</td>
											<td rowspan="2">未利用人力咨询</td>
											<td rowspan="2">人力咨询利用率</td>
										</tr>
										<tr>
											<td>小计</td>
											<td>系统打卡天数</td>
											<td>未打开增加天数</td>
										</tr>
										<tr v-for="(item,index) in ziYuan" :key="index">
											<td v-html="item.preFixName">{{item.preFixName}}</td>
											<!-- 总人数 -->
											<td>{{item.jinSheng}}</td>
											<!-- 小计 -->
											<td>{{item.dismiss}}</td>
											<!-- 系统打卡天数 -->
											<td>{{item.change}}</td>
											<!-- 未打卡增加天数 -->
											<td>{{item.jiangZhi}}</td>
											<!--本月天数 -->
											<td>{{item.resignation}}</td>
											<!--月均出勤天数 -->
											<td>{{item.avgCount}}</td>
											<!--合理缺勤天数 -->
											<td>{{item.diaoRu}}</td>
											<!--合理缺勤人数 -->
											<td>{{item.count}}</td>
											<!--超出缺勤人数 -->
											<td>{{item.sumCount}}</td>
											<!-- 未利用人力资源 -->
											<td>{{item.quitMix}}</td>
											<td v-if="item.jinSheng > 0 && item.changeMix < 90" style="color: red;">{{item.changeMix}}%</td><!-- 人力资源利用率 -->
											<td v-else>{{item.changeMix}}%</td>
										</tr>
									</tbody>
								</table>
							</div>
							<p class="text-right"><small>系统打卡天数=全天只有一次打开，即算作出勤 总出勤天数=系统打开天数+未打开增加天数 月平均出勤人数=总出勤天数÷本月天数 合理缺勤天数=排班休息总天数
									合理缺勤人数=合理缺勤÷本月天数 超出缺勤人数=总人数-约平均出勤人数 未利用人力资源=超出缺勤人数-合理缺勤人数 人力咨询利用率=（总人数-未利用人力咨询）÷总人数×100%</small></p>
							<p class="text-right"><small>注：【未打开增加天数】=上下班均未打开增加天数，如果已有一次打卡，则不需要增加！有权限的人员，可以修改，离开后自动计算并保持</small></p>

						</div>
						<p class="text-right"><small>鼠标右键可全选、复制</small></p>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import axios from 'axios'
	import {
		exportTableToExcel
	} from 'vendor/Export2Excel.js'
	import department from '../vuecommon/department.vue'

	export default {
		name: 'uilization',
		components: {
			department
		},
		data() {
			return {
				begDate: this.getCurrentDay,
				isEntry: 1,
				isQuit: 1,
				newRecruitDepartmentId: '',
				ziYuan: []
			}
		},
		mounted() {
			const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = '@/../static/js/copyexcel.js';
			document.body.appendChild(s);
		},
		methods: {
			//获取部门名字和id
			departChange(departId) {
				this.newRecruitDepartmentId = departId == 0 ? '' : departId;
			},
			queryUlilization() {
				axios({
					method: 'post',
					url: this.url + '/ryxxlController/queryRlzylyReport',
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						begDate: this.begDate, //查询时间（必填）
						isEntry: this.isEntry, //包括当月入职（必填）【0包括，1不包括】 
						isQuit: this.isQuit, //包括当月离职（必填）【0包括，1不包括】 
						deptId: this.newRecruitDepartmentId, //部门id
					},
					dataType: 'json',
				}).then((response) => {
					// console.log(response.data.retMsg)
					this.ziYuan = response.data.retData
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			dowmelxe: function(name) {
				if (confirm("确定导出?") == false) {
					return;
				}
				var myDate = new Date();
				var year = myDate.getFullYear();
				var month = myDate.getMonth() + 1;
				var date = myDate.getDate();
				exportTableToExcel('table_zz_01', name + '_' + year + '_' + month + '_' + date);
			}
		},
		created() {
			this.queryUlilization()
		}
	}
</script>


<style>
	@import '../../assets/css/poresonnel.css';
</style>
