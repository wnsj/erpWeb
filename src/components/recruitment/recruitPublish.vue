<!-- author:dingdong -->
<template>
  <div class="container user-container" id="recruitpublish-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>招聘发布管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-left: 0;">
          <label class="control-label text-left nopad">发布时间：</label>
        </div>
         <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
            <date-picker v-model="beginDate" type="date" format="YYYY-MM-DD"></date-picker>
         </div>
         <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
            <span class="nopad">~</span>
         </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
          <date-picker v-model="endDate" type="date" format="YYYY-MM-DD"></date-picker>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>渠道：</p>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <channel :channel="channelId" @channelChange="channelChange"></channel>
        </div>
      </div>

      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>职位：</p>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <positionInfo :pid="positionId" @jobChange="positionChange"></positionInfo>
        </div>
      </div>

    </div>
    <div class="row">

      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 pull-right">
        <button type="button" class="btn btn-warning pull-right m_r_10" @click="exportTableToExcel('recruitPublishTB','招聘发布管理')">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" @click="addBtn" v-if="has(65)">添加</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryRecruitPublish">查询</button>
      </div>
    </div>
    </br/>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="recruitPublishTB">
            <thead>
            <tr>
              <th class="text-center">渠道</th>
              <th class="text-center">职位</th>
              <th class="text-center">发布日期</th>
              <th class="text-center">发布人数</th>
              <th class="text-center">邀约人数</th>
              <th class="text-center" v-if="has(65)">编辑</th>
              <th class="text-center" v-if="has(65)">删除</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in recruitPublishList " :key="index">
              <td class="text-center">{{item.channelName}}</td>
              <td class="text-center">{{item.positionName}}</td>
              <td class="text-center">{{item.publishDate|date}}</td>
              <td class="text-center">{{item.publishNum}}</td>
              <td class="text-center">{{item.phoneNum}}</td>
              <td class="text-center" v-if="has(65)">
                <button type="button" class="btn btn-warning btn-sm" @click="getEditInfo(item)" >编辑</button>
              </td>
              <td class="text-center" v-if="has(65)">
                <button type="button" class="btn btn-danger btn-sm" @click="getDelId(item)" v-if="has(65)">删除</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面 -->
    <!---模态对话框-->
    <!-- 新增 -->
    <div class="modal fade" id="publishAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">新增招聘发布信息</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">渠道：</label>
                <div class="col-md-5">
                  <channel :channelId="channelAddId" ref="channelAdd" @channelChange='getChannelAddId'></channel>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <positionInfo :pid="positionAddId" ref="positionAdd" @jobChange='getPositionAddId'></positionInfo>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">发布时间：</label>
                <div class="col-md-5">
                <date-picker v-model="publishAddDate" type="date" format="YYYY-MM-DD"></date-picker>
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">编辑招聘发布信息</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">渠道：</label>
                <div class="col-md-5">
                  <channel :channelId="channelEditId" ref="channelEdit" @channelChange="getChannelEditId"></channel>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-5">
                  <positionInfo :pid="positionEditId" ref="positionEdit" @jobChange='getPositionEditId'></positionInfo>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="control-label text-left nopad">发布时间：</label>
                <date-picker v-model="publishEditDate" type="date" format="YYYY-MM-DD"></date-picker>
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
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import positionInfo from '../vuecommon/positionInfo.vue'
  import channel from '../vuecommon/channel.vue'

  export default {
    components: {
      DatePicker,
      positionInfo,
      channel
    },
    data() {
      return {
        // 招聘发布id
        publishId: '',
        // 查询
        channelId: '',
        positionId: '',
        beginDate: this.$queryStartMonth(),
        endDate: this.$currentDate(),
        recruitPublishList: [],          // 招聘发布信息
        // 添加
        channelAddId: '',
        positionAddId: '',
        publishAddDate: this.$currentDate(),
        publishAddNum: 0,
        phoneAddNum: 0,
        // 编辑
        channelEditId: '',
        positionEditId: '',
        publishEditDate: '',
        publishEditNum: '',
        phoneEditNum: '',
      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      channelChange(channelId) {   // 渠道
        console.log(channelId)
        this.channelId = channelId
        console.log("赋值后的结果" + this.channelId)
      },
      positionChange(positionId) { // 职位
        console.log(positionId)
        this.positionId = positionId
      },
      queryRecruitPublish() {      // 查询招聘发布信息
        if (this.channelId == '0') {
          this.channelId = null
        }
        if (this.positionId == '0') {
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
            begDate: this.$queryStartTime(this.beginDate),
            endDate: this.$queryEndTime(this.endDate)
          },
          dataType: 'json',
        }).then((response) => {
          this.recruitPublishList = response.data.retData
          console.log('查询成功')
        }).catch(error => {
          console.log(error)
        });
      },

      // ---------------------------------------添加----------------------------------

      getChannelAddId(channelId) {
        this.channelAddId = channelId
      },
      getPositionAddId(positionId) {
        this.positionAddId = positionId
      },
      addBtn() {
        this.channelAddId = ''
        this.positionAddId = ''
        this.publishAddDate = this.$currentDate()
        this.publishAddNum = 0
        this.phoneAddNum = 0
        this.$refs.channelAdd.setChannelId('')
        this.$refs.channelAdd.getChannel()
        this.$refs.positionAdd.setPositionId('')
        this.$refs.positionAdd.getPositionInfo()
        $('#publishAdd').modal('show')
      },
      addRecruitPublish() {     // 添加招聘发布信息
        if (this.isBlank(this.channelAddId)) {
          alert('请选择渠道！');
          return false;
        }
        if (this.isBlank(this.positionAddId)) {
          alert('请选择职位！');
          return false;
        }
        if (this.isBlank(this.publishAddDate)) {
          alert('请填写日期！');
          return false;
        }
        if (this.publishAddNum == '' || this.publishAddNum <= 0) {
          alert('发布人数必须大于0！');
          return false;
        }
        if (this.isBlank(this.phoneAddNum) || this.phoneAddNum < 0) {
          this.phoneAddNum = 0
        }
        const msg = confirm('确认添加？')
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/addZpPublish',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              publishDate: this.$YYYY_MM_DD_HH_mm_ss(this.publishAddDate),
              channel: this.channelAddId,
              position: this.positionAddId,
              publishNum: this.publishAddNum,
              phoneNum: this.phoneAddNum
            },
            dataType: 'json',
          }).then(response => {
            alert('添加成功')
            $('#publishAdd').modal('hide')
            this.queryRecruitPublish()
          }).catch(error => {
            console.log(error)
          });
        }
      },

      // ---------------------------------------编辑----------------------------------

      getChannelEditId(channelId) {
        this.channelEditId = channelId
      },
      getPositionEditId(positionId) {
        this.positionEditId = positionId
      },
      // 点击编辑获取招聘发布详细信息
      getEditInfo(item) {
        this.publishId = item.publishId
        this.channelEditId = item.channel
        this.positionEditId = item.position
        this.publishEditDate = item.publishDate
        this.publishEditNum = item.publishNum
        this.phoneEditNum = item.phoneNum
        this.$refs.channelEdit.setChannelId(item.channel)
        this.$refs.channelEdit.getChannel()
        this.$refs.positionEdit.setPositionId(item.position)
        this.$refs.positionEdit.getPositionInfo()
        $('#publishEdit').modal('show')
      },
      editRecruitPublish() {   // 编辑招聘发布信息
        if (this.isBlank(this.channelEditId)) {
          alert('请选择渠道！');
          return false;
        }
        if (this.isBlank(this.positionEditId)) {
          alert('请选择职位！');
          return false;
        }
        if (this.isBlank(this.publishEditDate)) {
          alert('请填写日期！');
          return false;
        }
        if (this.publishEditNum == '' || this.publishEditNum <= 0) {
          alert('发布人数必须大于0！');
          return false;
        }
        if (this.isBlank(this.phoneEditNum) || this.phoneEditNum < 0) {
          this.phoneAddNum = 0
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
            publishDate: this.$YYYY_MM_DD_HH_mm_ss(this.publishEditDate),
            publishNum: this.publishEditNum,
            phoneNum: this.phoneEditNum
          },
          dataType: 'json',
        }).then(response => {
          alert("修改成功")
          $('#publishEdit').modal('hide')
          this.queryRecruitPublish()
        }).catch(error => {
          console.log(error)
        });
      },

      // ---------------------------------------删除----------------------------------
      getDelId(item) {
        this.publishId = item.publishId
        const msg = confirm('确认删除？')
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/zpglController/deleteZpPublish',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.publishId,
            },
            dataType: 'json',
          }).then(response => {
            alert('删除成功')
            this.queryRecruitPublish()
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
