<template>
<!-- 选择人员 -->
<div class="modal fade" id="agentChooseModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="closeModel">
          <span>×</span>
        </button>
        <h4 class="modal-title">选择人员</h4>
      </div><!-- /.modal-header -->
      <div class="modal-body" >
        <form action="">
          <div class="form-group clearfix">
            <label class="col-md-1 control-label text-right nopad">部门：</label>
            <div class="col-md-5">
              <department ref="depart" @departChange='departChange'></department>
            </div>
            <label for="name" class="col-md-1 control-label text-right nopad">姓名：</label>
            <div class="col-md-3">
              <input type="text" class="form-control" id="name" v-model="name"/>
            </div>
            <div class="col-md-1">
              <button type="button" class="btn btn-primary" @click="queryEmpByDept">查询</button>
            </div>
          </div>
          <!-- 查询结果集 -->
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="pre-scrollable">
                <table class="table table-bordered table-hover text-nowrap" id="empList">
                  <thead>
                  <tr>
                    <th class="text-center">姓名</th>
                    <th class="text-center">部门</th>
                    <th class="text-center">职位</th>
                    <th class="text-center">选择</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in empList " :key="index">
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center">{{item.deptName}}</td>
                    <td class="text-center">{{item.positionName}}</td>
                    <td><center> <button type="button" class="btn btn-sm btn-primary" @click="insertAgentList(item)">选择</button></center></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div><!-- /.row 查询页面 -->
        </form>
      </div><!-- /.modal-body -->
      <div class="modal-footer">
      </div> <!-- /.modal-footer -->
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
</template>

<script>
  name:'agentChoose'
  import axios from 'axios'
  import department from '../../../vuecommon/department.vue'
	export default {
    components: {
      department
    },
		data() {
      return{
        name: '',
        deptId: '',
        empList:[]
      }
    },
		methods: {
      getDeptId(val){
        this.deptId = val
      },
      departChange(departId){   // 部门
        this.deptId = departId
      },
      closeModel(){
        $("#agentChooseModel").modal('hide')
      },
      queryEmpByDept(){
        console.log("参数为" + this.deptId)
        this.$refs.depart.setDpart(this.deptId)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryEmpByDeptOrParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            departmentId: this.deptId,
            name: this.name,
          },
          dataType: 'json',
        }).then((response) => {
            console.log(response.data.retData)
            this.empList = response.data.retData
        }).catch((error) => {
          console.log('请求失败处理')
          console.log(response.data.retData)
        });
      },
      insertAgentList(item){
        this.$emit("getAgentInfo",item)
        $("#agentChooseModel").modal('hide')
      }
    }
	}
</script>

<style>

</style>
