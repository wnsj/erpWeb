<!-- author:dingdong -->
<template>
  <div class="container user-container" id="recruitplan-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>招聘计划管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <label class="control-label text-left nopad">计划月份：</label>
          <date-picker v-model="beginMonth" type="month" format="YYYY-MM"></date-picker>
          <span class="nopad">~</span>
          <date-picker v-model="endMonth" type="month" format="YYYY-MM"></date-picker>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">部门</span>
          <department :departId="departId" @departChange='departChange'></department>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">职位</span>
          <position :positionId="positionId" @positionChange="positionChange"></position>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">是否完成</span>
          <select class="form-control" v-model="isYes">
            <option v-for="(item,index) in status" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">是否撤销</span>
          <select class="form-control" v-model="isBack">
            <option v-for="(item,index) in status" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-2">
        <button type="button" class="btn btn-warning pull-right m_r_10" @click="exportTableToExcel('recruitPlanTB','招聘计划管理')">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#planAdd">添加</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryRecruitPlan">查询</button>
      </div>
    </div><br>
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
                <th class="text-center">邀约人数</th>
                <th class="text-center">编辑</th>
                <th class="text-center">点击完成</th>
                <th class="text-center">点击撤销</th>
                <!-- <th class="text-center">删除</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in recruitPlanList" :key="index">
                <td>{{item.departmentName}}</td>
                <td>{{item.positionName}}</td>
                <td class="text-center">{{item.planDate}}</td>
                <td class="text-center">{{item.lackNum}}</td>
                <td class="text-center">{{item.planNum}}</td>
                <td class="text-center">{{item.phoneNum}}</td>
                <td><center><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#planEdit" @click="getEditInfo(item)">编辑</button></center></td>
                <td class="text-center">
                  <button type="button"
                    :class="item.isYes==1?'btn btn-sm btn-success':'btn btn-sm btn-info'"
                    :disabled="item.isYes==1?true:false" @click="changeIsYes(item)">
                    {{item.isYes==1?'已完成':'点击完成'}}
                  </button>
                </td>
                <td class="text-center">
                  <button type="button"
                    :class="item.isBack==1?'btn btn-sm btn-inverse':'btn btn-sm btn-info'"
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
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">新增招聘计划</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body" >
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-5">
                  <department :departId="deptAddId" @departChange="getDeptAddId"></department>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <position :positionId="positionAddId" @positionChange="getPositionAddId"></position>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">计划月份：</label>
                <div class="col-md-5 input-group date form_date">
                  <input type="date" class="form-control" id="time" v-model="planAddDate">
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                  </div>
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
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">邀约人数：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="phoneAddNum">
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
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">编辑招聘计划</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body" >
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-5">
                  <department ref="department" @departChange="getDeptEditId"></department>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <position :positionId="positionEditId" @positionChange="getPositionEditId"></position>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">计划月份：</label>
                <div class="col-md-5 input-group date form_date">
                  <input type="date" class="form-control" v-model="planEditDate">
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                  </div>
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
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">邀约人数：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="phoneEditNum">
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
  import position from '../vuecommon/position.vue'
  export default {
    components: {
      DatePicker,
      department,
      position
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
        status:[
          {value:null,label:'全部'},
          {value:'1',label:'是'},
          {value:'0',label:'否'},
        ],

        // 添加
        deptAddId: '0',
        positionAddId: '',
        planAddDate: this.getCurrentDay,
        lackAddNum: 0,
        planAddNum: 0,
        phoneAddNum: 0,
        // 编辑
        deptEditId: '',
        positionEditId: '',
        planEditDate: '',
        lackEditNum: '',
        planEditNum: '',
        phoneEditNum: ''
      }
    },
    methods: {
      msg(){},
      // ---------------------------------------查询----------------------------------
      departChange(val){   // 渠道
        this.departId = val
      },
      positionChange(val){ // 职位
        this.positionId = val
      },
      queryRecruitPlan(){      // 查询招聘发布信息
        if(this.departId == '0'){
          this.departId = null
        }
        if(this.positionId == '0'){
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
            begDate: this.$queryStartMonth(this.beginMonth),
            endDate: this.$queryEndMonth(this.endMonth),
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

      getDeptAddId(departId){
        this.deptAddId = departId
      },
      getPositionAddId(positionId){
        this.positionAddId = positionId
      },
      addRecruitPlan(){     // 添加招聘发布信息
        if (this.positionAddId == '' || this.positionAddId == '0') {
          alert('职位还没有选择');
          return false;
        }
        if (this.planAddDate == '') {
          alert('日期还没有选择');
          return false;
        }
        if (this.lackAddNum == '' || this.planAddNum < 0) {
          alert('缺编人数不能小于0');
          return false;
        }
        if (this.planAddNum == '' || this.planAddNum < 0) {
          alert('计划招聘人数不能小于0');
          return false;
        }
        if (this.phoneAddNum == '' || this.phoneAddNum < 0) {
          alert('邀约人数不能小于0');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/addZpPlan',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            department:this.deptAddId,
            position:this.positionAddId,
            planDate:this.planAddDate,
            lackNum:this.lackAddNum,
            planNum:this.planAddNum,
            phoneNum:this.phoneAddNum
          },
          dataType: 'json',
        }).then(response => {
          this.queryRecruitPlan()
          console.log('添加成功')
        }).catch(error => {
          console.log('请求失败处理')
        });
        this.deptAddId = '0',
        this.positionAddId = '0',
        this.planAddDate = this.getCurrentDay,
        this.lackAddNum = 0,
        this.planAddNum = 0,
        this.phoneAddNum = 0,
        $('#planAdd').modal('hide');
      },

      // ---------------------------------------编辑----------------------------------

      getDeptEditId(departId){
        this.deptEditId = departId
      },
      getPositionEditId(positionId){
        this.positionEditId = positionId
      },
      // 点击编辑获取招聘发布详细信息
      getEditInfo(item){
        this.planId = item.planId
        this.$refs.department.setDpart(item.department);
        this.deptEditId = item.department
        this.positionEditId = item.position
        this.planEditDate = this.getCurrentDayAction(item.planDate)
        this.lackEditNum = item.lackNum
        this.planEditNum = item.planNum
        this.phoneEditNum = item.phoneNum;
      },
      editRecruitPlan(){   // 编辑招聘发布信息
        if (this.positionEditId =='' || this.positionEditId == '0') {
          alert('职位还没有选择');
          return false;
        }
        if (this.planEditDate == '') {
          alert('日期还没有选择');
          return false;
        }
        if (this.lackEditNum == '' || this.planEditNum < 0) {
          alert('缺编人数不能小于0');
          return false;
        }
        if (this.planEditNum == '' || this.planEditNum < 0) {
          alert('计划招聘人数不能小于0');
          return false;
        }
        if (this.phoneEditNum == '' || this.phoneEditNum < 0) {
          alert('邀约人数不能小于0');
          return false;
        }

        console.log("第一个planId:" + this.planId)
        console.log("deptEditId:" + this.deptEditId)
        console.log("positionEditId:" + this.positionEditId)
        console.log("planEditDate:" + this.planEditDate)
        console.log("lackEditNum:" + this.lackEditNum)
        console.log("planEditNum:" + this.planEditNum)
        console.log("phoneEditNum:" + this.phoneEditNum)
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
            planNum: this.planEditNum,
            phoneNum: this.phoneEditNum,
          },
          dataType: 'json',
        }).then((response) => {
          this.queryRecruitPlan()
          console.log("修改成功")
        }).catch((error) => {
          console.log('请求失败处理')
        });
        $('#planEdit').modal('hide');
      },
      changeIsYes(item){
          const msg = "您真的确定要完成吗?";
          if (confirm(msg)==true){
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
            }).then((response) => {
              this.queryRecruitPlan()
              return true;
              console.log("修改状态成功")
            }).catch((error) => {
              return false;
              console.log('请求失败处理')
            });
          }else{
            return false;
          }
       },
       changeIsBack(item){
          const msg = "您真的确定要注销吗?一旦注销无法恢复!";
          if (confirm(msg)==true){
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
            }).then((response) => {
              this.queryRecruitPlan()
              return true;
              console.log("修改状态成功")
            }).catch((error) => {
              return false;
              console.log('请求失败处理')
            });
          }else{
            return false;
          }
       },
    }
  }
</script>

<style>

  @-moz-document url-prefix(){fieldset{display: table-cell;}}
  .user-container{background-color: #fff;width: 100%;padding: 0 20px;}
  .user-btn-group>button{margin: 0 2px;}
  .main-title h2{line-height: 50px;}
  .nopad{padding-left:0;padding-right:0;line-height:34px;}
  .form_date.input-group[class*=col-]{float:left;padding-left:15px;padding-right:15px;}
  .m_r_10{margin-right:10px;}
  input[type="date"]{line-height: 26px!important;}
</style>
