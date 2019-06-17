<template>
	<!-- 岗位类型管理主页 -->
	<div class="tab-pane fade" id="gwlxgl">
		<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="position:relative;">
			<div class="table-responsive col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<div class="col-lg-8 mtr_a"> <span>岗位类型管理：</span> </div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">ID</th>
							<th class="text-center">类型名称</th>
							<th class="text-center">修改</th>
							<th class="text-center">删除</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in jobsType" :key="index">
							<td class="text-center">{{index+1}}</td>
							<td class="text-center">{{item.positionType_Name}}</td>
							<td class="text-center"><a data-toggle='modal' data-target='#mymodale' style="cursor:pointer;" @click="getjobsTypeInfo(item)">修改</a></td>
							<td class="text-center"><a data-toggle='modal' data-target='#mydeleteJobsType' class="delet" style="cursor:pointer;"
								 @click="getjobsTypeInfo(item)">删除</a></td>
						</tr>
					</tbody>
				</table>
			</div>
			<button class="btn-primary btn" data-toggle='modal' data-target='#mygwlxgl'>新增</button>
		</div>
		<div>
			<updatePositionType :postTypeData="postTypeData"></updatePositionType>
			<addPositionType :postTypeData="postTypeData"></addPositionType>
			<deletePositionType :postTypeData="postTypeData"></deletePositionType>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import updatePositionType from './subMethod/updatePositionType.vue'
	import addPositionType from './subMethod/addPositionType.vue'
	import deletePositionType from './subMethod/deletePositionType.vue'

	export default {
		components: {
			updatePositionType,
			addPositionType,
			deletePositionType
		},
		data() {
			return {
				jobsType: [],
				postTypeData: {}
			}
		},
		methods: {
			// 获取岗位类型信息
			getjobsType() {
				var url = this.url + "/kqParamSetContr/queryPositionType";
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
						this.jobsType = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			// 点击获取岗位类型信息
			getjobsTypeInfo(item) {
				this.postTypeData = Object.assign({}, item);
			}
		},
		created() {
			this.getjobsType();
		}
	}
</script>

<style>
</style>
