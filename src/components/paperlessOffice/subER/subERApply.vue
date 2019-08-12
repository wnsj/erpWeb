<template>
	<div class="modal fade" id="erApply" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h1 class="modal-title">人员需求申请表</h1>
				</div>

				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:15px">
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
							<p>申请日期：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<datePicker v-model="applyTime" :disabled="true"></datePicker>
							<!-- 
							<input type="date" class="form-control" v-model="emprInfo.applyTime"/> -->
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>要求到岗日期：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" disabled="true">
							<datePicker v-model="needTime"></datePicker>
						</div>
					</div>
				</div>

				<div class="modal-header modal_header_leave">
					<h6>申请说明</h6>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">

						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">

							<dlp @positionChange='positionChange' @departChange='departChange'></dlp>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>申请原因：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<select class="form-control" v-model="emprInfo.Apply_type">
								<option v-for="(item,index) in applyReason" :key="index" v-bind:value="item.name">{{item.name}}</option>
							</select>
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding:0">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>空缺人数：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 people_add">
								<input class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 34px;" v-model="numOfPeople">
								<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_01 offday_add" style="padding:0">
									<!-- <button class="btn btn-default fa fa-caret-up" type="button"></button>
                        <button class="btn btn-default fa fa-caret-down" type="button"></button> -->

									<button class="btn btn-default" type="button" v-on:click="changeNum('上')"></button>
									<button class="btn btn-default" type="button" v-on:click="changeNum('下')"></button>
								</div>
							</div>
						</div>


					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding:0">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>说明：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<textarea class="people_talk col-xs-12 col-sm-12 col-md-12 col-lg-12" v-model="emprInfo.fileName"></textarea>
							</div>

						</div>
					</div>
				</div>
				<!-- 上传附件 -->
				<div class="row add-mt add_people">
					<button type="button" class="btn btn-warning pull-right">上传附件</button>

				</div>



				<div class="modal-header modal_header_leave">
					<h6>职位要求</h6>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
							<p>基本期望</p>
						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="padding: 0; line-height: 34px;">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
									<p>性别：</p>
								</div>
								<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
									<select class="form-control" v-model="emprInfo.sex">
										<option value="男">男</option>
										<option value="女">女</option>
										<option value="无要求">无要求</option>
									</select>
								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
									<p>年龄：</p>
								</div>
								<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
									<input list="addAgeGroups" v-model="emprInfo.age" v-on:change="inputChange()" />
									<datalist id="addAgeGroups">
										<option v-for="(item,index) in addAgeGroups" :key='index'>{{item.name}}</option>
									</datalist>
								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
									<p>婚育：</p>
								</div>
								<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
									<select class="form-control" v-model="emprInfo.obsterical">
										<option value="未婚未育">未婚未育</option>
										<option value="已婚未育">已婚未育</option>
										<option value="已婚已育">已婚已育</option>
										<option value="无要求">无要求</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
							<p>工作经验</p>
						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="padding: 0; line-height: 34px;">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
									<p>行业背景：</p>
								</div>
								<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
									<input list="addIndustry" v-model="emprInfo.industry" v-on:change="inputChange(emprInfo.industry)" />
									<datalist id="addIndustry">
										<option v-for="(item,index) in addIndustry" :key='index'>{{item.name}}</option>
									</datalist>
								</div>
								<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
									<p>工作年限：</p>
								</div>
								<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
									<input list="addyearsOfWorking" v-model="emprInfo.yearsOfWorking" v-on:change="inputChange(addYearsOfWorkGroups)" />
									<datalist id="addyearsOfWorking">
										<option v-for="(item,index) in addYearsOfWorkGroups" :key='index'>{{item.name}}</option>
									</datalist>
								</div>
								<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
									<p>跳槽频率：</p>
								</div>
								<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<input list="addJobHapping" v-model="emprInfo.jobHapping" v-on:change="inputChange(emprInfo.jobHapping)" />
									<datalist id="addJobHapping">
										<option v-for="(item,index) in addjobHapping" :key='index'>{{item.name}}</option>
									</datalist>
								</div>
							</div>
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
							<p>教育背景</p>
						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="padding: 0; line-height: 34px;">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
									<p>学历：</p>
								</div>
								<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
									<input list="addEducation" v-model="emprInfo.education" v-on:change="inputChange(emprInfo.education)" />
									<datalist id="addEducation">
										<option value="大专">大专</option>
										<option value="本科">本科</option>
										<option value="硕士">硕士</option>
										<option value="博士">博士</option>
										<option value="无要求">无要求</option>
									</datalist>

								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
									<p>专业：</p>
								</div>
								<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
									<input list="addMajor" v-model="emprInfo.major" v-on:change="inputChange(emprInfo.major)" />
									<datalist id="addMajor">
										<option v-for="(item,index) in addMajor" :key='index'>{{item.name}}</option>
									</datalist>
								</div>
							</div>
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
							<p>必备技能</p>
						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="padding: 0; line-height: 34px;">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
									<p>电脑水平：</p>
								</div>
								<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<input list="addComputerLevel" v-model="emprInfo.computerLevel" v-on:change="inputChange(emprInfo.computerLevel)" />
									<datalist id="addComputerLevel">
										<option value="一般">一般</option>
										<option value="熟悉">熟悉</option>
										<option value="无要求">无要求</option>
									</datalist>
								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
									<p>外语水平：</p>
								</div>
								<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<input list="addFLLevel" v-model="emprInfo.foreignLanguageLevel" v-on:change="inputChange(emprInfo.foreignLanguageLevel)" />
									<datalist id="addFLLevel">
										<option value="一般">一般</option>
										<option value="熟悉">熟悉</option>
										<option value="无要求">无要求</option>
									</datalist>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="modal-header modal_header_leave">
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
							<p>优质条件：</p>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<textarea class="people_talk col-xs-12 col-sm-12 col-md-12 col-lg-12" v-model="emprInfo.essentialCondition"></textarea>
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
							<p>岗位其他补充需求：</p>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<textarea class="people_talk col-xs-12 col-sm-12 col-md-12 col-lg-12" v-model="emprInfo.supplement"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="col-md-12">
						<button type="button" class="btn btn-warning" v-on:click="empRequireApply()">提交</button>
						<button type="button" data-dismiss="modal" class="btn btn-warning">取消</button>
					</div>
				</div>

				<div class="modal-header modal_header_leave">
					<h6>意见</h6>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>审查负责人：</p>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 34px;">
							<select class="form-control" v-model="checkEMPId">
								<option value="0">---未选择---</option>
								<option v-for="(item,index) in checkEMPList" :key='index' v-bind:value="item.id">{{item.name}}</option>
							</select>
						</div>
						<div class="col-md-1">
							<button type="button" class="btn btn-warning pull-left m_r_10" v-on:click="addAction()">+</button>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>意见：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">

							<button type="button" class="btn btn-warning" disabled="true">同意</button>
							<button type="button" class="btn btn-warning" disabled="true">不同意</button>
						</div>

					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>审批负责人：</p>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 34px;">
							<select class="form-control" v-model="emprInfo.shenpiId">
								<option v-for="(item,index) in approvalEMPList" :key='index' v-bind:value="item.id" >{{item.name}}</option>
							</select>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>意见：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">

							<button type="button" class="btn btn-warning" disabled="true">同意</button>
							<button type="button" class="btn btn-warning" disabled="true">不同意</button>
						</div>

					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>审核负责人：</p>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 34px;">
							<select class="form-control" v-model="emprInfo.renliId">
								<option value="1127">李珊珊</option>
							</select>
						</div>

					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>意见：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">

							<button type="button" class="btn btn-warning" disabled="true">同意</button>
							<button type="button" class="btn btn-warning" disabled="true">不同意</button>
						</div>

					</div>


					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>用人负责人：</p>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 30px;">
							<input type="text" class="" v-model="applyName" disabled="true">
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>完成情况：</p>
						</div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<button type="button" class="btn btn-warning col-xs-12 col-sm-12 col-md-12 col-lg-12" disabled="true">完成</button>
						</div>

					</div>
				</div>
				<div class="peopl-footer">
					<p>备注：须严格按照《九博科技公司审批权限分配表》执行审批签字</p>
				</div>

			</div>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import dlp from '../../../components/vuecommon/departLinkPosition.vue'
	import datePicker from 'vue2-datepicker'
	export default {
		components: {
			datePicker,
			dlp,
		},
		data() {
			return {
				emprInfo: {},

				/* 上 */
				applyTime: this.moment(),
				needTime: this.moment(),
				numOfPeople: 1,
				positionTypeId:'',
				applyReason:[
					{id:0,name:'离职补缺',},
					{id:1,name:'岗位调动',},
					{id:2,name:'业务发展扩编',},
					{id:3,name:'替换人员',},
					{id:4,name:'新增职位 附《工作说明》',},
					{id:5,name:'其他',}
				],
				
				/* 中 */
				addAgeGroups: [], //年龄段
				addYearsOfWorkGroups: [], //工龄
				addIndustry: [], //行业
				addjobHapping: [], //跳槽频率
				addEducation: ['大专', '本科', '硕士', '博士', '无要求'], //学历
				addMajor: [], //专业
				addComputerLevel: ['一般', '熟练', '其他', '无要求'], //电脑水平
				addFLLevel: ['一般', '熟练', '其他', '无要求'], //外语水平
				
				/* 下 */
				checkEMPList:[],		//审查人列表
				checkEMPId:'0',
				approvalEMPList:[],		//审批人
				btnTime:'0',
				applyName:this.accountInfo().account_Name
			};
		},
		methods: {
			initEMPRInfo: function() {
				this.emprInfo.applyTime = this.applyTime
				this.emprInfo.needTime = this.needTime

				this.requireAllData('selectWorkAge', 'yowg')
				this.requireAllData('selectMajor', 'major')
				this.requireAllData('jobHopFrequency', 'jhf')
				this.requireAllData('industryBackground', 'ib')
				this.requireAllData('selectAgeLsit', 'ag')
				
				this.checkEMPList=[]
				this.approvalEMPList=[]
				this.btnTime='0'
				this.emprInfo.applyId=this.accountInfo().account_ID
			},
			//空缺人数
			changeNum: function(param) {
				if (param == '上') {
					this.numOfPeople++
				} else if (param == '下' && this.numOfPeople > 1) {
					this.numOfPeople--
				}
			},
			//部门变化
			departChange: function(departId, departName) {
				this.emprInfo.departmentId = departId
				this.emprInfo.departmentName = departName
			},
			//岗位变化
			positionChange: function(positionId) {
				this.emprInfo.positionId = positionId
				this.checkEMPList=[]
				this.approvalEMPList=[]
				this.checkBtn()
				this.apparovalBtn()
			},
			//‘+’点击
			addAction:function(){
				if(this.btnTime=='0'){
					this.btnTime='1'
				}else{
					this.btnTime='0'
				}
				this.checkBtn()
			},
			selectCheckAction:function(item){
				// this.emp
			},
			//审查人 ‘+’
			checkBtn: function() {
				if(this.isBlank(this.emprInfo.departmentId)){
					alert('请先选择部门')
					return
				}
				if(this.isBlank(this.emprInfo.positionId)){
					alert('请先选择岗位')
					return
				}
				
				this.checkEMPList=[]
				
				var url = this.url + '/wzbg/empRequireCheckList'
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data:{
							btnTime:this.btnTime,
							departId:this.emprInfo.departmentId,
							positionId:this.emprInfo.positionId,
						},
						dataType: "json"
					})
					.then(response => {
						var res = response.data
						if (res.retCode == '0000') {
							console.log(res)
							if (res.resData.length > 0) {
								this.checkEMPList = res.resData
							}
						} else {
							alert(res.retMsg)
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			},
			//审批人
			apparovalBtn: function() {
				if(this.isBlank(this.emprInfo.departmentId)){
					alert('请先选择部门')
					return
				}
				if(this.isBlank(this.emprInfo.positionId)){
					alert('请先选择岗位')
					return
				}
				
				this.checkEMPList=[]
				
				var url = this.url + '/wzbg/empRequireApprolList'
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data:{
							positionId:this.emprInfo.positionId,
						},
						dataType: "json"
					})
					.then(response => {
						var res = response.data
						if (res.retCode == '0000') {
							console.log(res)
							if (res.resData.length > 0) {
								this.approvalEMPList = res.resData
							}
						} else {
							alert(res.retMsg)
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			},
			
			//职位要求 中所有可选数据
			requireAllData(partUrl, param) {
				var url = this.url + '/wzbg/' + partUrl
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						dataType: "json"
					})
					.then(response => {
						var res = response.data
						if (res.retCode == '0000') {
							console.log(res)
							if (res.resData.length > 0) {
								if (param == 'yowg') {
									this.addYearsOfWorkGroups = res.resData
								} else if (param == 'major') {
									this.addMajor = res.resData
								} else if (param == 'jhf') {
									this.addjobHapping = res.resData
								} else if (param == 'ib') {
									this.addIndustry = res.resData
								} else if (param == 'ag') {
									this.addAgeGroups = res.resData
								}

							}
						} else {
							alert(res.retMsg)
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			},
		
			//申请
			empRequireApply:function(){
				if(this.isBlank(this.emprInfo.departmentId)){
					alert('请先选择部门')
					return
				}
				if(this.isBlank(this.emprInfo.positionId)){
					alert('请先选择岗位')
					return
				}
				this.emprInfo.needTime=this.moment(this.needTime,'YYYY-MM-DD hh-mm-ss')
				this.emprInfo.num=this.numOfPeople
				if(this.emprInfo.needTime<=this.moment('','YYYY-MM-DD hh-mm-ss')){
					alert('到岗日期必须大于当前日期')
					return
				}
				this.emprInfo.applyReason=this.emprInfo.Apply_type+this.emprInfo.fileName
				if(this.isBlank(this.emprInfo.Apply_type)){
					alert('申请原因不能为空')
					return
				}
				alert(this.emprInfo.applyReason)
				this.checkEMPList=[]
				if(this.isBlank(this.checkEMPId) || this.checkEMPId=='0'){
					alert('请选择审查人')
					return
				}else{
					this.emprInfo.shenchaId=this.checkEMPId
				}
				if(this.isBlank(this.emprInfo.shenpiId)){
					alert('请选择审批人')
					return
				}
				
				
				
				var url = this.url + '/wzbg/insertEmpRequireApply'
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data:this.emprInfo,
						dataType: "json"
					})
					.then(response => {
						var res = response.data
						if (res.retCode == '0000') {
							console.log(res)
							if (res.resData == 1) {
								alert('申请成功')
								this.$emit('empRequireApply', 'apply')
							} else {
								alert('已经没有更多的数据了')
							}
						} else {
							alert(res.retMsg)
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			}
		},
	}
</script>

<style>

</style>
