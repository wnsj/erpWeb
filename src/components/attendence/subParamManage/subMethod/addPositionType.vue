<template>
	<!-- 添加岗位类型 -->
	<div class="modal fade" id="mygwlxgl">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body clearfix" style="padding-bottom:50px;">
					<div class="col-md-10 col-md-offset-1">
						<h2>添加岗位类型</h2>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">岗位类型：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" v-model="newJobsType" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button data-dismiss="modal" class="btn btn-primary mtbod">返回</button>
					<button class="btn btn-danger" @click="addJobsType">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {
		isBlank
	} from '@/assets/js/constant.js'

	export default {
		components: {

		},
		data() {
			return {
				newJobsType: ''
			}
		},
		methods: {
			// 添加岗位类型
			addJobsType() {
				var url = this.url + "/kqParamSetContr/addPositionType";
				if (isBlank(this.newJobsType)) {
					alert("岗位类型不能为空!");
					return false;
				}
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						positionTypeName: this.newJobsType
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getjobsType();
						$("#mygwlxgl").modal("hide");
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				this.newJobsType = "";
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
