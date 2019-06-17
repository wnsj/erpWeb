<template>
	<!-- 假期种类管理主页 -->
	<div class="tab-pane fade" id="jqzlgl">
		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style=" overflow-y: scroll;">
			<div class="table-responsive col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<div class="col-lg-8 mtr_a"> <span>假期种类：</span> </div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">名称</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in holidaysType" :key="index" v-on:dblclick="showholidaysType(item)">
							<td class="text-center" :id="'holiday'+index">{{item.name}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button class="btn-primary btn pull-left" data-toggle='modal' data-target='#mymodal'>新增</button>
		</div>
			<div id="myTabContent">
			<updateHolidaysType :holidaysId="holidaysId" :holidaysName="holidaysName" v-on:increment="updateArrEle" v-on:deleteArr="removeArrEle"></updateHolidaysType>
			<addHolidaysType></addHolidaysType>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	import updateHolidaysType from '../subParamManage/subMethod/updateHolidaysType.vue'
	import addHolidaysType from '../subParamManage/subMethod/addHolidaysType.vue'

	export default {
		components: {
			updateHolidaysType,
			addHolidaysType
		},
		data() {
			return {
				//假期种类
				holidaysType: [],
				holidaysId: "",
				holidaysName: "",
				newHolidaysName: "",
				newHolidaysId: ""
			}
		},
		methods: {
			//查询假期种类
			queryVacation: function() {
				var url = this.url + "/kqParamSetContr/queryVacation";
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					dataType: 'json'
				}).then((response) => {
					this.holidaysType = response.data.retData;
				}).catch(function(error) {
					console.log('请求失败处理');
				});
			},
			// 双击弹出假期种类修改框
			showholidaysType: function(item) {
				$("#updatemymodal").modal("show");
				this.holidaysName = item.name;
				this.holidaysId = item.id;
				console.log("name：" + item.name + ",id:" + item.id);
			},
			// 修改数组中的值
			updateArrEle: function(holidaysId,holidaysName) {
				for(var i = 0;i < this.holidaysType.length;i++ ){
					if(holidaysId == this.holidaysType[i].id){
							this.holidaysType[i].name = holidaysName;
							//alert("holidaysId:"+holidaysId+",holidaysName:"+holidaysName);
							return;
					}
				}
			},
			//删除数组中的元素
			removeArrEle(holidaysId) {
				for (var i = 0; i < this.holidaysType.length; i++) {
					if (holidaysId == this.holidaysType[i].id) {
						this.holidaysType.splice(i, 1);
						return;
					}
				}
			}
		},
		created() {
			this.queryVacation();
		}
	}
</script>

<style>
</style>
