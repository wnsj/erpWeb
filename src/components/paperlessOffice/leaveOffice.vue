<template>
  <div class="container user-container" id="report-app" v-cloak>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-title">
        <h2>离职管理</h2>
      </div>
    </div>
    <div class="form-group clearfix col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding: 0;">
          <deptPosition></deptPosition>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <label class="control-label text-left nopad">日期类型：</label>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding-right: 0;">
          <select class="form-control" v-model="leaveOffice.dateType">
            <option v-for="(item,index) in dateType" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0;">
          <date-picker v-model="leaveOffice.beginDate" type="date" class="queryDate"></date-picker>
        </div>
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
          <span class="nopad">~</span>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0;">
          <date-picker v-model="leaveOffice.endDate" type="date" class="queryDate"></date-picker>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1" style="padding: 0;">
          <input type="radio" name="date" @click="lastMonth"/>
          <label class="control-label text-left nopad">上月</label>
          <input type="radio" name="date" @click="currentMonth"/>
          <label class="control-label text-left nopad">本月</label>
          <input type="radio" name="date" @click="nextMonth"/>
          <label class="control-label text-left nopad">次月</label>
          <input type="radio" name="date" @click="currentDate"/>
          <label class="control-label text-left nopad">自定义</label>
        </div>
      </div>
    </div>
    <div class="form-group clearfix col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <label class="control-label text-left nopad">离职类型：</label>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding-right: 0;">
          <select class="form-control" v-model="leaveOffice.leaveType">
            <option v-for="(item,index) in leaveType" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0;">
          <label class="control-label text-left nopad">意见：</label>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding-right: 0;">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0;">
            <select class="form-control" v-model="leaveOffice.opinion">
              <option v-for="(item,index) in opinion" :key="index" :value="item.value">
                {{item.label}}
              </option>
            </select>
          </div>
          <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5
            col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1" style="padding-right: 0;">
            <label class="control-label text-left nopad">申请人姓名：</label>
          </div>
        </div>
      </div>
      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <input type="text" class="form-control" v-model="leaveOffice.name">
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6
          col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2" style="padding-right: 0;">
          <label class="control-label text-left nopad">是否完成：</label>
          <input type="radio" name="isYes">
          <label class="control-label text-left nopad">全部</label>
          <input type="radio" name="isYes">
          <label class="control-label text-left nopad">是</label>
          <input type="radio" name="isYes">
          <label class="control-label text-left nopad">否</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-md-offset-9">
        <button type="button" class="btn btn-warning pull-right m_r_10" @click="exportTableToExcel('leaveOfficeTable','离职管理表')">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10">汇总</button>
        <button type="button" class="btn btn-info pull-right m_r_10" @click="addBtn">申请</button>
        <button type="button" class="btn btn-primary pull-right m_r_10">查询</button>
      </div>
    </div>
    <br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="leaveOfficeTable">
            <thead>
            <tr>
              <th class="text-center">单号</th>
              <th class="text-center">姓名</th>
              <th class="text-center">部门</th>
              <th class="text-center">职位</th>
              <th class="text-center">入职时间</th>
              <th class="text-center">申请日期</th>
              <th class="text-center">离职日期</th>
              <th class="text-center">离职原因</th>
              <th class="text-center">离职类型</th>
              <th class="text-center">查看人</th>
              <th class="text-center">主管意见</th>
              <th class="text-center">部长</th>
              <th class="text-center">部长意见</th>
              <th class="text-center">交接人</th>
              <th class="text-center">交接人意见</th>
              <th class="text-center">人资办</th>
              <th class="text-center">人资办意见</th>
              <th class="text-center">人事负责人</th>
              <th class="text-center">人事意见</th>
              <th class="text-center">审批人</th>
              <th class="text-center">审批意见</th>
              <th class="text-center">点击完成</th>
              <th class="text-center">点击查看</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in leaveOfficeList" :key="index">
              <td class="text-center">{{item.id}}</td>
              <td class="text-center">{{item.daName}}</td>
              <td class="text-center">{{item.daDepartmentName}}</td>
              <td class="text-center">{{item.daPositionName}}</td>
              <td class="text-center">{{item.daEntryTime|dateFormat}}</td>
              <td class="text-center">{{item.daApplyTime|dateFormat}}</td>
              <td class="text-center">{{item.daLeaveTime|dateFormat}}</td>
              <td class="text-center">{{item.daResaon}}</td>
              <td class="text-center">{{
                item.daType == 1? '辞职':item.daType == 2? '辞退':item.daType == 3? '其他':''}}
              </td>
              <td class="text-center">{{item.daChargeAdvice}}</td>
              <td class="text-center">{{item.daMinisterName}}</td>
              <td class="text-center">{{item.daMinisterAdvice}}</td>
              <td class="text-center">{{item.daConnectName}}</td>
              <td class="text-center">{{item.daConnectAdvice}}</td>
              <td class="text-center">{{item.daPersonnelOfficeName}}</td>
              <td class="text-center">{{item.daPersonnelOfficeAdvice}}</td>
              <td class="text-center">{{item.daAuditorName}}</td>
              <td class="text-center">{{item.daAuditorAdvice}}</td>
              <td class="text-center">{{item.daApproverName}}</td>
              <td class="text-center">{{item.daApproverAdvice}}</td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-primary">点击完成</button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-info">点击查看</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div></div>
    </div><!-- /.row 查询页面-->
    <!-- 离职申请 -->
    <div class="modal fade" id="leaveOfficeAddModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj"
         aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">离职申请</h4>
            <div class="modal-body">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
                <div class="col-md-2">
                  <span class="nopad">{{leaveOffice.name}}</span>
                </div>
                <label class="col-md-1 control-label text-right nopad">部门：</label>
                <div class="col-md-2">
                  <span class="nopad">{{leaveOffice.deptName}}</span>
                </div>
                <label class="col-md-1 control-label text-right nopad">职位：</label>
                <div class="col-md-2">
                  <span class="nopad">{{leaveOffice.positionName}}</span>
                </div>
              </div>
              <legend><h5>时间及原由</h5></legend>
              <div class="row">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                  <div class="form-group clearfix">
                    <label class="col-md-2 control-label text-right nopad">入职时间：</label>
                    <div class="col-md-2">
                      <date-picker v-model="leaveOffice.daEntryTime" type="date" disabled="disabled"></date-picker>
                    </div>
                  </div>
                  <div class="form-group clearfix">
                    <label class="col-md-2 control-label text-right nopad">申请时间：</label>
                    <div class="col-md-2">
                      <date-picker v-model="leaveOffice.daApplyTime" type="date" disabled="disabled"></date-picker>
                    </div>
                  </div>
                  <div class="form-group clearfix">
                    <label class="col-md-2 control-label text-right nopad">离职时间：</label>
                    <div class="col-md-2">
                      <date-picker v-model="leaveOffice.daLeaveTime" type="date" disabled="disabled"></date-picker>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <textarea class="textarea" placeholder="简要说明,200个字符以内" v-model="leaveOffice.reason"></textarea>
                </div>
              </div>
              <legend><h5>部门内部交接</h5></legend>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group clearfix">
                    <label class="col-md-2 control-label text-right nopad">查看人：</label>
                    <div class="col-md-4">
                      <select class="form-control"><option>测试专员</option></select>
                    </div>
                  </div>
                  <div class="form-group clearfix">
                    <label class="col-md-2 control-label text-right nopad">审查人：</label>
                    <div class="col-md-4">
                      <select class="form-control"><option>测试专员</option></select>
                    </div>
                  </div>
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                </div>
              </div>
            </div>
          </div><!-- /.modal-header -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import moment from 'moment'
  import Cookies from 'js-cookie'
  import deptPosition from '../vuecommon/departLinkPosition.vue'

  export default {
    components: {
      deptPosition,
      DatePicker,
    },
    name: "leaveOffice",
    data() {
      return {
        leaveOffice: {
          beginDate: this.$currentDate(),
          endDate: this.$currentDate(),
          dateType: '',
          leaveType: '',
          opinion: ''
        },
        dateType: [
          {value: '', label: '全部'}, // 默认为空 动态SQL不执行这个条件
          {value: '1', label: '入职日期'},
          {value: '2', label: '申请日期'},
          {value: '3', label: '离职日期'}
        ],
        leaveType: [
          {value: '', label: '全部'},
          {value: '1', label: '辞职'},
          {value: '2', label: '辞退'},
          {value: '3', label: '其他'}
        ],
        opinion: [
          {value: '', label: '全部'},
          {value: '1', label: '同意'},
          {value: '2', label: '不同意'},
          {value: '3', label: '未审核'}
        ],
        leaveOfficeList: {}
      }
    },
    methods: {
      //-----------------------------------查询----------------------------------
      lastMonth() {
        this.leaveOffice.beginDate = this.$queryStartLastMonth()
        this.leaveOffice.endDate = this.$queryEndLastMonth()
        // 调用查询方法
      },
      currentMonth() {
        this.leaveOffice.beginDate = this.$queryStartMonth()
        this.leaveOffice.endDate = this.$queryEndMonth()
        // 调用查询方法
      },
      nextMonth() {
        this.leaveOffice.beginDate = this.$queryStartNextMonth()
        this.leaveOffice.endDate = this.$queryEndNextMonth()
        // 调用查询方法
      },
      currentDate() {
        this.leaveOffice.beginDate = this.$currentDate()
        this.leaveOffice.endDate = this.$currentDate()
        // 调用查询方法
      },
      //-----------------------------------添加----------------------------------
      addBtn() {
        $('#leaveOfficeAddModel').modal('show')
      }
    },
  }
</script>

<style scoped>
  @-moz-document url-prefix() {
    fieldset {
      display: table-cell;
    }
  }

  .form-control {
    width: 100% !important;
  }

  .nopad {
    padding-left: 0;
    padding-right: 0;
    line-height: 34px;
  }

  .user-container {
    background-color: #fff;
    width: 100%;
    padding: 0 20px;
  }

  .main-title h2 {
    line-height: 50px;
  }

  .m_r_10 {
    margin-right: 10px;
  }

  .textarea {
    resize: none;
    width: 79%;
    height: 80px;
  }

  input[type="date"] {
    line-height: 30px !important;
  }

  .queryDate {
    position: relative;
    display: inline-block;
    width: 100% !important;
  }

  .table > tbody > tr > td {
    vertical-align: middle;
  }

  .table > tbody > tr > td {
    vertical-align: middle;
  }
</style>
