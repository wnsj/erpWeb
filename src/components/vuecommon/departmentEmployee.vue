<template>
	<!-- 部门员工树 -->
	<div class="tree">
		<ul>
			<li>
				<div class="close_menu top_menu mt_5">
					<span><img src="@/assets/img/boss.png" width="28" height="28" /></span>
					<a title="九博健康管理有限公司">九博健康管理有限公司</a>
				</div>
				<ul class="bm_sun">
					<!-- 1 -->
					<li v-for="item in deptEmpData" :key="item.id">
						<div class="close_menu sun_menu mt_5">
							<span><img src="@/assets/img/er3.png" width="24" height="24" /></span>
							<a>{{item.name}}</a>
						</div>
						<ul>

							<!-- 2 -->
							<li v-for="subDept in item.children" :key="subDept.id">
								<div class="close_menu sun_menu mt_5">
									<span><img src="@/assets/img/er3.png" width="24" height="24" /></span>
									<a>{{subDept.name}}</a>
								</div>

								<!-- 3 -->
								<ul>
									<li v-for="chrildDept in subDept.children" :key="chrildDept.id">
										<div class="close_menu sun_menu mt_5">
											<span><img src="@/assets/img/er3.png" width="24" height="24" /></span>
											<a>{{chrildDept.name}}</a>
										</div>


										<!-- 4 -->
										<ul>
											<li v-for="dept in chrildDept.children" :key="dept.id">
												<div class="close_menu sun_menu mt_5">
													<span><img src="@/assets/img/er3.png" width="24" height="24" /></span>
													<a>{{dept.name}}</a>
												</div>

												<!-- 5 -->
												<ul>
													<li v-for="dep in dept.children" :key="dep.id">
														<div class="close_menu sun_menu mt_5">
															<span><img src="@/assets/img/er3.png" width="24" height="24" /></span>
															<a>{{dep.name}}</a>
														</div>
														<!-- 5 -->
														<ul class="sex">
															<li v-for="emp in dep.employeeList" :key="emp.id" @click="selectEmp(emp)">
																<div class=" close_menu unm mt_5">
																	<span>
																		<img v-show="emp.sex =='男'" src="@/assets/img/man.jpg" width="28" height="28" />
																		<img v-show="emp.sex =='女'" src="@/assets/img/men.jpg" width="28" height="28" />
																	</span>
																	<a>{{emp.name}}</a>
																</div>
															</li>
														</ul>
													</li>
												</ul>

												<!-- 4 -->
												<ul class="sex">
													<li v-for="emp in dept.employeeList" :key="emp.id" @click="selectEmp(emp)">
														<div class=" close_menu unm mt_5">
															<span>
																<img v-show="emp.sex =='男'" src="@/assets/img/man.jpg" width="28" height="28" />
																<img v-show="emp.sex =='女'" src="@/assets/img/men.jpg" width="28" height="28" />
															</span>
															<a>{{emp.name}}</a>
														</div>
													</li>
												</ul>
											</li>
										</ul>


										<!-- 3 -->
										<ul class="sex">
											<li v-for="emp in chrildDept.employeeList" :key="emp.id" @click="selectEmp(emp)">
												<div class=" close_menu unm mt_5">
													<span>
														<img v-show="emp.sex =='男'" src="@/assets/img/man.jpg" width="28" height="28" />
														<img v-show="emp.sex =='女'" src="@/assets/img/men.jpg" width="28" height="28" />
													</span>
													<a>{{emp.name}}</a>
												</div>
											</li>
										</ul>
									</li>
								</ul>



								<!-- 2 -->
								<ul class="sex">
									<li v-for="emp in subDept.employeeList" :key="emp.id" @click="selectEmp(emp)">
										<div class=" close_menu unm mt_5">
											<span>
												<img v-show="emp.sex =='男'" src="@/assets/img/man.jpg" width="28" height="28" />
												<img v-show="emp.sex =='女'" src="@/assets/img/men.jpg" width="28" height="28" />
											</span>
											<a>{{emp.name}}</a>
										</div>
									</li>
								</ul>
							</li>
						</ul>


						<!-- 1 -->
						<ul class="sex">
							<li v-for="emp in item.employeeList" :key="emp.id" @click="selectEmp(emp)">
								<div class=" close_menu unm mt_5">
									<span>
										<img v-show="emp.sex =='男'" src="@/assets/img/man.jpg" width="28" height="28" />
										<img v-show="emp.sex =='女'" src="@/assets/img/men.jpg" width="28" height="28" />
									</span>
									<a>{{emp.name}}</a>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		components: {

		},
		data() {
			return {
				deptEmpData: []
			}
		},
		methods: {
			//获取部门下的员工
			getDeptEmployee() {
				var url = this.url + "/kqParamSetContr/queryDepartmentEmployee";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.deptEmpData = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			//点击选择员工
			selectEmp(item) {
				//alert("选择了：" + item.id + item.name);
				this.$emit("selectEmp", item.id, item.name);
			},

		},
		created() {
			this.getDeptEmployee();
		}
	}
</script>

<style>
	@import '../../assets/css/tree.css'
</style>
