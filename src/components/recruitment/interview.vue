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
          <position :positionId="positionId" @positionChange="positionChange"></position>
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
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">开始时间</span>
          <input type="date" value="" id="firstTime" class="form-control" v-model="begDate" />
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">结束时间</span>
          <input type="date" value="" id="secondTime" class="form-control" v-model="endDate" />
        </div>
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
    </div><br>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">姓名</span>
          <input type="text" class="form-control" placeholder="Username"  v-model="name">
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
    </div><br>
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
          <input type="text" class="form-control" placeholder="Profession"  v-model="profession">
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
        <button type="button" class="btn btn-warning pull-right m_r_10" @click="exportTableToExcel('interviewtable','面试信息管理')">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#interviewAdd">添加</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryInterview">查询</button>
      </div>
    </div><br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="interviewtable">
            <thead>
            <tr>
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
              <th class="text-center">编辑</th>
              <!-- <th class="text-center">删除</th> -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in interviewList" :key="index">
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.sex}}</td>
              <td class="text-center">{{getAge(item.birth)}}</td>
              <td class="text-center">{{item.phone}}</td>
              <td class="text-center">{{item.mail}}</td>
              <td class="text-center">{{item.qq}}</td>
              <td class="text-center">{{item.address}}</td>
              <td class="text-center">{{item.education}}</td>
              <td class="text-center">{{dateFomate(item.graduation)}}</td>
              <td class="text-center">{{item.profession}}</td>
              <td class="text-center">{{item.atSchool == 0 ? "否" : "是"}}</td>
              <td class="text-center">{{item.channelName}}</td>
              <td class="text-center">{{item.departmentName}}</td>
              <td class="text-center">{{item.positionName}}</td>
              <td class="text-center">{{item.interviewer}}</td>
              <td class="text-center">{{dateFomate(item.invitationDate)}}</td>
              <td class="text-center">{{dateFomate(item.recruitDate)}}</td>
              <td class="text-center">{{item.score}}</td>
              <td class="text-center">{{item.isQualified}}</td>
              <td class="text-center">{{item.isPay == 0 ? "否" : "是"}}</td>
              <td class="text-center">{{item.isEntry}}</td>
              <td><center><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#interviewEdit" @click="getEditInfo(item)">编辑</button></center></td>
              <!-- <td><center><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#interviewDelete" @click="getDelId(item)">删除</button></center></td> -->
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面 -->
    <div class="row row_edit">
			<div class="modal fade" id="interviewAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg">
					<interviewEntry></interviewEntry>
				</div>
			</div>
      <div class="modal fade" id="interviewEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg">
					<updateInterviewEntry :interviewBase="interviewBase" :educationExprience="educationExprience"
             :apply="apply" ref="interviewInfo">
          </updateInterviewEntry>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
  import axios from 'axios'
  import position from '../vuecommon/position.vue'
  import channel from '../vuecommon/channel.vue'
  import department from '../vuecommon/department.vue'
  import interviewEntry from '../recruitment/subInterview/interviewEntry.vue'
  import updateInterviewEntry from '../recruitment/subInterview/updateInterviewEntry.vue'
  import { timeInit } from '../../assets/js/date'
  import { jsGetAge } from '../../assets/js/date'

  export default {
    components: {
      department,
      position,
      channel,
      interviewEntry,
      updateInterviewEntry
    },
    data(){
      return {
        // 查询
        departId: '0',
        positionId: '',
        channelId: '',
        isQualified: null,
        qualifiedStatus: [
          {value:null,label:'全部'},
          {value:'1',label:'是'},
          {value:'0',label:'否'},
          {value:'2',label:'待定'},
        ],
        dateFlag: null,
        dateFlagList:[
          {value:null,label:'全部'},
          {value:'0',label:'邀约日期'},
          {value:'1',label:'面试日期'},
        ],
        begDate: this.getCurrentDay,
        endDate: this.getCurrentDay,
        isEntry: null,
        entryStatus: [
          {value:null,label:'全部'},
          {value:'0',label:'未入职'},
          {value:'1',label:'在职'},
          {value:'2',label:'离职'},
        ],
        name: null,
        phone: null,
        sex: null,
        sexStatus:[
          {value:null,label:'全部'},
          {value:'1',label:'男'},
          {value:'0',label:'女'},
        ],
        isPay: null,
        education: null,
        educationState:[
          {value:null,label:'全部'},
          {value:'0',label:'未知'},
					{value:'1',label:'博士'},
					{value:'2',label:'硕士研究生'},
					{value:'3',label:'本科'},
					{value:'4',label:'专科'},
					{value:'5',label:'高中/中专'},
					{value:'6',label:'初中及以下'},
        ],
        profession: null,
        atSchool: null,
        status: [
          {value:null,label:'全部'},
          {value:'1',label:'是'},
          {value:'0',label:'否'},
        ],
        interviewList:[],

        interviewBase: {},
				educationExprience: {},
        apply: {},
      }
    },
    methods: {
      dateFomate(str){
        return timeInit(str);
      },
      getAge(param){
        return jsGetAge(param)
      },

      // ---------------------------------------查询----------------------------------

      departChange(departId){   // 渠道
        this.departId = departId
      },
      positionChange(positionId){ // 职位
        this.positionId = positionId
      },
       channelChange(channelId){   // 渠道
        this.channelId = channelId
      },
      queryInterview(){      
        if(this.departId == '0'){
          this.departId = null
        }
        if(this.positionId == '0'){
          this.positionId = null
        }
        if(this.channelId == '0'){
          this.channelId = null
        }
        if(this.isBlank(this.name)){
          this.name = null
        }
        if(this.isBlank(this.phone)){
          this.phone = null
        }
         if(this.isBlank(this.profession)){
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
            begDate: this.begDate,
            endDate: this.endDate,
            isEntry: this.isEntry,
            name: this.name,
            phone: this.phone,
            sex: this.sex,
            isPay: this.isPay,
            education: this.education,
            profession: this.profession,
            atSchool: this.atSchool,

            interviewInfo:{}  //首页列表获取的一个人的面试信息
          },
          dataType: 'json',
        }).then((response) => {
          this.interviewList = response.data.retData
          console.log(response.data.retData)
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      
      getEditInfo(item){
        this.interviewInfo = Object.assign({},item)
        this.$refs.interviewInfo.passParamToSubModule(this.interviewInfo)
        this.interviewInfo.birth = timeInit(this.interviewInfo.birth)
        this.interviewInfo.graduation = timeInit(this.interviewInfo.graduation)
        this.interviewInfo.invitationDate = timeInit(this.interviewInfo.invitationDate)
        this.interviewInfo.recruitDate = timeInit(this.interviewInfo.recruitDate)
      }
    },
  }
</script>
<style>
  @-moz-document url-prefix(){fieldset{display: table-cell;}}
  .user-container{background-color: #fff; width: 100%; padding: 0 20px;}
  .user-btn-group>button{margin: 0 2px;}
  .main-title h2{line-height: 50px;}
  .m_r_10{margin-right:10px;}
  input[type="date"]{line-height: 26px!important;}
</style>


