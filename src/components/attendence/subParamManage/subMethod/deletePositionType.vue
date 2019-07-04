<template>
	<!-- 删除岗位类型 -->
	<div class="modal fade" id="mydeleteJobsType">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body clearfix" style="padding-bottom:50px;">
					<div class="col-md-10 col-md-offset-1">
						<h2>删除岗位类型</h2>
						<h3>确认删除{{postTypeData.positionType_Name}}？</h3>
					</div>
				</div>
				<div class="modal-footer">
					<div class="col-md-4">
					<button data-dismiss="modal" class="btn btn-danger" @click="deleteJobsType">确认</button>
					</div>
					<div class="col-md-4">
					<button data-dismiss="modal" class="btn btn-primary mtbod">返回</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		components: {

		},
		props: ['postTypeData'],
		data() {
			return {
			}
		},
		methods: {
			//删除岗位类型
			deleteJobsType() {
				var url = this.url + "/kqParamSetContr/deletePositionType";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.postTypeData.positionType_ID
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getjobsType();
						$("#mydeleteJobsType").modal("hide");
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
