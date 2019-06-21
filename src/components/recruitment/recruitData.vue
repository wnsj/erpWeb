<template>
  <div class="container user-container" id="recruitdata-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>面试信息管理</h2>
      </div>
    </div>
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
          <span class="input-group-addon">入职状态</span>
          <select class="form-control" v-model="isEntry">
            <option v-for="(item,index) in entryList" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">是否合格</span>
          <select class="form-control" v-model="isQualified">
            <option v-for="(item,index) in qualifiedList" :key="index" :value="item.value">
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
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <button type="button" class="btn btn-warning pull-right m_r_10">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#dataAdd">添加</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryRecruitData">查询</button>
      </div>
    </div>
    <!-- 查询结果集 -->
    <div class="row pre-scrollable">
      <div class="col-md-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover" id="datatable">
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
              <th class="text-center">删除</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in recruitDataList" :key="index">
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
              <td class="text-center">{{item.isPay  == 0 ? "否" : "是"}}</td>
              <td class="text-center">{{item.isEntry}}</td>
              <td><center><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#publishEdit" @click="getEditInfo(item)">编辑</button></center></td>
              <td><center><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#publishDelete" @click="getDelId(item)">删除</button></center></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面 -->
  </div>
</template>
<script>
  import axios from 'axios'
  import { timeInit } from '../../assets/js/date';
  import { jsGetAge } from '../../assets/js/date';

  export default {
    data(){
      return {
        // 查询
        name: null,
        phone: null,
        dateFlag: null,
        dateFlagList:[
          {value:null,label:'全部'},
          {value:'0',label:'邀约日期'},
          {value:'1',label:'面试日期'},
        ],
        begDate: this.getCurrentDay,
        endDate: this.getCurrentDay,
        isEntry: null,
        entryList: [
          {value:null,label:'全部'},
          {value:'0',label:'未入职'},
          {value:'1',label:'在职'},
          {value:'2',label:'离职'},
        ],
        isQualified: null,
        qualifiedList: [
          {value:null,label:'全部'},
          {value:'0',label:'是'},
          {value:'1',label:'否'},
          {value:'2',label:'待定'},
        ],
        recruitDataList:[],
      }
    },
    methods: {
      dateFomate(str){
        return timeInit(str);
      },
      getAge(param){
        return jsGetAge(param)
      },
      queryRecruitData(){      // 查询招聘发布信息
        if(this.isBlank(this.name)){
          this.name = null
        }
        if(this.isBlank(this.phone)){
          this.phone = null
        }

        console.log("姓名：" + this.name)
        console.log("电话：" + this.phone)
        console.log("日期类型：" + this.dateFlag)
        console.log("开始时间：" + this.begDate)
        console.log("结束时间：" + this.endDate)
        console.log("入职状态：" + this.isEntry)
        console.log("是否合格：" + this.isQualified)

        axios({
          method: 'post',
          url: this.url + '/zpglController/queryRecruitData',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            name: this.name,
            phone: this.phone,
            dateFlag: this.dateFlag,
            begDate: this.begDate,
            endDate: this.endDate,
            isEntry: this.isEntry,
            isQualified: this.isQualified
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
          this.recruitDataList = response.data.retData
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
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


