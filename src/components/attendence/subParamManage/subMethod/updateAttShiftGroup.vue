<template>
	<!-- 修改，删除班组 -->
	<div class="modal fade" id="mybzgl_update" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
			  <div class="form-group clearfix">
                <div class="col-md-8">
                  <button class="btn btn-primary pull-right" data-toggle='modal' data-target='#myGroupsInfo'>班组人员分配</button>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="name" class="col-md-3 control-label text-right nopad">班组名称：</label>
                <div class="col-md-5">
                  <input class="form-control" type="text" name="" placeholder="班组名称" v-model="shiftGroupObj.name" />
                </div>
              </div>
			  <div class="form-group clearfix">
				<label for="remark" class="col-md-3 control-label text-right nopad">备注：</label>
				<div class="col-md-5">
					<textarea class="textarea" id="remark" placeholder="备注" v-model="shiftGroupObj.remark"></textarea>
				</div>
			  </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-2">
              <button type="button" class="btn btn-warning" @click="updateShiftGroup">确认</button>
            </div>
			<div class="col-md-4">
              <button class="btn btn-danger" @click="deleteShiftGroup">删除</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
	  <div>
		<teamAssignment />
	  </div>
    </div><!-- /.modal -->
	
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '../../../../assets/js/constant.js'
	import teamAssignment from './childMethod/teamAssignment.vue'

	export default {
		props: ['shiftGroupObj'],
		components: {
			teamAssignment
		},
		methods: {
			//修改班组类型
			updateShiftGroup() {
				if (isBlank(this.shiftGroupObj.name)) {
					alert("班组名不能为空");
					return;
				}
				var url = this.url + "/kqParamSetContr/updateAttShiftGroup";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.shiftGroupObj.id,
						name: this.shiftGroupObj.name,
						remark: this.shiftGroupObj.remark
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getShiftGroup();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mybzgl_update").modal("hide");
			},
			//删除班组
			deleteShiftGroup() {
				//$("#mybzgl").modal("hide");
				var url = this.url + "/kqParamSetContr/deleteAttShiftGroup";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.shiftGroupObj.id
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getShiftGroup();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mybzgl_update").modal("hide");
			}
		}
	}
</script>

<style>
</style>
