<template>
	<div class="modal-dialog staff_t" id="Post_transfer">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeBtn()">×</button>
			<h4 id="myModalLabel" class="modal-title"></h4>
		</div>
		<p>部门：
			<input type="text" v-model="oldDepartmentName" class="form-control">
			&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
			<department @departChange='departChange'></department>
		</p>
		<p>职位：
			<input type="text" v-model="oldPositionName" class="form-control">
			&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
			<position @positionChange= 'positionChange'></position>
		</p>
		<p>类型：
			<select v-model="flag">
				<option>换岗</option>
				<option>晋升</option>
				<option>降职</option>
			</select>
			&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
			<dPicker v-model='upDateTime'></dPicker>
		</p>
		<div class="modal-footer">
			<button type="button" class="btn btn-info" v-on:click="shiftChange()">确认</button>
			<button type="button" class="btn btn-info" v-on:click="closeBtn()">返回</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import department from '../../../../vuecommon/department.vue'
	import position from '../../../../vuecommon/position.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			department,
			position,
			dPicker,
		},
		
		data() {
			return {
				accountId:'',
				oldDepartmentId:'',
				oldDepartmentName:'',
				oldPositionId:'',
				oldPositionName:'',
				newDepartmentId:'',
				newDepartmentName:'',
				newPositionId:'',
				newPositionName:'',
				upDateTime:this.moment(),//调动日期
				flag:'换岗',				//调动类型	
				
				shifInfo:{},		//上传调动信息
				positionShiftInfo:{},
			};
		},
		methods:{
			//初始化数据
			initData:function(param){
				this.oldDepartmentName=param.departName
				this.oldPositionName=param.positionName
				this.shifInfo.oldDepartmentId=param.departId
				this.shifInfo.oldPositionId=param.positionId
				this.shifInfo.accountId=param.accountId
			},
			//部门变化返回部门数据
			departChange: function(departId, departName) {
				this.newDepartmentId = departId
				this.newDepartmentName = departName
			},
			//岗位变化返回岗位数据
			positionChange: function(positionId, positionName) {
				console.log('positionName'+positionName)
				this.newPositionId = positionId
				this.newPositionName = positionName
			},
			//提交岗位变更数据
			shiftChange: function() {
				if (this.departName==''){
					alert('没有选择调动的部门')
					return
				}
				if (this.positionName==''){
					alert('没有选择调动的岗位')
					return
				}
				if (this.upDateTime==''){
					alert('没有选择调动的时间')
					return
				}
				if (this.flag==''){
					alert('没有选择调动的类型')
					return
				}
				if(confirm("确定进行岗位调动操作")==false){
					return
				}
				
				this.positionShiftInfo.departName = this.newDepartmentName
				this.positionShiftInfo.departId= this.newDepartmentId
				this.positionShiftInfo.positionName = this.newPositionName
				this.positionShiftInfo.positionId = this.newPositionId
				
				this.$emit('shiftChange', this.positionShiftInfo)
				this.submitPositionShift()
				
			},
			submitPositionShift:function(){
				
				this.shifInfo.newDepartmentId=this.newDepartmentId
				this.shifInfo.newPositionId=this.newPositionId
				this.shifInfo.upDateTime=this.upDateTime
				this.shifInfo.flag=this.flag
				
				var url = this.url + '/search/insertShiftInfo'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.shifInfo,
					dataType: 'json',
				}).then((response) => {
					console.log('deleteLeaveReason')
					console.log(response.data)
					var res = response.data
					alert(res.retMsg)
					if(res.retCode=='0000'){
						$("#Post_transfer").modal('hide')
					}
				}).catch((error) => {
					alert('岗位调动提交失败')
				});
			},
			closeBtn:function (){
				$("#Post_transfer").modal('hide')
			}
		}
	}
</script>

<style>

</style>
