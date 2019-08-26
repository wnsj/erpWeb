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
        <button type="button" class="btn btn-info pull-right" @click="addModel">添加</button>
      </div>
    </div>
    <br>
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
              <td class="text-center">
                <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#channelEdit"
                        @click="getRecruitChannelInfo(item)">修改
                </button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-danger btn-sm" @click="deleteChannel(item)">删除</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <div class="modal fade" id="channelAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">编辑招聘渠道</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        recruitmentChannelsList: [],
        recruitmentChannelsId: '',
        recruitmentChannelsName: '',
        newRecruitmentChannels: '',
      }
    },
    methods: {
      //查询招聘渠道
      getChannelsList() {
        axios({
          method: 'post',
          url: this.url + '/zpglController/queryRecruitChannel',
          dataType: 'json',
        }).then(response => {
          this.recruitmentChannelsList = response.data.retData
        }).catch(error => {
          console.log(error)
        });
      },
      addModel() {
        this.newRecruitmentChannels = ''
        $('#channelAdd').modal('show')
      },
      //新增招聘渠道信息
      addChannelsInfo() {
        if (this.newRecruitmentChannels == '') {
          alert('信息不能为空');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/addRecruitChannel',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            recruitChannelName: this.newRecruitmentChannels
          },
          dataType: 'json',
        }).then(response => {
          alert("添加成功!")
          $('#channelAdd').modal('hide');
          this.getChannelsList()
        }).catch(error => {
          alert("添加失败!")
          console.log(error)
        });
      },
      getRecruitChannelInfo(item) {
        this.recruitmentChannelsId = item.recruitChannelId
        this.recruitmentChannelsName = item.recruitChannelName
      },
      //修改该条招聘渠道信息
      changeChannelsInfo() {
        if (this.recruitmentChannelsName == '') {
          alert('职位名称不能为空');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/updateRecruitChannel',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            recruitChannelId: this.recruitmentChannelsId,
            recruitChannelName: this.recruitmentChannelsName,
          },
          dataType: 'json',
        }).then(response => {
          alert("修改成功!")
          this.recruitmentChannelsName = ''
          this.recruitmentChannelsId = ''
          $('#channelEdit').modal('hide');
          this.getChannelsList()
        }).catch(error => {
          alert("修改失败!")
          console.log(error)
        });

      },
      //删除某一条招聘渠道信息
      deleteChannel(item) {
        const msg = confirm("确定删除？")
        if (msg) {
          this.recruitmentChannelsId = item.recruitChannelId
          axios({
            method: 'post',
            url: this.url + '/zpglController/deleteRecruitChannel',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.recruitmentChannelsId,
            },
            dataType: 'json',
          }).then(response => {
            alert("删除成功！")
            this.getChannelsList()
          }).catch(error => {
            alert("删除失败!")
            console.log(error)
          });
        }
      },
    },
    created() {
      this.getChannelsList()
    }
  }


</script>

<style>
  .user-container {
    background-color: #fff;
    width: 100%;
    padding: 10px 20px;
  }

  .user-btn-group > button {
    margin: 0 2px;
  }

  .form-group {
    line-height: 30px;
  }

  .form-group > label {
    padding: 0;
  }
</style>
