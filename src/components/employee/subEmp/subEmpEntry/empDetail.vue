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
						<option value="团员">团员</option>
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
						<option value="学士">学士</option>
						<option value="博士">博士</option>
						<option value="硕士">硕士</option>
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
				<dPicker v-model="personalDetail.uGraduation"></dPicker>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">是否在学：</label>
				<div class="col-md-8">
					<div class="checkbox">
						<label>
							<input type="checkbox" v-on:click="atSchoolAction()">
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
						<option value="无">无</option>
						<option value="C1">C1</option>
					</select>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import dPicker from 'vue2-datepicker'
	import nation from '../../../vuecommon/nation.vue'
	export default {
		components: {
			nation,
			dPicker
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
					uGraduation: this.moment('','YYYY-MM-DD 00:00:00.000'),
					uAtSchool: '',
					uContact: '',
				},
			};
		},
		methods: {
			initData: function(param) {
				console.log("详细信息赋值:" + param.idNum)
				
				this.personalDetail = {}
			},
			
			atSchoolAction:function(){
				if(this.personalDetail.uAtSchool=='1'){
					this.personalDetail.uAtSchool='0'
				}else{
					this.personalDetail.uAtSchool='1'
				}
			},
			
			//初始化数据
			cleanData: function(param) {
				this.personalDetail = {}
			},
			nationChange: function(nationName) {
				this.personalDetail.uNationality = nationName
			}
		}
	}
</script>

<style>

</style>
