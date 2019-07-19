<template>
	<div class="tab-pane fade" id="detailed">
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">身份证号码：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uIdNum" placeholder="">
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
					<input type="text" class="form-control" v-model="personalDetail.uHomeTown" placeholder="">
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
					<input type="text" class="form-control" v-model="personalDetail.uAccountProp" placeholder="">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">户籍所在地：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uDomicile" placeholder="">
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
					<input type="text" class="form-control" v-model="personalDetail.uHomeAddress" placeholder="">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">现住址：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uCurrentAddress" placeholder="">
				</div>
			</div>
		</div>
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">毕业院校：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uSchools" placeholder="">
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
					<input type="text" class="form-control" v-model="personalDetail.uProfession" placeholder="">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">毕业时间：</label>
				<div class="col-md-8 input-group date form_date">
					<input type="date" class="form-control" v-model="personalDetail.uGraduation" value="">
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
						<input type="text" class="form-control" v-model="personalDetail.uContact" placeholder="">
					</div>
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">紧急联络人：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uEmergencyContact" placeholder="">
				</div>
			</div>
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">紧急联系方式：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uEmergencyPhone" placeholder="">
				</div>
			</div>
		</div>
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">驾龄：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uDrivingExpe" placeholder="">
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
		components:{nation},
		data() {
			return {
				personalDetail:{},
			};
		},
		methods:{
			//清空数据
			cleanData:function(){
				this.personalDetail={}
			},
			nationChange:function(nationName){
				this.personalDetail.uNationName = nationName
			}
		}
	}
</script>

<style>

</style>
