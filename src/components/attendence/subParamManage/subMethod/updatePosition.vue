<template>
	<!-- 编辑职位信息 -->
	<div class="modal fade" id="mychangePositionInfo">
		<div class="modal-dialog" style="position:relative;">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<h2>编辑职位信息</h2>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">岗位类型：</label>
							</div>
							<div class="col-md-9">
								<!-- <select class="com-opt" v-model="changePositionType">
									<option v-for="(item,index) in jobsType" :key="index" :value="item.positionType_ID">
										{{item.positionType_Name}}</option>
								</select> -->
								<positionType @postTypeChange='postTypeChangeData' ref="positionType"></positionType>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">职位名称：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" v-model="postData.POSITION_NAME" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">重点岗位：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="checkbox" v-model="postData.ISPOINT" />
								是 </div>
						</div>
					</div>
				</div>
			</div>
			<button data-dismiss="modal" class="btn btn-primary mtbox">返回</button>
			<button data-dismiss="modal" class="btn btn-danger" @click="changePositionInfo">确认</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import positionType from '@/components/vuecommon/positionType.vue'
	import {isBlank} from '@/assets/js/constant.js'

	export default {
		components: {
			positionType
		},
		props: ['postData'],
		data() {
			return {

			}
		},
		methods: {
			postTypeChangeData(postTypeId,postTypeName) {
				this.postData.POSITIONTYPE_ID = postTypeId;
			},
			// 修改职位信息
			changePositionInfo() {
				var url = this.url + "/kqParamSetContr/updatePositionData";
				if (isBlank(this.postData.POSITION_NAME)) {
					alert("职位名称不能为空");
					return false;
				}
				this.postData.ISPOINT = this.postData.ISPOINT == '是' || this.postData.ISPOINT == true ? 1 : 0;
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						positionName: this.postData.POSITION_NAME,
						positionId: this.postData.POSITION_ID,
						isPoint: this.postData.ISPOINT,
						positionTypeId: this.postData.POSITIONTYPE_ID
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
			},
			setPositionTypeData(postTypeId) {
				this.$refs.positionType.setParam(postTypeId);
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
