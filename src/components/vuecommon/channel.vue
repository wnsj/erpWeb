<!-- author:dingdong -->
<!-- 渠道 -->
<template>
  <select class="form-control" v-model="chanId">
    <option v-for="(item,index) in channelList" :key="index" :value="item.recruitChannelId">{{item.recruitChannelName}}</option>
  </select>
</template>
<script>
  import axios from 'axios'
  export default {
    name:'channel',
    data() {
      return {
        chanId: '0',
        channelList:[],
      }
    },
    props: ['channelId'],
    watch:{
      chanId:{
        handler(val){
          this.$emit('channelChange', val)
        },
        immediate: true
      }
    },
    methods:{
      //设置初始值
      setChannelId(val){
        this.chanId = val
      },
      changeFlag(){
        this.flag = true
      },
      // 查询渠道信息
      getChannel: function() {
        axios({
          method: 'post',
          url: this.url + '/zpglController/queryRecruitChannel',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
          this.channelList = response.data.retData
          if(this.chanId == '0'){
            this.channelList.splice(0,0,{recruitChannelId:'0', recruitChannelName:'全部'})
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
    },
    created(){
      this.getChannel()
    },
  }
</script>

<style>

</style>
