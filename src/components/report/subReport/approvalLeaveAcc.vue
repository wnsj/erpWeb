<template>
  <select class="form-control" v-model="accId"  v-on:change="approvalChange" :disabled="isAble">
    <option value="">---请选择---</option>
    <option v-for="(item,index) in accountList" :key="index" v-bind:value="item.accountID">{{item.accountName}}</option>
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
        accountName:'',
        accountList:[]
      };
    },
    props: ['accountID'],
    watch:{
      accountID:function(){
        this.accId = this.accountID
      },
      accId:function(val){
        this.$emit('approvalChange',val,this.accountName)
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
      // 提交账户名称和ID
      approvalChange: function(event) {
        this.accountName = this.exchangeAccountName(this.accId)
      },
      // 添加前缀的渠道名字兑换原来的名字
      exchangeAccountName: function(param) {
        var res = {}
        for (var i = 0; i < this.accountList.length; i++) {
          res = this.accountList[i]
          if (res.id == param) {
            return res.accountName
          }
        }
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
    }
  }
</script>

<style>

</style>
