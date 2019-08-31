<!-- author:dingdong -->
<template>
  <div class="container user-container" id="recruitplan-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>招聘计划管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-left: 0;">
          <label class="control-label text-left nopad">计划月份：</label>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <date-picker v-model="beginMonth" type="month" format="YYYY-MM"></date-picker>
        </div>
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
          <span class="nopad">~</span>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <date-picker v-model="endMonth" type="month" format="YYYY-MM"></date-picker>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 34px;">
          <p>是否完成：</p>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0;">
          <select class="form-control" v-model="isYes">
            <option v-for="(item,index) in status" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0; line-height: 34px;">
          <p>是否撤销：</p>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding: 0;">
          <select class="form-control" v-model="isBack">
            <option v-for="(item,index) in status" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>

      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
          <p>部门：</p>
        </div>
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="padding: 0; line-height: 34px;">
          <department :departId="departId" @departChange='departChange'></department>
        </div>
      </div>


    </div>
    <div class="row">
      <br/>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
          <p>应聘职位：</p>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding: 0; line-height: 34px;">
          <positionInfo :pid="positionId" @jobChange="positionChange" ref="position"></positionInfo>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 pull-right">
        <button type="button" class="btn btn-warning pull-right m_r_10" @click="exportTableToExcel('recruitPlanTB','招聘计划管理')">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" @click="addBtn" v-if="has(67)">添加</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryRecruitPlan">查询</button>
      </div>
    </div>
    <br/>
    <!-- 查询结果集 -->
    <div class="row ">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="recruitPlanTB">
            <thead>
            <tr>
              <th class="text-center">部门</th>
              <th class="text-center">职位</th>
              <th class="text-center">计划月份</th>
              <th class="text-center">缺编人数</th>
              <th class="text-center">计划招聘人数</th>
              <th class="text-center" v-if="has(67)">编辑</th>
              <th class="text-center" v-if="has(67)">点击完成</th>
              <th class="text-center" v-if="has(67)">点击撤销</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in recruitPlanList" :key="index">
              <td>{{item.departmentName}}</td>
              <td>{{item.positionName}}</td>
              <td class="text-center">{{item.planDate|month}}</td>
              <td class="text-center">{{item.lackNum}}</td>
              <td class="text-center">{{item.planNum}}</td>
              <td class="text-center" v-if="has(67)">
                <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#planEdit"
                        @click="getEditInfo(item)">编辑
                </button>
              </td>
              <td class="text-center" v-if="has(67)">
                <button type="button"
                        :class="item.isYes==1?'btn btn-sm btn-success':'btn btn-sm btn-info'"
                        :disabled="item.isYes==1?true:false" @click="changeIsYes(item)">
                  {{item.isYes==1?'已完成':'点击完成'}}
                </button>
              </td>
              <td class="text-center" v-if="has(67)">
                <button type="button"
                        :class="item.isBack==1?'btn btn-sm btn-inverse':'btn btn-sm btn-danger'"
                        :disabled="item.isBack==1?true:false" @click="changeIsBack(item)">
                  {{item.isBack==1?'已撤销':'点击撤销'}}
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <div class="modal fade" id="planAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">新增招聘计划</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-5">
                  <department :departId="deptAddId" ref="deptAdd" @departChange="getDeptAddId"></department>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <positionInfo :pid="positionAddId" ref="positionAdd" @jobChange="getPositionAddId"></positionInfo>
                </div>
              </div>
              <div class="form-group clearfix">
                <div class="col-md-5 input-group date form_date">
                  <label class="control-label text-left nopad">计划月份：</label>
                  <date-picker v-model="planAddDate" type="month" format="YYYY-MM"></date-picker>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">缺编人数：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="lackAddNum">
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">计划招聘：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="planAddNum">
                </div>
              </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="addRecruitPlan">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 编辑 -->
    <div class="modal fade" id="planEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">编辑招聘计划</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-5">
                  <department ref="deptEdit" @departChange="getDeptEditId"></department>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <positionInfo :pid="positionEditId" ref="positionEdit" @jobChange="getPositionEditId"></positionInfo>
                </div>
              </div>
              <div class="form-group clearfix">
                <div class="col-md-5 input-group date form_date">
                  <label class="control-label text-left nopad">计划月份：</label>
                  <date-picker v-model="planEditDate" type="month" format="YYYY-MM"></date-picker>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">缺编人数：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="lackEditNum">
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">计划招聘：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="planEditNum">
                </div>
              </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="editRecruitPlan">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import department from '../vuecommon/department.vue'
  import positionInfo from '../vuecommon/positionInfo.vue'

  export default {
    components: {
      DatePicker,
      department,
      positionInfo
    },
    data() {
      return {
        // 招聘发布id
        planId: '',
        // 查询
        departId: '0',
        positionId: '',
        beginMonth: this.$currentMonth(),
        endMonth: this.$currentMonth(),
        recruitPlanList: [],
        isYes: null,
        isBack: null,
        status: [
          {value: null, label: '全部'},
          {value: '1', label: '是'},
          {value: '0', label: '否'},
        ],

        // 添加
        deptAddId: '0',
        positionAddId: '',
        planAddDate: this.$currentMonth(),
        lackAddNum: 0,
        planAddNum: 0,
        // 编辑
        deptEditId: '',
        positionEditId: '',
        planEditDate: '',
        lackEditNum: '',
        planEditNum: ''
      }
    },
    methods: {
      msg() {
      },
      // ---------------------------------------查询----------------------------------
      departChange(val) {   // 渠道
        this.departId = val
      },
      positionChange(val) { // 职位
        this.positionId = val
      },
      queryRecruitPlan() {      // 查询招聘发布信息
        if (this.departId == '0') {
          this.departId = null
        }
        if (this.positionId == '0') {
          this.positionId = null
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/queryZpPlan',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            department: this.departId,
            position: this.positionId,
            begDate: this.beginMonth == null? '':this.$queryStartMonth(this.beginMonth),
            endDate: this.endMonth == null? '':this.$queryEndMonth(this.endMonth),
            isYes: this.isYes,
            isBack: this.isBack
          },
          dataType: 'json',
        }).then(response => {
          console.log(this.recruitPlanList)
          this.recruitPlanList = response.data.retData
        }).catch(error => {
          console.log(error)
        });
      },

      // ---------------------------------------添加----------------------------------

      getDeptAddId(departId) {
        this.deptAddId = departId
      },
      getPositionAddId(positionId) {
        this.positionAddId = positionId
      },
      addBtn() {
        this.deptAddId = '0'
        this.$refs.deptAdd.setDpart(0)
        this.$refs.positionAdd.setPositionId('')
        this.$refs.positionAdd.getPositionInfo()
        this.planAddDate = this.$currentMonth()
        this.lackAddNum = 0
        this.planAddNum = 0
        $('#planAdd').modal('show')
      },
      addRecruitPlan() {     // 添加招聘发布信息
        if (this.isBlank(this.positionAddId)) {
          alert('职位还没有选择');
          return false;
        }
        if (this.isBlank(this.planAddDate)) {
          alert('日期还没有选择');
          return false;
        }
        if (this.isBlank(this.lackAddNum) || this.lackAddNum < 0) {
          this.lackAddNum = 0
        }
        if (this.isBlank(this.planAddNum) || this.planAddNum < 0) {
          this.planAddNum = 0
        }
        const msg = confirm("确认添加？")
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/addZpPlan',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              department: this.deptAddId,
              position: this.positionAddId,
              planDate: this.$YYYY_MM_DD_HH_mm_ss(this.planAddDate),
              lackNum: this.lackAddNum,
              planNum: this.planAddNum,
              phoneNum: '0',
            },
            dataType: 'json',
          }).then(response => {
            alert('添加成功')
            $('#planAdd').modal('hide')
            this.queryRecruitPlan()
          }).catch(error => {
            console.log(error)
          });
        }
      },

      // ---------------------------------------编辑----------------------------------

      getDeptEditId(val) {
        console.log("部门" + val)
        this.deptEditId = val
      },
      getPositionEditId(val) {
        console.log("职位" + val)
        this.positionEditId = val
      },
      // 点击编辑获取招聘发布详细信息
      getEditInfo(item) {
        this.planId = item.planId
        this.deptEditId = item.department
        this.positionEditId = item.position
        this.planEditDate = item.planDate
        this.lackEditNum = item.lackNum
        this.planEditNum = item.planNum
        this.$refs.deptEdit.setDpart(item.department);
        this.$refs.positionEdit.setPositionId(item.position)
        this.$refs.positionEdit.getPositionInfo()
      },
      editRecruitPlan() {   // 编辑招聘发布信息
        if (this.isBlank(this.positionEditId)) {
          alert('职位还没有选择');
          return false;
        }
        if (this.isBlank(this.planEditDate)) {
          alert('日期还没有选择');
          return false;
        }
        if (this.isBlank(this.lackEditNum) || this.lackEditNum < 0) {
          this.lackEditNum = 0
        }
        if (this.isBlank(this.planEditNum) || this.planEditNum < 0) {
          this.planEditNum = 0
        }
        const msg = confirm("确认修改？")
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/updateZpPlan',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              planId: this.planId,
              department: this.deptEditId,
              position: this.positionEditId,
              planDate: this.planEditDate,
              lackNum: this.lackEditNum,
              planNum: this.planEditNum
            },
            dataType: 'json',
          }).then(response => {
            alert("修改成功")
            $('#planEdit').modal('hide');
            this.queryRecruitPlan()
          }).catch(error => {
            console.log(error)
          });
        }
      },
      changeIsYes(item) {
        if (item.isBack == 1) {
          alert('已经撤销！')
          return false
        }
        const msg = confirm('确认完成？')
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/updateZpPlan',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              planId: item.planId,
              isYes: '1'
            },
            dataType: 'json',
          }).then(response => {
            alert('已完成')
            this.queryRecruitPlan()
          }).catch(error => {
            console.log(error)
          });
        }
      },
      changeIsBack(item) {
        if (item.isYes == 1) {
          alert('已完成,不可撤销！')
          return false
        }
        const msg = confirm('确认撤销？')
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/updateZpPlan',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              planId: item.planId,
              isBack: '1'
            },
            dataType: 'json',
          }).then(response => {
            alert('撤销成功')
            this.queryRecruitPlan()
          }).catch(error => {
            console.log(error)
          });
        }
      },
    }
  }
</script>

<style>

  @-moz-document url-prefix() {
    fieldset {
      display: table-cell;
    }
  }

  .user-container {
    background-color: #fff;
    width: 100%;
    padding: 0 20px;
  }

  .user-btn-group > button {
    margin: 0 2px;
  }

  .main-title h2 {
    line-height: 50px;
  }

  .nopad {
    padding-left: 0;
    padding-right: 0;
    line-height: 34px;
  }

  .form_date.input-group[class*=col-] {
    float: left;
    padding-left: 15px;
    padding-right: 15px;
  }

  .m_r_10 {
    margin-right: 10px;
  }

  input[type="date"] {
    line-height: 26px !important;
  }

  .mx-datepicker{ width: 100% !important;}

</style>
