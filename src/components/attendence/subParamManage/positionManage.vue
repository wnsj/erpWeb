<template>
	<!-- 职位信息管理主页 -->
	<div class="tab-pane fade" id="zwgl">
		<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="position:relative;">
			<div class="table-responsive col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<div class="col-lg-8 mtr_a"> <span>职位信息管理：</span> </div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">职位名称</th>
							<th class="text-center">岗位类型</th>
							<th class="text-center">重点岗位</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in positionInfo" :key="index" @dblclick="dblPositionInfo(item)">
							<td class="text-center">{{item.POSITION_NAME}}</td>
							<td class="text-center">{{item.POSITIONTYPE_NAME}}</td>
							<td class="text-center">{{item.ISPOINT}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button class="btn-primary btn" data-toggle='modal' data-target='#myzwgl'>新增</button>
		</div>
		<div>
			<updatePosition :postData = "postData" ref="updatePosition"></updatePosition>
			<addPosition></addPosition>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import updatePosition from './subMethod/updatePosition.vue'
	import addPosition from './subMethod/addPosition.vue'

	export default {
		components: {
			updatePosition,
			addPosition
		},
		data() {
			return {
				positionInfo: [],
				postData:{}
			}
		},
		methods: {
			// 获取职位信息
			getPositionInfo() {
				var url = this.url + "/kqParamSetContr/queryPositionData";
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
						this.positionInfo = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			//双击显示职位信息
			dblPositionInfo(item) {
				$("#mychangePositionInfo").modal("show");
				this.postData = Object.assign({}, item);
				this.$refs.updatePosition.setPositionTypeData(item.POSITIONTYPE_ID);
				
				//this.$refs.updatePosition.$refs.positionType.setParam(item.POSITIONTYPE_ID);
				
				// 调用子组件中的方法（方法1）
				// <updatePosition :postData = "postData" ref="updatePosition"></updatePosition>
				// this.$refs.updatePosition.setPositionTypeData('8899');
				// 
				// 调用子组件中的方法（方法2）
				// this.$children[0].setPositionTypeData('8889999');
				// alert("this.$children.length:"+this.$children.length);
				// //输出所有子组件
				// for(let i=0;i < this.$children.length;i++){
				// 	console.log(this.$children[i]);//输出子组件；
				// }
			}
		},
		created() {
			this.getPositionInfo();
		}
	}
</script>

<style>
</style>

