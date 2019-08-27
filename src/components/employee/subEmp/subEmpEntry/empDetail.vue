<template>
	<div class="tab-pane fade" id="detailed">
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">身份证号码：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uIdNum">
					<!-- <input type="text" class="form-control" v-model="test"> -->
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">政治面貌：</label>
				<div class="col-md-8">
					<select class="form-control" v-model="personalDetail.uPloitical">
						<option value="">团员</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">籍贯：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uHomeTown">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">民族：</label>
				<div class="col-md-8">
					<nation @nationChange='nationChange'></nation>
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">户口性质：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uAccountProp">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">户籍所在地：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uDomicile">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">婚姻状况：</label>
				<div class="col-md-8">
					<select class="form-control" v-model="personalDetail.uMarital">
						<option value="0">未婚</option>
						<option value="1">已婚</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">家庭住址：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uHomeAddress">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">现住址：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uCurrentAddress">
				</div>
			</div>
		</div>
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">毕业院校：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uSchools">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">最高学历：</label>
				<div class="col-md-8">
					<select class="form-control" v-model="personalDetail.uEducation">
						<option value="">未知</option>
						<option value="">博士</option>
						<option value="">硕士</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">所学专业：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uProfession">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">毕业时间：</label>
				<div class="col-md-8 input-group date form_date">
					<input type="date" class="form-control" v-model="personalDetail.uGraduation">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">是否在学：</label>
				<div class="col-md-8">
					<div class="checkbox">
						<label>
							<input type="checkbox" v-model="personalDetail.uAtSchool">
							是 </label>
					</div>
				</div>
			</div>
		</div>
		<div class="martop1 clearfix">
			<div class="col12 clearfix">
				<div class="form-group col-md-6 clearfix">
					<label class="col-md-4 control-label text-right nopad">联系方式：</label>
					<div class="col-md-8">
						<input type="text" class="form-control" v-model="personalDetail.uContact">
					</div>
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">紧急联络人：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uEmergencyContact">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">紧急联系方式：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uEmergencyPhone">
				</div>
			</div>
		</div>
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">驾龄：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uDrivingExpe">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">驾照类型：</label>
				<div class="col-md-8">
					<select class="form-control" v-model="personalDetail.uLicenseType">
						<option value="">无</option>
						<option value="">C1</option>
					</select>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import nation from '../../../vuecommon/nation.vue'
	export default {
		components: {
			nation
		},
		data() {
			return {
				personalDetail: {
					uIdNum: '',
					uPloitical: '',
					uHomeTown: '',
					uNationName: '',
					uAccountProp: '',
					uMarital: '',
					uHomeAddress: '',
					uCurrentAddress: '',
					uSchools: '',
					uEducation: '',
					uProfession: '',
					uGraduation: '',
					uAtSchool: '',
					uContact: '',
				},
				// test:'测试',
			};
		},
		methods: {
			initData: function(param) {
				console.log("详细信息赋值:" + param.idNum)
				// this.test='测试成功'
				if (!this.isBlank(param)) {
					this.personalDetail.uIdNum = param.idNum
					console.log("详细信息赋值:" + this.personalDetail.uIdNum)
					this.personalDetail.uPloitical = param.ploitical
					this.personalDetail.uHomeTown = param.homeTown
					this.personalDetail.uNationName = param.nation
					this.personalDetail.uAccountProp = param.accountProp
					this.personalDetail.uMarital = param.marital
					this.personalDetail.uHomeAddress = param.homeAddress
					this.personalDetail.uCurrentAddress = param.address

					this.personalDetail.uSchools = param.school
					this.personalDetail.uEducation = param.education
					this.personalDetail.uProfession = param.profession
					this.personalDetail.uGraduation = param.graduation
					this.personalDetail.uAtSchool = param.atSchool

					this.personalDetail.uContact = param.phone

				} else {
					this.personalDetail = {}
				}
			},
			//初始化数据
			cleanData: function(param) {
				this.personalDetail = {}
			},
			nationChange: function(nationName) {
				this.personalDetail.uNationName = nationName
			}
		}
	}
</script>

<style>

</style>
