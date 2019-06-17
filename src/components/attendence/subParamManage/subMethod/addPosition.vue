<template>
	<!-- 添加职位信息 -->
	<div class="modal fade" id="myzwgl">
		<div class="modal-dialog" style="position:relative;">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<h2>添加职位信息</h2>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">岗位类型：</label>
							</div>
							<div class="col-md-9">
								<!-- <select class="com-opt" v-model="newPositionType">
									<option v-for="(item,index) in jobsType" :key="index" :value="item.positionType_ID">
										{{item.positionType_Name}}
									</option>
								</select> -->
								<positionType @postTypeChange='postTypeChangeData'></positionType>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">职位名称：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" v-model="newPositionName" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">重点岗位：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="checkbox" v-model="newIsPoint" />
								是 </div>
						</div>
					</div>
				</div>
			</div>
			<button data-dismiss="modal" class="btn btn-primary mtbox">返回</button>
			<button data-dismiss="modal" class="btn btn-danger" @click="addPositionInfo">确认</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '@/assets/js/constant.js'
	import positionType from '@/components/vuecommon/positionType.vue'

	export default {
		components: {
			positionType
		},
		data() {
			return {
				newPositionName: '',
				newIsPoint: '',
				newPositionType: ''
			}
		},
		methods: {
			// 添加职位信息
			addPositionInfo() {
				if (isBlank(this.newPositionName)) {
					alert("职位名称不能为空");
					return false;
				}
				var url = this.url + "/kqParamSetContr/addPositionData";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						positionName: this.newPositionName,
						isPoint: this.newIsPoint,
						positionTypeId: this.newPositionType
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getPositionInfo();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				this.newPositionName = "";
				this.newPositionType = "0";
				this.newIsPoint = 0;
			},
			postTypeChangeData(postTypeId) {
				this.newPositionType = postTypeId;
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
