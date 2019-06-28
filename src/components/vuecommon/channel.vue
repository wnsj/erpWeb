<template>
  <select class="form-control" v-model="chanId"  v-on:change="channelChange">
    <option value="0">---请选择---</option>
    <option v-for="(item,index) in channelList" :key="index" v-bind:value="item.recruitChannelId">{{item.recruitChannelName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'channel',
    data() {
      return {
        chanId: '0',
        channelName:'',
        channelList:[]
      };
    },
    props: ['channelId'],
    watch:{
      channelId:function(){
        console.log("监听props域channelId的值："+ this.channelId)
        if(this.channelId == null) {
          console.log("赋值为0")
          this.chanId = '0'
        }else{
          console.log("开始给chanId赋值")
          this.chanId = this.channelId
        }
        console.log("监听props域channel的值："+ this.chanId)
      },
      chanId:function(val){
        this.$emit('channelChange',val,this.channelName)
        console.log("监听data域position的值："+ val)
      }
    },
    methods:{
      // 提交渠道名称和ID
      channelChange: function(event) {
        this.channelName = this.exchangeChannelName(this.chanId)
        // console.log("chanId" + this.chanId)
        // console.log(this.channelList.recruitChannelId)
      },
      // 添加前缀的渠道名字兑换原来的名字
      exchangeChannelName: function(param) {
        var res = {}
        for (var i = 0; i < this.channelList.length; i++) {
          res = this.channelList[i]
          if (res.recruitChannelId == param) {
            return res.recruitChannelName
          }
        }
      },
      // 查询渠道信息
      getChannel: function() {
        var url = this.url + '/zpglController/queryRecruitChannel'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
          },
          dataType: 'json',
        }).then((response) => {
          this.channelList = response.data.retData;
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
    },
    created() {
      this.getChannel()
    }
  }
</script>

<style>

</style>
