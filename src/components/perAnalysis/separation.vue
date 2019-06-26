<template>

	<div id="page-wrapper">
		<div id="page-inner">
			<div class="row">
				<div class="col-md-12 col-lg-12 main-title">
					<h2> 离职人员分析表</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<!-- Advanced Tables -->
					<div class="panel panel-default">
						<div class="panel-heading">
							离职人员分析表
						</div>
						<ul class="panel-condition">
							<li>
								<span class="countdate">部门：</span>
								<department ref='department' @departChange='departChange'></department>
							</li>
							<li>
								<span class="countdate">职位：</span>
								<position :positionId="positionId" @positionChange='getEditPositionId'></position>
							</li>

							<li>
								<span class="countdate">统计日期：</span>
								<input type="date" class="form-control" v-model="begDate">
							</li>
							<li>
								<span class="countdate gang">~</span>
								<input type="date" class="form-control" v-model="endDate">
							</li>

							<button class="btn btn-default" @click="querySeparation">查询</button>
						</ul>

						<div class="panel-body">
							<div class="table-responsive">
								<div class="col-md-7">
									<table id="table_lz_01" class="table table-bordered context-menu-one">
										<caption>工龄分析</caption>
										<tbody>
											<tr>
												<td>1-3月</td>
												<td>4-6月</td>
												<td>7月-1年</td>
												<td>满1年</td>
												<td>满2年</td>
												<td>3年以上</td>
												<td>平均工龄</td>
											</tr>
											<tr>
												<td>{{separation.work.oneThreeCount}}</td>
												<td>{{separation.work.fourSixCount}}</td>
												<td>{{separation.work.sevenCount}}</td>
												<td>{{separation.work.oneYearCount}}</td>
												<td>{{separation.work.twoYearCount}}</td>
												<td>{{separation.work.threeYearCount}}</td>
												<td>{{separation.work.avgWorkCount}}</td>
											</tr>
											<tr>
												<td>{{separation.work.oneThreeMix}}</td>
												<td>{{separation.work.fourSixMix}}</td>
												<td>{{separation.work.sevenMix}}</td>
												<td>{{separation.work.oneYearMix}}</td>
												<td>{{separation.work.twoYearMix}}</td>
												<td>{{separation.work.threeYearMix}}</td>
												<td></td>
											</tr>
										</tbody>
									</table>
								</div>

								<div class="col-md-5">
									<table id="table_lz_02" class="table table-bordered context-menu-one">
										<caption>教育结构分析</caption>
										<tbody>
											<tr>
												<td>初中及以下</td>
												<td>高中/中专</td>
												<td>大专</td>
												<td>本科及以上</td>
												<td>其他</td>
											</tr>
											<tr>
												<td>{{separation.education.chuzhong}}</td>
												<td>{{separation.education.gaozhong}}</td>
												<td>{{separation.education.zhuanke}}</td>
												<td>{{separation.education.benke}}</td>
												<td>{{separation.education.qita}}</td>
											</tr>
											<tr>
												<td>{{separation.education.chuzhongMix}}</td>
												<td>{{separation.education.gaozhongMix}}</td>
												<td>{{separation.education.zhuankeMix}}</td>
												<td>{{separation.education.benkeMix}}</td>
												<td>{{separation.education.qitaMix}}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="col-md-7">
									<table id="table_lz_03" class="table table-bordered context-menu-one">
										<caption>重点岗位分析</caption>
										<tbody>
											<tr>
												<td>岗位</td>
												<td>离职人数</td>
												<td>所占比例</td>
												<td>离职类型</td>
											</tr>
											<tr v-for="(item,index) in separation.outEmp" :key="index">
												<td>{{item.POSITION_NAME}}</td>
												<td>{{item.outEmpCount}}</td>
												<td>{{item.outEmpMix}}</td>
												<td>{{item.outPosType}}</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div class="col-md-5">
									<table id="table_lz_04" class="table table-bordered context-menu-one">
										<caption>排名分析（前5）</caption>
										<tbody>
											<tr>
												<td>岗位</td>
												<td>离职人数</td>
												<td>所占比例</td>
												<td>离职类型</td>
											</tr>
											<tr v-for="(item,index) in separation.resignation" :key="index">
												<td>{{item.positionName}}</td>
												<td>{{item.resignation}}</td>
												<td></td>
												<td>{{item.resignType}}</td>
											</tr>

										</tbody>
									</table>
								</div>

								<div class="col-md-12">
									<table id="table_lz_05" class="table table-bordered context-menu-one">
										<caption>层次分析</caption>
										<tbody>
											<tr>
												<td rowspan="2" class="tab-lh">月末人数</td>
												<td colspan="2">特殊岗位</td>
												<td colspan="2">基础岗位</td>
												<td colspan="2">资深岗位</td>
												<td colspan="2">组长岗位</td>
												<td colspan="2">主管岗位</td>
												<td colspan="2">部长岗位</td>
											</tr>
											<tr>
												<td>人数</td>
												<td>比例</td>
												<td>人数</td>
												<td>比例</td>
												<td>人数</td>
												<td>比例</td>
												<td>人数</td>
												<td>比例</td>
												<td>人数</td>
												<td>比例</td>
												<td>人数</td>
												<td>比例</td>
											</tr>
											<tr>
												<td>{{separation.totalCount}}</td>
												<td>{{separation.teShuPuGang.positionTypeCount}}</td>
												<td>{{separation.teShuPuGang.positionTypeMix}}</td>
												<td>{{separation.jiChuPuGang.positionTypeCount}}</td>
												<td>{{separation.jiChuPuGang.positionTypeMix}}</td>
												<td>{{separation.zhuLiGangWei.positionTypeCount}}</td>
												<td>{{separation.zhuLiGangWei.positionTypeMix}}</td>
												<td>{{separation.zuZhangGangWei.positionTypeCount}}</td>
												<td>{{separation.zuZhangGangWei.positionTypeMix}}</td>
												<td>{{separation.zhuGuanGangWei.positionTypeCount}}</td>
												<td>{{separation.zhuGuanGangWei.positionTypeMix}}</td>
												<td>{{separation.buZhangZongJian.positionTypeCount}}</td>
												<td>{{separation.buZhangZongJian.positionTypeMix}}</td>
											</tr>
										</tbody>
									</table>
								</div>

							</div>
							<p class="text-right"><small>鼠标右键可全选、复制</small></p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import department from '../vuecommon/department.vue'
	import position from '../vuecommon/position.vue'


	export default {
		name: 'employee',
		components: {
			department,
			position,

		},
		data() {
			return {
				// 员工职位列表
				positionList: [],


				begDate: this.getCurrentDay,
				endDate: this.getCurrentDay,
				newRecruitDepartmentId: '',
				positionId: '',
				upRecruitPositionId: '',


				separation: {},
			}
		},

		mounted() {
			const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = '../../static/js/copyexcel.js';
			document.body.appendChild(s);
		},
		methods: {

			//获取部门名字和id
			departChange(departId) {
				this.recruitDepartmentId = departId
				this.newRecruitDepartmentId = departId
			},
			getAddDepartId(departId) {
				this.newRecruitDepartmentId = departId
			},
			getEditDepartId(departId) {
				this.upRecruitDepartmentId = departId
			},
			// 职位
			getEditPositionId(positionId) {
				this.upRecruitPositionId = positionId
			},

			//查询在职分析
			querySeparation() {

				axios({
					method: 'post',
					url: this.url + '/ryxxlController/queryLzryReport',
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						deptId: this.newRecruitDepartmentId, //部门id
						posId: this.upRecruitPositionId, //职位id
						begDate: this.begDate,
						endDate: this.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.separation = response.data.retData

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

		},
		created() {
			this.querySeparation()
		}
	}
</script>


<style>
	@import '../../assets/css/poresonnel.css';
</style>
