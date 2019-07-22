<!-- author:dingdong -->
<!--审批人集合-->
<template>
  <select class="form-control" v-model="accId" :disabled="isAble">
    <option v-for="(item,index) in accountList" :key="index" :value="item.accountID">{{item.accountName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'approvalLeaveAcc',
    data() {
      return {
        isAble: false,
        accId: '',
        accountList:[] // 审批人集合
      };
    },
    props: ['accountID'],
    watch:{
      accountID:{
        handler(val){
          this.accId = val
        },
        immediate: true
      },
      accId:{
        handler(val){
          this.$emit('approvalChange',val)
        },
        immediate: true
      }
    },
    methods:{
      //设置初始值
      setAccountId(val){
        this.accId = val
      },
      changeAble(){
        this.isAble = "disabled"
      },
      // 查询审批人类型信息
      getApprovalAccount: function() {
        var url = this.url + '/leavePrepareController/queryApprovalLeaveAccount'
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
          this.accountList = response.data.retData;
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
    },
    created() {
      this.getApprovalAccount();
    },
  }
</script>

<style>

</style>
