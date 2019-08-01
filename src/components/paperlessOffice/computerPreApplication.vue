<template>
  <div class="container user-container" id="clock-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>电脑预申请</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-addon">请假人部门：</span>
          <department @departChange='deptChangeForQuery'></department>
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-addon">预计使用人：</span>
          <input type="text" class="form-control" placeholder="UserName" v-model="computer.userName">
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-addon">交接人：</span>
          <input type="text" class="form-control" placeholder="HandName" v-model="computer.handName">
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-addon">时间类型：</span>
          <select class="form-control" v-model="computer.timeType">
            <option :value="timeType.value" v-for="timeType in computer.timeTypes">
              {{timeType.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-5">
        <date-picker v-model="computer.beginDate" type="date" format="YYYY-MM-DD" confirm></date-picker>
        <span class="select-box-title">~</span>
        <date-picker v-model="computer.endDate" type="date" format="YYYY-MM-DD" confirm></date-picker>
      </div>
      <div class="col-md-3 col-md-offset-1">
        <button type="button" class="btn btn-warning pull-right m_r_10">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" @click="preAppBtn">预申请</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryPreApp">查询</button>
      </div>
    </div>
    <br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="preAppTable">
            <thead>
            <tr>
              <th class="text-center">单号</th>
              <th class="text-center">部门</th>
              <th class="text-center">提交时间</th>
              <th class="text-center">使用时间</th>
              <th class="text-center">完成时间</th>
              <th class="text-center">岗位</th>
              <th class="text-center">名称</th>
              <th class="text-center">申请人</th>
              <th class="text-center">预计使用人</th>
              <th class="text-center">主管</th>
              <th class="text-center">主管意见</th>
              <th class="text-center">负责人</th>
              <th class="text-center">负责人意见</th>
              <th class="text-center">对接人</th>
              <th class="text-center">申请状态</th>
              <th class="text-center">查看详情</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in preAppList" :key="index">
              <td class="text-center">{{item.id}}</td>
              <td class="text-center">{{item.deptName}}</td>
              <td class="text-center">{{item.submitTime|dateFormat}}</td>
              <td class="text-center">{{item.useTime|dateFormat}}</td>
              <td class="text-center">{{item.finishTime|dateFormat}}</td>
              <td class="text-center">{{item.positionName}}</td>
              <td class="text-center">{{item.typeName}}</td>
              <td class="text-center">{{item.applyName}}</td>
              <td class="text-center">{{item.userName}}</td>
              <td class="text-center">{{item.leaderName}}</td>
              <td class="text-center">
                {{
                item.leaderAudit == 0? '未审核':
                item.leaderAudit == 1? '同意':
                item.leaderAudit == 2? '不同意':''
                }}
              </td>
              <td class="text-center">{{item.principalName}}</td>
              <td class="text-center">
                {{
                item.principalAudit == 0? '未审核':
                item.principalAudit == 1? '同意':
                item.principalAudit == 2? '不同意':''
                }}
              </td>
              <td class="text-center">{{item.handName}}</td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-default"
                        :disabled="item.status == null? false:'disabled'"
                >
                  {{item.status == 1? '进行中':item.status == 2? '已完成':'点击完成'}}
                </button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-default">查看详情</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面-->
    <!-- 新增电脑预申请 -->
    <div class="modal fade" id="preAppAddModel" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">电脑预申请</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <legend><h5>电脑用品需求单</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">部门：</label>
              <div class="col-md-3">
                <department ref="dept" @departChange='deptChangeForAdd'></department>
              </div>
              <label class="col-md-2 control-label text-right nopad">用品类型：</label>
              <div class="col-md-3">
                <select class="form-control"><option>领用电脑</option></select>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">岗位：</label>
              <div class="col-md-3">
                <job :pid="computerForAdd.pid" ref="job" @jobChange="jobChange"></job>
              </div>
              <label class="col-md-2 control-label text-right nopad">用品：</label>
              <div class="col-md-3">
                <textarea class="textarea" placeholder="电脑" disabled="disabled"></textarea>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">预备使用人：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" placeholder="UserName" v-model="computerForAdd.userName">
              </div>
              <label class="col-md-2 control-label text-right nopad">使用时间：</label>
              <div class="col-md-3">
                <date-picker v-model="computerForAdd.useTime" type="datetime" format="YYYY-MM-DD HH:mm" confirm></date-picker>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="text-center">
              <button type="button" class="btn btn-sm btn-warning" @click="addPreApp">确认提交</button>
            </div>
          </div> <!-- /.modal-footer -->
          <div class="modal-body">
            <legend><h5>审核人</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">负责人：</label>
              <div class="col-md-3">
                <select class="form-control"><option>李庆功</option></select>
              </div>
              <label class="col-md-2 control-label text-right nopad">同意：</label>
              <div class="col-md-3 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-dark" disabled="disabled">同意</button>
                <button type="button" class="btn btn-sm btn-dark" disabled="disabled">不同意</button>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">负责人：</label>
              <div class="col-md-3">
                <textarea class="textarea" placeholder="负责人说明" disabled="disabled"></textarea>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">对接人：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" disabled="disabled">
              </div>
              <div class="col-md-2 col-md-offset-3" >
                <button type="button" class="btn btn-sm btn-block" disabled="disabled">完成</button>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">实际使用人：</label>
              <div class="col-md-3">
                <select class="form-control"><option></option></select>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">主管：</label>
              <div class="col-md-3">
                <leader :lid="computerForAdd.lid" ref="leader" @leaderChange="leaderChange"></leader>
              </div>
              <div class="col-md-1">
                <button type="button" data-toggle="modal" @click="queryLeaderBtn">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
              </div>
              <div class="col-md-2 col-md-offset-2">
                <button type="button" class="btn btn-sm btn-block" disabled="disabled">确定</button>
              </div>
            </div>
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div><!-- /.container -->
</template>

<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import DatePicker from 'vue2-datepicker'
  import department from '../vuecommon/department.vue'
  import job from '../vuecommon/positionInfo.vue'
  import leader from '../vuecommon/leaderInfo.vue'

  export default {
    name: "preApplication",
    components: {
      DatePicker,
      department,
      job,
      leader
    },
    data() {
      return {
        computer: {
          deptId: '',
          userName: '',
          handName: '',
          timeType: '',
          timeTypes: [
            {value: 0, label: "提交时间"},
            {value: 1, label: "使用时间"},
            {value: 2, label: "完成时间"}
          ],
          beginDate: this.$currentDate(),
          endDate: this.$currentDate(),
        },
        computerForAdd:{
          deptId: '',
          pid: '',
          userName: '',
          useTime: this.$currentHHmm(),
          lid: '',
        },
        preAppList: {},
      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      deptChangeForQuery(val) {
        this.computer.deptId = val
      },
      queryPreApp() {
        axios({
          method: 'post',
          url: this.url + '/computerController/queryPreApplication',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            accountId: this.has(71) ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID,
            accountName: this.has(71) ? '' : JSON.parse(Cookies.get("accountData")).account.account_Name,
            timeType: this.computer.timeType,
            beginTime: this.$queryStartTime(this.computer.beginDate),
            endTime: this.$queryEndTime(this.computer.endDate),
            deptId: this.computer.deptId,
            userName: this.computer.userName,
            handName: this.computer.handName
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData);
          this.preAppList = response.data.retData
        }).catch(err => {
          console.log(err)
        });
      },
      // ---------------------------------------添加----------------------------------
      deptChangeForAdd(val){
        this.computerForAdd.deptId = val
      },
      jobChange(val){
        this.computerForAdd.pid = val
        console.log("职位ID" + this.computerForAdd.pid)
      },
      leaderChange(val) {
        this.computerForAdd.lid = val
        console.log("主管ID" + this.computerForAdd.lid)
      },
      preAppBtn(){
        this.$refs.job.getPositionInfo();
        $('#preAppAddModel').modal('show')
      },
      queryLeaderBtn(){
        if (this.computerForAdd.deptId == 0){
          alert("请选择部门!")
        }else{
          this.$refs.leader.setDeptId(this.computerForAdd.deptId);
        }
      },
      addPreApp(){
        axios({
          method: 'post',
          url: this.url + '/computerController/addPreApplication',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.computerForAdd.deptId,
            submitTime: this.$currentTime(),
            applyName: JSON.parse(Cookies.get("accountData")).account.account_Name,
            applyId: JSON.parse(Cookies.get("accountData")).account.account_ID,
            userName: this.computerForAdd.userName,
            typeName: "领用电脑:电脑",
            positionId: this.computerForAdd.pid,
            principalId: 666,
            useTime: this.$YYYY_MM_DD_HH_mm(this.computerForAdd.useTime)
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData);
          $('#preAppAddModel').modal('hide');
          this.queryPreApp();
        }).catch(err => {
          console.log(err)
        });
      },
    },
    created() {
      this.computer.timeType = this.computer.timeTypes[0].value // SELECT默认选中
    }
  }
</script>

<style scoped>
  .m_r_10 {
    margin-right: 10px;
  }
  .nopad {
    padding-left: 0;
    padding-right: 0;
    line-height: 34px;
  }
  .textarea{
    resize:none;
    width: 100%;
    height: 60px;
  }
</style>
