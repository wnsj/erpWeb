<!-- author:dingdong -->
<template>
	<div class="tab-pane fade" id="updateEducation">
		<div class="eduExp_info clearfix">
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">学历：</label>
				<div class="col-md-3">
          			<select class="form-control" v-model="eduAndExpInfo.education">
						<option v-for="(item,index) in educationState" :key="index" :value="item.label">
						{{item.label}}
						</option>
					</select>
				</div>
				<label for="profession" class="col-md-2 control-label text-right nopad">专业：</label>
				<div class="col-md-3">
          			<input type="text" class="form-control" id="profession" placeholder="Profession" v-model="eduAndExpInfo.profession" />
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="graduation" class="col-md-2 control-label text-right nopad">毕业时间：</label>
				<div class="col-md-3">
          			<input type="date" class="form-control"  id="graduation" v-model="eduAndExpInfo.graduation" />
				</div>
				<label for="birth" class="col-md-2 control-label text-right nopad">是否在学：</label>
				<div class="col-md-3">
          			<select class="form-control" v-model="eduAndExpInfo.atSchool">
						<option v-for="(item,index) in atSchoolStatus" :key="index" :value="item.value">
						{{item.label}}
						</option>
					</select>
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="school" class="col-md-2 control-label text-right nopad">毕业学校：</label>
                <div class="col-md-4">
                  <input type="text" class="form-control" id="school" placeholder="School" v-model="eduAndExpInfo.school">
                </div>
			</div>
			<div class="form-group clearfix">
				<label for="workexp" class="col-md-2 control-label text-right nopad">相关经验：</label>
                <div class="col-md-2">
                  <input type="text" value="0" class="form-control" id="workexp" placeholder="Work Exp" v-model="eduAndExpInfo.workexp">
                </div>
				<label class="col-md-1 control-label nopad">个月</label>
			</div>
			<div class="form-group clearfix">
				<label for="workCompany" class="col-md-2 control-label text-right nopad">工作单位：</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" id="workCompany" placeholder="Company" v-model="eduAndExpInfo.workCompany">
                </div>
			</div>
			<div class="form-group clearfix">
				<label for="certificate" class="col-md-2 control-label text-right nopad">技能证书：</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" id="certificate" placeholder="Certificate" v-model="eduAndExpInfo.certificate">
                </div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		components:{},
		data() {
			return {
				eduAndExpInfo:{},
				educationState:[
					{value:'0',label:'未知'},
					{value:'1',label:'博士'},
					{value:'2',label:'硕士研究生'},
					{value:'3',label:'本科'},
					{value:'4',label:'专科'},
					{value:'5',label:'高中/中专'},
					{value:'6',label:'初中及以下'},
				],
				atSchoolStatus: [
					{value:'0',label:'否'},
					{value:'1',label:'是'},
				],
			};
		},
		methods:{
			childBasicEduAndExp(val){
				this.eduAndExpInfo = val
				console.log(this.interviewBase)
			},
		}
	}
</script>

<style>
.eduExp_info {
    margin-top: 30px;
}
</style>