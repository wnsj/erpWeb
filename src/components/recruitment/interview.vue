<!-- author:dingdong -->
<template>
  <div class="container user-container" id="interview-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>面试信息管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">应聘部门</span>
          <department :departId="departId" @departChange='departChange'></department>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">应聘职位</span>
          <positionInfo :pid="positionId" @jobChange="positionChange" ref="position"></positionInfo>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">应聘渠道</span>
          <channel :channel="channelId" @channelChange="channelChange"></channel>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">是否合格</span>
          <select class="form-control" v-model="isQualified">
            <option v-for="(item,index) in qualifiedStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">日期类型</span>
          <select class="form-control" v-model="dateFlag">
            <option v-for="(item,index) in dateFlagList" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <label class="control-label text-left nopad">查询时间：</label>
        <date-picker v-model="begDate" type="date" format="YYYY-MM-DD"></date-picker>
        <span class="nopad">~</span>
        <date-picker v-model="endDate" type="date" format="YYYY-MM-DD"></date-picker>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">入职状态</span>
          <select class="form-control" v-model="isEntry">
            <option v-for="(item,index) in entryStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">姓名</span>
          <input type="text" class="form-control" v-model="name">
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">联系方式</span>
          <input type="text" class="form-control" placeholder="电话\邮箱\QQ" v-model="phone">
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">性别</span>
          <select class="form-control" v-model="sex">
            <option v-for="(item,index) in sexStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">是否报销路费</span>
          <select class="form-control" v-model="isPay">
            <option v-for="(item,index) in status" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">学历</span>
          <select class="form-control" v-model="education">
            <option v-for="(item,index) in educationState" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">专业</span>
          <input type="text" class="form-control" v-model="profession">
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">是否在学</span>
          <select class="form-control" v-model="atSchool">
            <option v-for="(item,index) in status" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <button type="button" class="btn btn-warning pull-right m_r_10" v-if="has(65)&&btnDisplay"
                @click="exportTableToExcel('interviewTable','面试信息管理')">导出
        </button>
        <button type="button" class="btn btn-info pull-right m_r_10"
                v-if="has(65)&&btnDisplay" @click="addModelShow">添加
        </button>
        <button type="button" class="btn btn-primary pull-right m_r_10"
                v-if="has(65)" @click="queryInterview">查询
        </button>
      </div>
    </div>
    <br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="interviewTable">
            <thead>
            <tr>
              <th class="text-center" :style="display">关联</th>
              <th class="text-center">姓名</th>
              <th class="text-center">性别</th>
              <th class="text-center">年龄</th>
              <th class="text-center">电话</th>
              <th class="text-center">邮箱</th>
              <th class="text-center">QQ</th>
              <th class="text-center">现住址</th>
              <th class="text-center">学历</th>
              <th class="text-center">毕业时间</th>
              <th class="text-center">专业</th>
              <th class="text-center">是否在学</th>
              <th class="text-center">应聘渠道</th>
              <th class="text-center">应聘部门</th>
              <th class="text-center">应聘职位</th>
              <th class="text-center">面试官</th>
              <th class="text-center">邀约日期</th>
              <th class="text-center">面试日期</th>
              <th class="text-center">得分</th>
              <th class="text-center">是否合格</th>
              <th class="text-center">报销路费</th>
              <th class="text-center">入职状态</th>
              <th class="text-center" v-if="has(65)&&btnDisplay">删除</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in interviewList" :key="index" @dblclick="getEditInfo(item)">
              <th class="text-center" :style="display">
                <button type="button" class="btn btn-sm btn-info" @click="relate(item)">关联</button>
              </th>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.sex}}</td>
              <td class="text-center">{{getAge(item.birth)}}</td>
              <td class="text-center">{{item.phone}}</td>
              <td class="text-center">{{item.mail}}</td>
              <td class="text-center">{{item.qq}}</td>
              <td class="text-center">{{item.address}}</td>
              <td class="text-center">{{item.education}}</td>
              <td class="text-center">{{item.graduation|date}}</td>
              <td class="text-center">{{item.profession}}</td>
              <td class="text-center">{{item.atSchool == 0 ? "否" : "是"}}</td>
              <td class="text-center">{{item.channelName}}</td>
              <td class="text-center">{{item.departmentName}}</td>
              <td class="text-center">{{item.positionName}}</td>
              <td class="text-center">{{item.interviewer}}</td>
              <td class="text-center">{{item.invitationDate|date}}</td>
              <td class="text-center">{{item.recruitDate|date}}</td>
              <td class="text-center">{{item.score}}</td>
              <td class="text-center">{{item.isQualified}}</td>
              <td class="text-center">{{item.isPay == 0 ? "否" : "是"}}</td>
              <td class="text-center">{{item.isEntry}}</td>
              <td class="text-center" v-if="has(65)&&btnDisplay">
                <button type="button" class="btn btn-danger btn-sm"
                        @click="deleteInterview(item)">删除
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面 -->
    <div class="row hint">
      <div class="col-md-2 col-lg-offset-10">
        <label>双击可查看详细信息</label>
      </div>
    </div>
    <div class="row row_edit">
      <div class="modal fade" id="interviewAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <interviewEntry ref="addInterview"></interviewEntry>
        </div>
      </div>
      <div class="modal fade" id="interviewEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <updateInterviewEntry :interviewBase="interviewBase" :educationExprience="educationExprience"
                                :apply="apply" @closeUIEAction='closeUIEAction' ref="interviewInfo">
          </updateInterviewEntry>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import positionInfo from '../vuecommon/positionInfo.vue'
  import channel from '../vuecommon/channel.vue'
  import department from '../vuecommon/department.vue'
  import interviewEntry from '../recruitment/subInterview/interviewEntry.vue'
  import updateInterviewEntry from '../recruitment/subInterview/updateInterviewEntry.vue'

  export default {
    name: "interview",
    components: {
      DatePicker,
      department,
      positionInfo,
      channel,
      interviewEntry,
      updateInterviewEntry
    },
    data() {
      return {
        // 查询
        departId: '0',
        positionId: '',
        channelId: '',
        isQualified: null,
        qualifiedStatus: [
          {value: null, label: '全部'},
          {value: '1', label: '是'},
          {value: '0', label: '否'},
          {value: '2', label: '待定'},
        ],
        dateFlag: null,
        dateFlagList: [
          {value: null, label: '全部'},
          {value: '0', label: '邀约日期'},
          {value: '1', label: '面试日期'},
        ],
        begDate: this.$currentDate(),
        endDate: this.$currentDate(),
        isEntry: null,
        entryStatus: [
          {value: null, label: '全部'},
          {value: '0', label: '未入职'},
          {value: '1', label: '在职'},
          {value: '2', label: '离职'},
        ],
        name: null,
        phone: null,
        sex: null,
        sexStatus: [
          {value: null, label: '全部'},
          {value: '1', label: '男'},
          {value: '0', label: '女'},
        ],
        isPay: null,
        education: null,
        educationState: [
          {value: null, label: '全部'},
          {value: '0', label: '未知'},
          {value: '1', label: '博士'},
          {value: '2', label: '硕士研究生'},
          {value: '3', label: '本科'},
          {value: '4', label: '专科'},
          {value: '5', label: '高中/中专'},
          {value: '6', label: '初中及以下'},
        ],
        profession: null,
        atSchool: null,
        status: [
          {value: null, label: '全部'},
          {value: '1', label: '是'},
          {value: '0', label: '否'},
        ],
        interviewList: [],
        interviewBase: {},
        interviewInfo: {}, //首页列表获取的一个人的面试信息
        educationExprience: {},
        apply: {},
        id: '',
        display: 'display:none',
        btnDisplay: true,
        account: '',

      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
			//关闭面试的修改接口，返回刷新
			closeUIEAction:function(){
				this.queryInterview()
				$("#interviewEdit").modal('hide')
			},
      getAge(date) {
        return this.$getAge(date)
      },
      departChange(departId) {   // 部门
        this.departId = departId
      },
      positionChange(positionId) { // 职位
        this.positionId = positionId
      },
      channelChange(channelId) {   // 渠道
        this.channelId = channelId
      },
      queryInterview() {
        if (this.departId == '0') {
          this.departId = null
        }
        if (this.positionId == '0') {
          this.positionId = null
        }
        if (this.channelId == '0') {
          this.channelId = null
        }
        if (this.isBlank(this.name)) {
          this.name = null
        }
        if (this.isBlank(this.phone)) {
          this.phone = null
        }
        if (this.isBlank(this.profession)) {
          this.profession = null
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/queryRecruitData',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            department: this.departId,
            position: this.positionId,
            channel: this.channelId,
            isQualified: this.isQualified,
            dateFlag: this.dateFlag,
            begDate: this.begDate == null? '':this.$queryStartTime(this.begDate),
            endDate: this.endDate == null? '':this.$queryEndTime(this.endDate),
            isEntry: this.isEntry,
            name: this.name,
            phone: this.phone,
            sex: this.sex,
            isPay: this.isPay,
            education: this.education,
            profession: this.profession,
            atSchool: this.atSchool,
          },
          dataType: 'json',
        }).then(response => {
          this.interviewList = response.data.retData
          console.log(response.data.retData)
        }).catch(error => {
          console.log(error)
        });
      },
      getEditInfo(item) {
        this.$refs.interviewInfo.initBtn()
        if (this.has(65)&&this.btnDisplay) {
          if (item.isEntry == '未入职') {
            this.$refs.interviewInfo.isEntryBtn = true
          } else if (item.isEntry == '在职' || item.isEntry == '离职') {
            this.$refs.interviewInfo.isShowBtn = true
          }
        }else if(!this.btnDisplay){
          this.$refs.interviewInfo.isShow = false
        }
        $('#interviewEdit').modal('show')
        this.interviewInfo = Object.assign({}, item)
        this.$refs.interviewInfo.passParamToSubModule(this.interviewInfo)
      },
      addModelShow() {
        this.$refs.addInterview.initAdd()
        $('#interviewAdd').modal('show')
      },
      deleteInterview(item) {
        const msg = confirm("确定删除？")
        if (msg) {
          this.id = item.id
          axios({
            method: 'post',
            url: this.url + '/zpglController/updateRecruitDataById',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.id
            }
          }).then(response => {
            alert('删除成功!')
            this.queryInterview()
          }).catch(error => {
            alert('删除失败!')
            console.log(error)
          });
        }
      },
      // ---------------------------------------关联----------------------------------
      getEntryInfo() {
        const account = this.$route.params.account
        const name = this.$route.params.name
        if (account != undefined && name != undefined) {
          this.display = 'display:table-cell'
          this.btnDisplay = false
          this.account = account
          this.name = name
          $(".modal-backdrop").remove();
          this.queryInterview();
        } else {
          this.queryInterview();
        }
      },
      relate(item) {
        let msg;
        if(item.isEntry == '未入职'){
          msg = confirm('确定关联吗？')
        }else if (item.isEntry == '在职'){
          msg = confirm('该面试信息已关联在职人员,确定关联吗？')
        }else if(item.isEntry == '离职'){
          msg = confirm('该面试信息已关联离职人员,确定关联吗？')
        }
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/relateRecruitData',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: item.id,
              account: this.account
            },
            dataType: 'json',
          }).then(response => {
            alert('关联成功')
            this.$router.push('/employee')
          }).catch(error => {
            alert('关联失败')
            console.log(error)
          })
        }
      },
      // ------------------------------------查看面试信息-----------------------------
      showInterviewInfo(val){
        this.$refs.interviewInfo.initBtn()
        axios({
          method: 'post',
          url: this.url + '/zpglController/queryRecruitData',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            account: val
          },
          dataType: 'json',
        }).then(response => {
          this.interviewInfo = response.data.retData[0]
          this.$refs.interviewInfo.passParamToSubModule(this.interviewInfo)
          $('#interviewEdit').modal('show')
          this.$refs.interviewInfo.changeBtn()
        }).catch(error => {
          console.log(error)
        });
      }
    },
    created() {
      this.getEntryInfo()
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

  .m_r_10 {
    margin-right: 10px;
  }

  input[type="date"] {
    line-height: 26px !important;
  }

  .hint {
    color: #F2A203;
    margin-left: 150px;
  }
</style>


