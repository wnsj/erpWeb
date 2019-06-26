<!-- author:dingdong -->
<template>
	<div class="tab-pane fade" id="apply">		
		<div class="apply_info clearfix">
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">应聘渠道：</label>
				<div class="col-md-3">
					<channel :channel="apply.channelAddId" @channelChange='getChannelAddId'></channel>
				</div>
				<label for="invitationDate" class="col-md-2 control-label text-right nopad">邀约时间：</label>
				<div class="col-md-3">
          			<input type="date" class="form-control"  id="invitationDate" v-model="apply.invitationDate" />
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">应聘部门：</label>
				<div class="col-md-3">
					<department :departId="apply.departAddId" @departChange='getDepartAddId'></department>
				</div>
				<label class="col-md-2 control-label text-right nopad">应聘职位：</label>
				<div class="col-md-3">
					<position :positionId="apply.positionAddId" @positionChange='getPositionAddId'></position>
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="wages" class="col-md-2 control-label text-right nopad">期望薪资：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="wages" placeholder="Salary" value="0" v-model="apply.wages">
                </div>
				<label class="col-md-1 control-label nopad">元</label>
			</div>
			<div class="form-group clearfix">
				<label for="interviewer" class="col-md-2 control-label text-right nopad">面试官：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="interviewer" placeholder="Interviewer" v-model="apply.interviewer">
                </div>
				<label for="recruitDate" class="col-md-2 control-label text-right nopad">面试时间：</label>
				<div class="col-md-3">
          			<input type="date" class="form-control"  id="recruitDate" v-model="apply.recruitDate" />
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="score" class="col-md-2 control-label text-right nopad">面试得分：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="score" placeholder="Score" value="0" min="0" max="100" v-model="apply.score">
                </div>
				<label for="recruitDate" class="col-md-2 control-label text-right nopad">是否合格：</label>
				<div class="col-md-3">
          			<select class="form-control" v-model="apply.isQualified">
						<option v-for="(item,index) in qualifiedStatus" :key="index" :value="item.value">
						{{item.label}}
						</option>
					</select>
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="isPay" class="col-md-2 control-label text-right nopad">是否报销路费：</label>
				<div class="col-md-3">
          			<select class="form-control" v-model="apply.isPay">
						<option v-for="(item,index) in isPayStatus" :key="index" :value="item.value">
						{{item.label}}
						</option>
					</select>
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="remark" class="col-md-2 control-label text-right nopad">备注：</label>
				<div class="col-md-10">
					<textarea class="textarea" id="remark" placeholder="Remark" v-model="apply.remark"></textarea>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import position from '../../../vuecommon/position.vue'
	import channel from '../../../vuecommon/channel.vue'
	import department from '../../../vuecommon/department.vue'

	export default {
		components:{
			channel,
			department,
			position
		},
		data() {
			return {
				apply:{
					departAddId: '0',
					positionAddId: '',
					channelAddId: '',
					isQualified: '0',
					isPay: '0',
				},
				qualifiedStatus: [
					{value:'0',label:'待定'},
					{value:'1',label:'是'},
					{value:'2',label:'否'},
				],
				isPayStatus: [
					{value:'0',label:'否'},
					{value:'1',label:'是'},
				],
			};
		},
		methods:{
			getChannelAddId(channelId){   // 渠道
				this.apply.channelAddId = channelId
			},
			getDepartAddId(departId){   // 渠道
				this.apply.departAddId = departId
			},
			getPositionAddId(positionId){ // 职位
				this.apply.positionAddId = positionId
			},
		}
	}
</script>

<style>
.textarea{
	resize:none;
	width: 79%;
	height: 120px;
}
.apply_info {
    margin-top: 30px;
}
</style>