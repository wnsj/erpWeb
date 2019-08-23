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
          <input type="text" class="form-control" v-model="computer.userName">
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-addon">交接人：</span>
          <input type="text" class="form-control">
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
        <date-picker v-model="computer.beginDate" type="date" format="YYYY-MM-DD"></date-picker>
        <span class="select-box-title">~</span>
        <date-picker v-model="computer.endDate" type="date" format="YYYY-MM-DD"></date-picker>
      </div>
      <div class="col-md-3 col-md-offset-1">
        <button type="button" class="btn btn-warning pull-right m_r_10">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" @click="preAppBtn" v-if='has(72)'>预申请</button>
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
              <th class="text-center" v-if="has('71')">配接单</th>
              <th class="text-center" v-if="has('71')">是否进行</th>
              <th class="text-center" v-if="has('71')">点击接单</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in preAppList" :key="index" @dblclick="showInfoBtn(item)">
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
              <td class="text-center">{{item.handName == null? '未交接':item.handName}}</td>
              <td class="text-center" id="showing" v-if="has('71')">
                {{(item.handId == null||item.handId == 0)? '未指配':item.peiJieName}}
              </td>
              <td class="text-center" v-if="has('71')">
                <button type="button" class="btn btn-sm btn-default" @click="continueBtn(item)"
                        :disabled="item.status == null? false:'disabled'">
                  <b>{{item.status == 1? '进行中':item.status == 2? '已完成':'点击进行'}}</b>
                </button>
              </td>
              <td class="text-center" v-if="has('71')">
                <button type="button" class="btn btn-sm btn-default">点击接单</button>
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
                <select class="form-control">
                  <option>领用电脑</option>
                </select>
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
                <input type="text" class="form-control" v-model="computerForAdd.userName">
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
                <select class="form-control">
                  <option>李庆功</option>
                </select>
              </div>
              <label class="col-md-2 control-label text-right nopad">意见：</label>
              <div class="col-md-3 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>
                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>
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
              <label class="col-md-2 control-label text-right nopad">对接：</label>
              <div class="col-md-2 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning btn-block" disabled="disabled">完成</button>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">实际使用人：</label>
              <div class="col-md-3">
                <select class="form-control" disabled="disabled">
                  <option></option>
                </select>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">主管：</label>
              <div class="col-md-3">
                <select class="form-control" disabled="disabled">
                  <option></option>
                </select>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true" disabled="disabled">
                </button>
              </div>
              <div class="col-md-2 col-md-offset-2">
                <button type="button" class="btn btn-sm btn-warning btn-block" disabled="disabled">确定</button>
              </div>
            </div>
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 修改审批电脑预申请 -->
    <div class="modal fade" id="preAppUpdateModel" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <div class="row">
              <div class="col-md-2">
                <h4 class="modal-title">电脑预申请</h4>
              </div>
              <div class="col-md-5 col-md-offset-2">
                <b><label class="col-md-4 control-label text-right nopad idNum">单号：</label>
                  <span class="idNum nopad">{{computerForUpdate.id}}</span></b>
              </div>
            </div>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <legend><h5>电脑用品需求单</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">部门：</label>
              <div class="col-md-3">
                <department ref="deptUpdate" :disabled="computerForUpdate.isAbleForDept" @departChange='deptChangeForUpdate'></department>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">岗位：</label>
              <div class="col-md-3">
                <job :pid="computerForUpdate.pid" :disabled="computerForUpdate.isAbleForJob" ref="jobUpdate"
                     @jobChange="jobChangeForUpdate"></job>
              </div>
              <label class="col-md-2 control-label text-right nopad">用品：</label>
              <div class="col-md-3">
                <textarea class="textarea" placeholder="领用电脑:电脑" disabled="disabled"></textarea>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">预备使用人：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" :disabled="computerForUpdate.isAble"
                       v-model="computerForUpdate.userName">
              </div>
              <label class="col-md-2 control-label text-right nopad">使用时间：</label>
              <div class="col-md-3">
                <date-picker v-model="computerForUpdate.useTime" type="datetime" format="YYYY-MM-DD HH:mm"
                             confirm :disabled="computerForUpdate.isAble">
                </date-picker>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="text-center">
              <button type="button" class="btn btn-sm btn-warning" :disabled="computerForUpdate.isAble" @click="modifyPreApp">修改
              </button>
            </div>
          </div> <!-- /.modal-footer -->
          <div class="modal-body">
            <legend><h5>审核人</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">负责人：</label>
              <div class="col-md-3">
                <select class="form-control">
                  <option>李庆功</option>
                </select>
              </div>
              <label class="col-md-2 control-label text-right nopad">意见：</label>
              <div class="col-md-1">
                <span class="nopad"><b>
                  {{computerForUpdate.principalAudit == 0? '未审批':
                    computerForUpdate.principalAudit == 1? '同意':
                    computerForUpdate.principalAudit == 2? '不同意': ''}}
                  </b></span>
              </div>
              <div class="col-md-3">
                <button type="button" class="btn btn-sm btn-warning"
                        :disabled="computerForUpdate.isAbleForCheck" @click="agreePreApp"><b>同意</b>
                </button>
                <button type="button" class="btn btn-sm btn-warning"
                        :disabled="computerForUpdate.isAbleForCheck" @click="disagreePreApp"><b>不同意</b>
                </button>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <textarea class="textarea" v-model="computerForUpdate.remark" placeholder="负责人说明"
                          :disabled="computerForUpdate.isAbleForCheck">
                </textarea>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">对接人：</label>
              <div class="col-md-3">
                <hand :hid="computerForUpdate.hid" ref="hand" @handChange="handChange"
                      :disabled="computerForUpdate.isAbleForCheck"></hand>
              </div>
              <label class="col-md-2 control-label text-right nopad">对接：</label>
              <div class="col-md-2 col-md-offset-1">
                <button type="button" :disabled="!hasDept('23')" class="btn btn-sm btn-warning btn-block"
                        @click="finishDocking">
                  <b>完成</b>
                </button>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">实际使用人：</label>
              <div class="col-md-3">
                <select class="form-control" disabled="disabled">
                  <option></option>
                </select>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">主管：</label>
              <div class="col-md-3">
                <select class="form-control" disabled="disabled">
                  <option></option>
                </select>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true" disabled="disabled">
                </button>
              </div>
              <div class="col-md-2 col-md-offset-2">
                <button type="button" class="btn btn-sm btn-warning btn-block" disabled="disabled">确定</button>
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
  import hand from '../vuecommon/handInfo.vue'

  export default {
    name: "preApplication",
    components: {
      DatePicker,
      department,
      job,
      leader,
      hand
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
        computerForAdd: {
          deptId: '',
          pid: '',
          userName: '',
          useTime: this.$currentHHmm(),
          lid: ''
        },
        computerForUpdate: {
          id: '',
          applyId: '',
          deptId: '',
          pid: '',
          hid: '',
          userName: '',
          handId: '',
          handName: '',
          useTime: '',
          remark: '',
          lid: '',
          isAble: 'disabled',
          isAbleForDept: 'disabled',
          isAbleForJob: 'disabled',
          isAbleForCheck: 'disabled',
          principalAudit: '',
          finishTime: '',
        },
        computerForSelect: {
          hid: '',
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
        if (!this.isBlank(this.$route.params.userName)) {
          console.log(this.$route.params.userName)
          this.computer.userName = this.$route.params.userName
        }
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
      deptChangeForAdd(val) {
        this.computerForAdd.deptId = val
      },
      jobChange(val) {
        this.computerForAdd.pid = val
      },
      preAppBtn() {
        this.clearAddModel()
        this.$refs.job.setPositionId('')
        this.$refs.job.getPositionInfo()
        $('#preAppAddModel').modal('show')
      },
      clearAddModel() {
        this.$refs.dept.setDpart(0) // 组件显示默认值
        this.computerForAdd.deptId = 0 // data里默认值
        this.computerForAdd.userName = ''
        this.computerForAdd.useTime = this.$currentHHmm()
      },
      addPreApp() {
        if (this.isBlank(this.computerForAdd.pid)) {
          alert("岗位不能为空！")
          return false;
        }
        if (this.$YYYY_MM_DD_HH_mm_ss(this.computerForAdd.useTime) < this.$currentTime()) {
          alert("使用时间不得小于当前时间！")
          return false;
        }
        const msg = confirm('是否提交需求单？')
        if (msg) {
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
              positionId: this.computerForAdd.pid,
              useTime: this.$YYYY_MM_DD_HH_mm(this.computerForAdd.useTime)
            },
            dataType: 'json',
          }).then(response => {
            alert("您已提交成功,请耐心等待审核")
            $('#preAppAddModel').modal('hide');
            this.queryPreApp();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // ---------------------------------------修改审批----------------------------------
      deptChangeForUpdate(val) {
        this.computerForUpdate.deptId = val
      },
      jobChangeForUpdate(val) {
        this.computerForUpdate.pid = val
      },
      handChange(val) {
        this.computerForUpdate.hid = val[0]
        this.computerForUpdate.handName = val[1]
      },
      showInfoBtn(item) {
        this.computerForUpdate.isAble = 'disabled'
        const loginAccount = JSON.parse(Cookies.get("accountData")).account.account_ID
        if (loginAccount == item.applyId) {
          this.computerForUpdate.isAble = false
          this.computerForUpdate.isAbleForDept = false
          this.computerForUpdate.isAbleForJob = false
          if (item.principalAudit == 1) {
            this.computerForUpdate.isAbleForDept = 'disabled'
            this.computerForUpdate.isAbleForJob = 'disabled'
          }
        }
        if (loginAccount == 666) {
          this.computerForUpdate.isAbleForCheck = false
        }
        this.computerForUpdate.id = item.id
        console.log(this.computerForUpdate.id)
        this.computerForUpdate.applyId = item.applyId
        this.computerForUpdate.deptId = item.deptId
        this.computerForUpdate.pid = item.positionId
        this.computerForUpdate.userName = item.userName
        this.computerForUpdate.useTime = item.useTime
        this.computerForUpdate.remark = item.remark
        this.computerForUpdate.hid = item.handId
        this.computerForUpdate.handName = item.handName
        this.computerForUpdate.lid = item.leaderId
        this.computerForUpdate.principalAudit = item.principalAudit
        this.computerForUpdate.finishTime = item.finishTime
        this.$refs.deptUpdate.setDpart(item.deptId)
        this.$refs.jobUpdate.getPositionInfo()
        this.$refs.jobUpdate.setPositionId(item.positionId)
        this.$refs.hand.setHandId(item.handId)
        $('#preAppUpdateModel').modal('show')
      },
      modifyPreApp() {
        if (this.$YYYY_MM_DD_HH_mm_ss(this.computerForUpdate.useTime) < this.$currentTime()) {
          alert("使用时间不得小于当前时间！")
          return false;
        }
        const msg = confirm('是否提交需求单？');
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/computerController/updatePreApplication',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.computerForUpdate.id,
              deptId: this.computerForUpdate.deptId,
              positionId: this.computerForUpdate.pid,
              userName: this.computerForUpdate.userName,
              useTime: this.$YYYY_MM_DD_HH_mm(this.computerForUpdate.useTime),
              submitTime: this.$currentTime()
            },
            dataType: 'json',
          }).then(response => {
            alert('您已修改成功,请耐心等待审核')
            $('#preAppUpdateModel').modal('hide');
            this.queryPreApp();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // ---------------------------------------负责人审批----------------------------------
      agreePreApp() {
        const msg = confirm('是否确认？')
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/computerController/checkPreApp',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.computerForUpdate.id,
              handId: this.computerForUpdate.hid == null ? '0' : this.computerForUpdate.hid,
              remark: this.computerForUpdate.remark,
              principalAudit: '1',
              principalIsSee: '1'
            },
            dataType: 'json',
          }).then(response => {
            alert('审核完成')
            $('#preAppUpdateModel').modal('hide');
            this.queryPreApp();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      disagreePreApp() {
        const msg = confirm('是否确认？')
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/computerController/checkPreApp',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.computerForUpdate.id,
              remark: this.computerForUpdate.remark,
              principalAudit: '2',
              principalIsSee: '1'
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#preAppUpdateModel').modal('hide');
            this.queryPreApp();
          }).catch(error => {
            console.log(error)
          });
        }
      },
      // ---------------------------------------对接----------------------------------
      continueBtn(item) {
        if (this.isBlank(item.finishTime)) {
          alert('请点击查看详情,点击完成按钮后再操作此处')
          return false;
        } else {
          const msg = confirm("是否进行？")
          axios({
            method: 'post',
            url: this.url + '/computerController/checkPreApp',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: item.id,
              status: '1',
              handIsSee: '1'
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#preAppUpdateModel').modal('hide');
            this.queryPreApp();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      finishDocking() {
        if (this.computerForUpdate.principalAudit != 1) {
          alert('负责人未同意前或审批未通过,不可进行完成操作!')
          return false;
        } else {
          if (!this.isBlank(this.computerForUpdate.finishTime)) {
            alert('已完成')
            return false;
          }
          axios({
            method: 'post',
            url: this.url + '/computerController/checkPreApp',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.computerForUpdate.id,
              finishTime: this.$currentHHmm(),
              handIsSee: '1'
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#preAppUpdateModel').modal('hide');
            this.queryPreApp();
          }).catch(err => {
            console.log(err)
          });
        }
      }
    },
    created() {
      this.computer.timeType = this.computer.timeTypes[0].value // SELECT默认选中
      this.queryPreApp();
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

  .textarea {
    resize: none;
    width: 100%;
    height: 60px;
  }

  .idNum {
    color: #B34D61;
    font-size: 15px;
  }
</style>
