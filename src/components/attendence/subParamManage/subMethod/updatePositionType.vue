<template>
	<!-- 修改岗位类型 -->
	<div class="modal fade" id="mymodale">
		<div class="modal-dialog" style="position:relative;">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix" style="padding-bottom:50px;">
					<div class="col-md-10 col-md-offset-1">
						<h2>编辑岗位类型</h2>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">岗位类型：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" v-model="postTypeData.positionType_Name" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<button data-dismiss="modal" class="btn btn-primary mtbod">返回</button>
			<button data-dismiss="modal" class="btn btn-primary" @click="changeJobsType">确认</button>
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
		props: ['postTypeData'],
		data() {
			return {

			}
		},
		methods: {
			//修改岗位类型
			changeJobsType() {
				if(isBlank(this.postTypeData.positionType_Name)){
					alert("岗位类型不能为空!");
					return;
				}
				var url = this.url + "/kqParamSetContr/updatePositionType";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						positionTypeId: this.postTypeData.positionType_ID,
						positionTypeName: this.postTypeData.positionType_Name
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getjobsType();
						$("#mymodale").modal("hide");
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
		},
		created() {

		}
	}
</script>

<style>
</style>
