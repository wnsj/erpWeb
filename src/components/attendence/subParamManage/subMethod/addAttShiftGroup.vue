<template>
	<!-- 新增班组 -->
	<div class="modal fade" id="mybzgl" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
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
                <label for="name" class="col-md-3 control-label text-right nopad">班组名称：</label>
                <div class="col-md-5">
                  <input type="text" class="form-control" id="name" placeholder="班组名称" v-model="newshiftGroupName">
                </div>
              </div>
			 <div class="form-group clearfix">
				<label for="remark" class="col-md-3 control-label text-right nopad">备注：</label>
				<div class="col-md-5">
					<textarea class="textarea" id="remark" placeholder="备注" v-model="newshiftGroupRemark"></textarea>
				</div>
			</div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-8 col-md-offset-3">
              <button type="button" class="btn btn-warning" @click="addShiftGroup">确认</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '../../../../assets/js/constant.js'

	export default {
		data() {
			return {
				newshiftGroupName: '',
				newshiftGroupRemark:''
			}
		},
		methods: {
			//添加班组类型
			addShiftGroup() {
				// vm.newshiftGroupId = vm.shiftGroup.length + 1;
				// var newshiftGroup = new Object();
				// newshiftGroup.id = vm.newshiftGroupId;
				// newshiftGroup.name = vm.newshiftGroupName;
				// newshiftGroup.remark = vm.newshiftGroupRemark;
				var url = this.url + "/kqParamSetContr/addAttShiftGroup";
				if (isBlank(this.newshiftGroupName)) {
					alert("班组名不能为空");
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
						name: this.newshiftGroupName,
						remark: this.newshiftGroupRemark
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
				this.newshiftGroupName = '',
				this.newshiftGroupRemark = ''
				$("#mybzgl").modal("hide");
			}
		}
	}
</script>

<style>
.textarea{
	resize:none;
	width: 100%;
	height: 70px;
}
</style>
