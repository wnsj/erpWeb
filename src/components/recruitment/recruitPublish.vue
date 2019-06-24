<template>
  <div class="container user-container" id="recruitpublish-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>招聘发布管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>发布时间：</p>
        </div>
        <div class="col-md-10 col-lg-10">
          <span><input type="date" value="" id="firstTime" v-model="beginDate" /></span>
          <span>&nbsp;~&nbsp;</span>
          <span><input type="date" value="" id="secondTime" v-model="endDate" /></span>
        </div>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>渠道：</p>
        </div>
        <div class="col-md-10 col-lg-10">
          <channel :channel="channelId" @channelChange="channelChange"></channel>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>职位：</p>
        </div>
        <div class="col-md-10 col-lg-10">
          <position :positionId="positionId" @positionChange="positionChange"></position>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-5">
        <button type="button" class="btn btn-warning pull-right m_r_10">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#publishAdd">添加</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryRecruitPublish">查询</button>
      </div>
    </div>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="datatable">
            <thead>
            <tr>
              <th class="text-center">渠道</th>
              <th class="text-center">职位</th>
              <th class="text-center">发布日期</th>
              <th class="text-center">发布人数</th>
              <th class="text-center">邀约人数</th>
              <th class="text-center">编辑</th>
              <th class="text-center">删除</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in recruitPublishList " :key="index">
              <td class="text-center">{{item.channelName}}</td>
              <td class="text-center">{{item.positionName}}</td>
              <td class="text-center">{{item.publishDate}}</td>
              <td class="text-center">{{item.publishNum}}</td>
              <td class="text-center">{{item.phoneNum}}</td>
              <td><center><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#publishEdit" @click="getEditInfo(item)">编辑</button></center></td>
              <td><center><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#publishDelete" @click="getDelId(item)">删除</button></center></td>
              <!-- <td class="text-center warning"><span data-toggle="modal" data-target="#publishEdit" @click="getEditInfo(item)">编辑</span></td> -->
              <!-- <td class="text-center danger"><span data-toggle="modal" data-target="#publishDelete" @click="getDelId(item)">删除</span></td> -->
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面 -->
    <!---模态对话框-->
    <!-- 新增 -->
    <div class="modal fade" id="publishAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">新增招聘发布信息</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body" >
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">渠道：</label>
                <div class="col-md-5">
                  <channel :channelId="channelAddId" @channelChange='getChannelAddId'></channel>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <position :positionId="positionAddId" @positionChange='getPositionAddId'></position>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">发布日期：</label>
                <div class="col-md-5 input-group date form_date">
                  <input type="date" class="form-control" id="time" v-model="publishAddDate">
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                  </div>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">发布人数：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="publishAddNum">
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
              <button type="button" class="btn btn-warning" @click="addRecruitPublish">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 编辑 -->
    <div class="modal fade" id="publishEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">编辑招聘发布信息</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body" >
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">渠道：</label>
                <div class="col-md-5">
                  <channel :channelId="channelEditId" @channelChange="getChannelEditId"></channel>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <position :positionId="positionEditId" @positionChange='getPositionEditId'></position>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">发布日期：</label>
                <div class="col-md-5 input-group date form_date">
                  <input type="date" class="form-control" id="time" v-model="publishEditDate">
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                  </div>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">发布人数：</label>
                <div class="col-md-5">
                  <input type="number" class="form-control" value="0" min="0" max="999" v-model="publishEditNum">
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
              <button type="button" class="btn btn-warning" @click="editRecruitPublish">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 删除 -->
    <div class="modal fade bs-example-modal-sm" id="publishDelete" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">提示</h4>
          </div>
          <div class="modal-body">
            <div>确定删除招聘信息么？ID为：{{publishId}}</div>
          </div>
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-danger" @click="deleteRecruitPublish">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
  import axios from 'axios'
  import position from '../vuecommon/position.vue'
  import channel from '../vuecommon/channel.vue'

  export default {
    components: {
      position,
      channel
    },
    data() {
      return {
        // 招聘发布id
        publishId: '',
        // 查询
        channelId: '',
        positionId: '',
        beginDate: this.getCurrentDay,
        endDate: this.getCurrentDay,
        recruitPublishList:[],          // 招聘发布信息
        // 添加
        channelAddId:'',
        positionAddId:'',
        publishAddDate: this.getCurrentDay,
        publishAddNum: 0,
        phoneAddNum: 0,
        // 编辑
        channelEditId:'',
        positionEditId:'',
        publishEditDate: '',
        publishEditNum: '',
        phoneEditNum: '',
      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      channelChange(channelId){   // 渠道
        console.log(channelId)
        this.channelId = channelId
        console.log("赋值后的结果" + this.channelId)
      },
      positionChange(positionId){ // 职位
        console.log(positionId)
        this.positionId = positionId
      },
      queryRecruitPublish(){      // 查询招聘发布信息
        if(this.channelId == '0'){
          this.channelId = null
        }
        if(this.positionId == '0'){
          this.positionId = null
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/queryZpPublish',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            channel: this.channelId,
            position: this.positionId,
            begDate: this.beginDate,
            endDate: this.endDate
          },
          dataType: 'json',
        }).then((response) => {
          this.recruitPublishList = response.data.retData
          console.log('查询成功')
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },

      // ---------------------------------------添加----------------------------------

      getChannelAddId(channelId){
        this.channelAddId = channelId
        console.log("add：" + channelId)
      },
      getPositionAddId(positionId){
        this.positionAddId = positionId
        console.log("add：" + positionId)
      },
      addRecruitPublish(){     // 添加招聘发布信息
        if (this.channelAddId == '' || this.channelAddId == '0') {
          alert('渠道还没有选择');
          return false;
        }
        if (this.positionAddId == '' || this.positionAddId == '0') {
          alert('职位还没有选择');
          return false;
        }
        if (this.publishAddDate == '') {
          alert('日期还没有选择');
          return false;
        }
        if (this.publishAddNum == '' || this.publishAddNum <= 0) {
          alert('发布人数必须大于0');
          return false;
        }
        if (this.phoneAddNum == '' || this.phoneAddNum < 0) {
          alert('邀约人数不能小于0');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/addZpPublish',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            publishDate: this.publishAddDate,
            channel: this.channelAddId,
            position: this.positionAddId,
            publishNum: this.publishAddNum,
            phoneNum: this.phoneAddNum
          },
          dataType: 'json',
        }).then((response) => {
          this.queryRecruitPublish()
          console.log('添加成功')
        }).catch((error) => {
          console.log('请求失败处理')
        });
        this.channelAddId = '0',
          this.positionAddId = '0',
          this.publishAddDate = this.getCurrentDay,
          this.publishAddNum = 0,
          this.phoneAddNum = 0,
          $('#publishAdd').modal('hide');
      },

      // ---------------------------------------编辑----------------------------------

      getChannelEditId(channelId){
        this.channelEditId = channelId
        console.log("渠道编辑时的数据:" + this.channelEditId)
      },
      getPositionEditId(positionId){
        this.positionEditId = positionId
        console.log("职务编辑时回显的数据:" + this.positionEditId)
      },
      // 点击编辑获取招聘发布详细信息
      getEditInfo(item){
        console.log("招聘发布Id：" + item.publishId)
        this.publishId = item.publishId
        this.channelEditId = item.channel
        this.positionEditId = item.position
        this.publishEditDate = this.getCurrentDayAction(item.publishDate)
        this.publishEditNum = item.publishNum
        this.phoneEditNum = item.phoneNum
        console.log("回显招聘发布Id：" + this.publishId)
        console.log("渠道回显的数据:" + this.channelEditId)
        console.log("职务回显的数据:" + this.positionEditId)
        console.log("日期回显的数据:" + this.publishEditDate)
      },
      editRecruitPublish(){   // 编辑招聘发布信息
        if (this.channelEditId == '' || this.channelEditId == '0') {
          alert('渠道还没有选择');
          return false;
        }
        if (this.positionEditId =='' || this.positionEditId == '0') {
          alert('职位还没有选择');
          return false;
        }
        if (this.publishEditDate == '') {
          alert('日期还没有选择');
          return false;
        }
        if (this.publishEditNum == '' || this.publishEditNum <= 0) {
          alert("发布人数必须大于0");
          return false;
        }
        if (this.phoneEditNum == '' || this.phoneEditNum < 0) {
          alert('邀约人数不能小于0');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/updateZpPublish',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            publishId: this.publishId,
            channel: this.channelEditId,
            position: this.positionEditId,
            publishDate: this.publishEditDate,
            publishNum: this.publishEditNum,
            phoneNum: this.phoneEditNum
          },
          dataType: 'json',
        }).then((response) => {
          this.queryRecruitPublish()
          console.log("修改成功")
        }).catch((error) => {
          console.log('请求失败处理')
        });
        $('#publishEdit').modal('hide');
      },

      // ---------------------------------------删除----------------------------------
      getDelId(item){
        this.publishId = item.publishId
      },
      deleteRecruitPublish(){    //删除招聘信息
        console.log(this.publishId)
        axios({
          method: 'post',
          url:this.url+'/zpglController/deleteZpPublish',
          headers:{
            'Content-Type':this.contentType,
            'Access-Token':this.accessToken
          },
          data:{
            id:this.publishId,
          },
          dataType:'json',
        }).then((response) => {
          console.log(response.data.retMsg)
          this.queryRecruitPublish()
          console.log('删除成功')
        }).catch((error) => {
          console.log('请求失败处理')
        });
        this.publishId = ''
        $('#publishDelete').modal('hide');
      },
    }
  }
</script>

<style>
  @-moz-document url-prefix(){fieldset{display: table-cell;}}
  .user-container{background-color: #fff; width: 100%; padding: 0 20px;}
  .user-btn-group>button{margin: 0 2px;}
  .main-title h2{line-height: 50px;}
  .nopad{padding-left:0; padding-right:0; line-height:34px;}
  .form_date.input-group[class*=col-]{float:left; padding-left:15px; padding-right:15px;}
  .m_r_10{margin-right:10px;}
  input[type="date"]{line-height: 26px!important;}
</style>
