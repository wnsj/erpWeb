<template>
	<!-- 	班组管理主页 -->
	<div class="tab-pane fade" id="bzgl">
		<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="position:relative;">
			<div class="table-responsive col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">班组名称</th>
							<th class="text-center">备注</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in shiftGroup" :key="index" v-on:dblclick="showShiftGroup(item)">
							<td class="text-center">{{item.name}}</td>
							<td class="text-center">{{item.remark}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<updateAttShiftGroup :shiftGroupObj="shiftGroupObj"></updateAttShiftGroup>
					<addAttShiftGroup></addAttShiftGroup>
			<button class="btn-primary btn" data-toggle='modal' data-target='#mybzgl'>新增</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import addAttShiftGroup from '../subParamManage/subMethod/addAttShiftGroup.vue'
	import updateAttShiftGroup from '../subParamManage/subMethod/updateAttShiftGroup.vue'

	export default {
		components: {
			addAttShiftGroup,
			updateAttShiftGroup
		},
		data() {
			return {
				shiftGroup: [],
				shiftGroupObj:{}
			}
		},
		methods: {
			//查询班组
			getShiftGroup: function(item) {
				var url = this.url + "/kqParamSetContr/queryAttShiftGroup";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.shiftGroup = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			// 双击弹班组修改框
			showShiftGroup: function(item) {
				$("#mybzgl_update").modal("show");
				this.shiftGroupObj = Object.assign({}, item);
			}
		},
		created() {
			this.getShiftGroup();
		}
	}
</script>

<style>
</style>
