<template>
	<!-- 详细信息 -->
	<div class="tab-pane fade" id="checkDetailed">
		<div class="martop1 clearfix">
			<div class="form-group col-md-6 clearfix">
				<label class="col-md-4 control-label text-right nopad">身份证号码：</label>
				<div class="col-md-8">
					<input type="text" class="form-control" v-model="personalDetail.uIdNum">
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
					<nation ref='nation'></nation>
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
					<input type="text" class="form-control" v-model="personalDetail.uMarital">
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
				<div class="col-md-8 input-group date form_date">
					<input type="datetime" class="form-control" v-model="personalDetail.uGraduation">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div>
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
		<!--</div>-->
		<!--</div>-->
	</div>
	
</template>

<script>
	import axios from 'axios'
	import nation from '../../../vuecommon/nation.vue'
	export default {
		components:{nation},
		
		data() {
			return {
				accountId:'',
				personalDetail:{},
			};
		},
		methods:{
			childrenDetailInfo:function(param){
				
				this.getEmpDetail(param)
			},
			getEmpDetail:function (param) {
				var uDetailUrl = this.url + '/search/detailInfo'
				//个人详细信息
				axios({
					method: 'post',
					url: uDetailUrl,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						recruitDataID: param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.personalDetail=res.resData[0]
						this.$refs.nation.setNation(this.personalDetail.uNationality)
						console.log('personalBase:'+this.personalDetail.uIdNum)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
		}
	}
</script>

<style>

</style>

