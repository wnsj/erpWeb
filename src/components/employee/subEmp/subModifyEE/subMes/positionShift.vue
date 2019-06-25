<template>
	<div class="modal-dialog staff_t" id="Post_transfer">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeBtn()">×</button>
			<h4 id="myModalLabel" class="modal-title"></h4>
		</div>
		<p>部门：
			<input type="text" v-model="oldDepart" class="form-control">
			&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
			<department :departName="departName" :departId="departId" @departChange='departChange'></department>
		</p>
		<p>职位：
			<input type="text" v-model="oldPosition" class="form-control">
			&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
			<position :positionId='positionId' :positionName='positionName' @positionChange= 'positionChange'></position>
		</p>
		<p>类型：
			<select v-model="shiftStype">
				<option>换岗</option>
				<option>晋升</option>
				<option>降职</option>
			</select>
			&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
			<input type="date" id="postjobe_time" v-model="shiftDate" />
		</p>
		<div class="modal-footer">
			<button type="button" class="btn btn-info" v-on:click="shiftChange()">确认</button>
			<button type="button" class="btn btn-info" v-on:click="closeBtn()">返回</button>
		</div>
	</div>
</template>

<script>
	import department from '../../../../vuecommon/department.vue'
	import position from '../../../../vuecommon/position.vue'
	export default {
		components:{
			department,
			position,
		},
		 props:['oldDepart','oldPosition'],
		data() {
			return {
				departName:'',
				departId:'',
				positionName:'',
				positionId:'',
				shiftDate:'',
				shiftStype:'',
				
				positionShiftInfo:{},
			};
		},
		methods:{
			departChange: function(departId, departName) {
				this.departId = departId
				this.departName = departName
			},
			positionChange: function(positionId, positionName) {
				console.log('positionName'+positionName)
				this.positionId = positionId
				this.positionName = positionName
			},
			shiftChange: function() {
				if (this.departName==''){
					alert('没有选择调动的部门')
					return
				}
				if (this.positionName==''){
					alert('没有选择调动的岗位')
					return
				}
				if (this.shiftDate==''){
					alert('没有选择调动的时间')
					return
				}
				if (this.shiftStype==''){
					alert('没有选择调动的类型')
					return
				}
				this.positionShiftInfo.departName = this.departName
				this.positionShiftInfo.departId= this.departId
				this.positionShiftInfo.positionName = this.positionName
				this.positionShiftInfo.positionId = this.positionId
				this.positionShiftInfo.postjobe_time = this.shiftDate
				this.positionShiftInfo.shiftStype = this.shiftStype
				this.$emit('shiftChange', this.positionShiftInfo)
				$("#Post_transfer").modal('hide')
			},
			closeBtn:function (){
				$("#Post_transfer").modal('hide')
			}
		}
	}
</script>

<style>

</style>
