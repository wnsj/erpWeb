<template>
	<!-- 添加假期类型 -->
	<div class="modal fade" id="mymodal">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<p>假期种类：
							<input type="text" class="form-control" v-model="newHolidaysName" placeholder="输入假期类型" style="margin-top:20px;" />
						</p>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" id = "addHolidaysTypeBtn" class="btn btn-primary" @click="addHolidaysType">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
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
			//添加假期类型
			addHolidaysType() {
				this.newHolidaysId = this.holidaysType.length + 1;
				var newHoliday = new Object();
				var url = this.url + "/kqParamSetContr/addVacation";
				newHoliday.id = this.newHolidaysId;
				newHoliday.name = this.newHolidaysName;
				if (this.newHolidaysName == "") {
					alert("假期类型不能为空");
					return;
				}
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						name: this.newHolidaysName
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.queryVacation();
					} else {
						alert(response.data.retMsg)
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				this.newHolidaysName = "";
				$("#mymodal").modal("hide");
			}
		}
	}
</script>

<style>
</style>
