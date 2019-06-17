<template>
	<div>
		<div class="modal-dialog staff_t" id="Cause_management">
			<div class="modal-header">
				<button type="button" aria-hidden="true" class="close" v-on:click="cmCloseBtn()">×</button>
				<h4 id="myModalLabel" class="modal-title">离职原因管理</h4>
			</div>
			<table class="table table-bordered table-responsive">
				<thead>
					<tr>
						<th>ID</th>
						<th>原因</th>
						<th>修改</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in lrList" :key="index">
						<td>{{index}}</td>
						<td>{{item.reasonName}}</td>
						<td><button type="button" class="btn btn-info edit" data-toggle="modal" v-on:click="modifyReasonOfResign(item,index)">修改</button></td>
						<td><button type="button" class="btn btn-info" @click="ck(item,index)">删除</button></td>
					</tr>
				</tbody>
			</table>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" data-toggle="modal" v-on:click="addLeaveReasonPopUpWindow()">新增</button>
			</div>
		</div>
		<!--离职原因修改和添加-->
		<div id="Cause_management_changne">
			<div class="modal-header">
				<button type="button" aria-hidden="true" class="close" v-on:click="cmcCloseBtn()">×</button>
				<h4 id="myModalLabel" class="modal-title">编辑离职原因</h4>
			</div>
			<p>离职原因：
				<input type="text" id="edit_input" class="form-control" v-model="resignReason" />
				<div class="modal-footer">
					<button type="button" class="btn btn-info" v-on:click="confirmButton()">确认</button>
					<button type="button" class="btn btn-info" v-on:click="cmcCloseBtn()">返回</button>
				</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				reasonId: '',
				resignReasonId: '',
				resignReason: '',
				addOrUpdate: '',

				lrList: [],
				leaveReson: {},
			};
		},
		methods: {
			//离职原因管理删除按钮
			ck: function(item, index) {
				var r = confirm("确定要删除？")
				if (r == true) {
					console.log(item.reasonName)
					this.resignReasonId = item.reasonId
					this.deleteLeaveReason()
					this.lrList.splice(index, 1)
					alert('已删除');
				} else {
					alert('删除失败');
				}
			},
			//删除离职原因内容提交
			deleteLeaveReason: function() {
				var url = this.url + '/search/deleteLeaveReason'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						reasonId: this.resignReasonId
					},
					dataType: 'json',
				}).then((response) => {
					console.log('deleteLeaveReason')
					console.log(response.data)
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//添加离职原因
			addLeaveReasonPopUpWindow: function() {
				this.addOrUpdate = 'add'
				this.resignReason = ''
				$("#Cause_management_changne").modal('show')
				
			},
			//添加新的离职原因
			addLeaveReason: function() {
				if (this.resignReason == null) {
					alert('原因为空，不能添加！！')
					return
				}
				var url = this.url + '/search/addLeaveReason'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						reasonName: this.resignReason
					},
					dataType: 'json',
				}).then((response) => {
					console.log('addLeaveReason')
					console.log(response.data)
					this.getLeaveReason()
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

			//离职原因修改
			modifyReasonOfResign: function(item, index) {
				$("#Cause_management_changne").modal('show')
				this.addOrUpdate = 'update'
				this.leaveReson = item
				this.resignReason = item.reasonName
				this.resignReasonId = item.reasonId
				this.lrIndex = index
			},

			//修改离职原因确定还是返回
			confirmButton: function() {
				alert(this.addOrUpdate)
				if (this.addOrUpdate == 'add') {
					this.addLeaveReason()
				} else {
					alert(this.resignReason)
					this.$set(this.lrList[this.lrIndex], 'reasonName', this.resignReason)
					alert(this.lrList[this.lrIndex].reasonName)
					this.updateModifyLeaveReason()
				}
				$("#Cause_management_changne").modal('hide')
			},

			//修改离职原因内容提交
			updateModifyLeaveReason: function() {
				var url = this.url + '/search/updateLeaveReason'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						reasonId: this.resignReasonId,
						reasonName: this.resignReason
					},
					dataType: 'json',
				}).then((response) => {
					console.log(updateModifyLeaveReason)
					console.log(response.data)
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			// 获取所有离职原因
			getLeaveReason: function() {
				var url = this.url + '/search/leaveReasonList'
				// alert(url)
				axios({
					method: 'get',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					dataType: 'json',
				}).then((response) => {
					console.log('leaveReasonList')
					console.log(response)
					this.lrList = response.data
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			cmCloseBtn: function() {
				$("#Cause_management").modal('hide')
			},
			cmcCloseBtn: function() {
				$("#Cause_management_changne").modal('hide')
			}
		},
		created() {
			this.getLeaveReason()
		}

	}
</script>

<style>

</style>
