<template>
  <!--双击修改假期类型-->
  <div class="modal fade" id="updatemymodal">
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
              <input type="text" class="form-control" v-model="holidaysName" style="margin-top:20px;" />
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-danger" @click="deleteHolidaysType">删除</button>
          <button type="submit" class="btn btn-primary btn_click" @click="changeHolidaysType">确认</button>
        </div>
        <!-- <p>holidaysId:{{holidaysId}}</p>
				<p>holidaysName:{{holidaysName}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: ['holidaysId', 'holidaysName', 'holidaysType'],
    data() {
      return {
        //假期种类
        newHolidaysName: "",
        newHolidaysId: ""
      }
    },
    methods: {
      //修改假期类型
      changeHolidaysType() {
        var url = this.url + "/kqParamSetContr/updateVacation";
        //alert(vm.holidaysId+'-'+vm.holidaysName)
        if (this.isBlank(this.holidaysName)) {
          alert("假期类型名不能为空!");
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
            id: this.holidaysId,
            name: this.holidaysName
          },
          dataType: "json"
        }).then((response) => {
          if (response.data.retCode == '0000') {
            //this.$parent.queryVacation();
            this.$emit('increment', this.holidaysId, this.holidaysName);
          } else {
            alert(response.data.retMsg)
          }
        }).catch(
          function(error) {
            console.log("请求失败处理");
          }
        );
        $("#updatemymodal").modal("hide");
      },
      //删除假期类型
      deleteHolidaysType() {
        var url = this.url + "/kqParamSetContr/deleteVacation";
        axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": this.contentType,
            "Access-Token": this.accessToken
          },
          data: {
            id: this.holidaysId
          },
          dataType: "json"
        }).then((response) => {
          if (response.data.retCode == '0000') {
            //this.$parent.queryVacation();
            this.$emit('deleteArr', this.holidaysId);
            $("#updatemymodal").modal("hide");
          } else {
            alert(response.data.retMsg)
          }
        }).catch(
          function(error) {
            console.log("请求失败处理");
          }
        );
      }
    }
  }
</script>

<style>
</style>
