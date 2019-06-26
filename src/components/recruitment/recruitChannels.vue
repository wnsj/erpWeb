<!-- author:dingdong -->
<template>
  <div class="container user-container" id="recruitchannels-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>招聘渠道管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-9">
        <button type="button" class="btn btn-info pull-right" data-toggle="modal" data-target="#channelAdd">添加</button>
      </div>
    </div><br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="datatable">
            <thead>
            <tr>
              <th class="text-center">序号</th>
              <th class="text-center">名称</th>
              <th class="text-center">修改</th>
              <th class="text-center">删除</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in recruitmentChannelsList" :key="index">
              <td class="text-center">{{index+1}}</td>
              <td class="text-center">{{item.recruitChannelName}}</td>
              <td><center><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#channelEdit" @click="getRecruitChannelInfo(item)">修改</button></center></td>
              <td><center><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#channelDelete" @click="getRecruitChannelInfo(item)">删除</button></center></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <div class="modal fade" id="channelAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
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
                <label for="channles" class="col-md-2 control-label text-right">招聘渠道：</label>
                <div class="col-md-5">
                  <input type="text" id="channles" class="form-control" v-model="newRecruitmentChannels">
                </div>
              </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="addChannelsInfo">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 编辑 -->
    <div class="modal fade" id="channelEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">编辑招聘渠道</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body" >
            <form action="">
              <div class="form-group clearfix">
                <label for="channels" class="col-md-2 control-label text-right">招聘渠道：</label>
                <div class="col-md-5">
                  <input type="text" id="channels" class="form-control" v-model="recruitmentChannelsName">
                </div>
              </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="changeChannelsInfo">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 删除 -->
    <div class="modal fade bs-example-modal-sm" id="channelDelete" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">提示</h4>
          </div>
          <div class="modal-body">
            <h4 class="modal-title">确认要删除此行数据吗？</h4>
          </div>
          <div class="modal-footer">
            <div class="col-md-12">
              <button class="btn btn-danger col-md-offset-1" data-dismiss="modal" @click="deleteChannelsInfo">确认</button>
              <button class="btn btn-primary col-md-offset-4" data-dismiss="modal">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        recruitmentChannelsList:[],
        recruitmentChannelsId:'',
        recruitmentChannelsName:'',
        newRecruitmentChannels:'',
      }
    },
    methods: {
      //获取招聘渠道
      getChannelsList() {
        axios({
          method: 'post',
          url:this.url+'/zpglController/queryRecruitChannel',
          dataType:'json',
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.recruitmentChannelsList = response.data.retData
          } else {
            alert(response.data.retMsg)
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      //新增招聘渠道信息
      addChannelsInfo(){
        if (this.newRecruitmentChannels=='') {
          alert('信息不能为空');
          return false;
        }
        axios({
          method: 'post',
          url:this.url+'/zpglController/addRecruitChannel',
          headers:{
            'Content-Type':this.contentType,
            'Access-Token':this.accessToken
          },
          data:{
            recruitChannelName:this.newRecruitmentChannels
          },
          dataType:'json',
        }).then((response) => {
          this.getChannelsList()
        }).catch((error) => {
          console.log('请求失败处理')
        });
        this.newRecruitmentChannels = ''
        $('#channelAdd').modal('hide');
      },
      //点击获取整条信息
      getRecruitChannelInfo(item){
        this.recruitmentChannelsId = item.recruitChannelId,
        this.recruitmentChannelsName = item.recruitChannelName
      },
      //修改该条招聘渠道信息
      changeChannelsInfo(item){
        if(this.recruitmentChannelsName=='') {
          alert('职位名称不能为空');
          return false;
        }
        axios({
          method: 'post',
          url:this.url+'/zpglController/updateRecruitChannel',
          headers:{
            'Content-Type':this.contentType,
            'Access-Token':this.accessToken
          },
          data:{
            recruitChannelId:this.recruitmentChannelsId,
            recruitChannelName:this.recruitmentChannelsName,
          },
          dataType:'json',
        }).then((response) => {
          console.log(response.data.retMsg)
          this.getChannelsList()
        }).catch((error) => {
          console.log('请求失败处理')
        });
        this.recruitmentChannelsName = ''
        this.recruitmentChannelsId = ''
        $('#channelEdit').modal('hide');
      },
      //删除某一条招聘渠道信息
      deleteChannelsInfo(){
        axios({
          method: 'post',
          url:this.url+'/zpglController/deleteRecruitChannel',
          headers:{
            'Content-Type':this.contentType,
            'Access-Token':this.accessToken
          },
          data:{
            id:this.recruitmentChannelsId,
          },
          dataType:'json',
        }).then((response) => {
          console.log(response.data.retMsg)
          this.getChannelsList()
        }).catch((error) => {
          console.log('请求失败处理')
        });
        this.recruitmentChannelsId = ''
        $('#channelDelete').modal('hide');
      },
    },
    created() {
      this.getChannelsList()
    }
  }


</script>

<style>
  .user-container {background-color: #fff;width: 100%;padding: 10px 20px;}
  .user-btn-group>button {margin: 0 2px;}
  .form-group{line-height: 30px;}
  .form-group>label{padding: 0;}
</style>
