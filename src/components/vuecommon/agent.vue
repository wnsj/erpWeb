<!-- author:dingdong -->
<!-- 代理人或者证明人集合 -->
<template>
  <select class="form-control" v-model="accountId">
    <option v-for="(item,index) in agentList" :key="index" :value="item.account">{{item.name}}</option>
  </select>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'agent',
    data() {
      return {
        accountId: '', //创建props属性agentAccount的副本
        leaveAccount: '',
        deptId: '',
        agentList: [] // 代理人或者证明人集合
      };
    },
    props: ['agentAccount'], // 父组件传来的值
    watch: {
      accountId:{
        handler(newVal,oldVal){
          this.accountId = newVal
          this.$emit('agentChange',newVal)
        },
        immediate: true
      }
    },
    methods: {
      getLeaveAccount(val) {
        this.leaveAccount = val[0];
        this.deptId = val[1];
        this.getAgentList()
      },
      insertAgentInfo(val) {
        this.agentList.push(val)
      },
      // 查询审批人信息
      getAgentList: function () {
        var url = this.url + '/leavePrepareController/queryAgentList'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            departmentId: this.deptId == 0 ? '' : this.deptId,
            account: this.leaveAccount
          },
          dataType: 'json',
        }).then((response) => {
          this.agentList = response.data.retData;
        }).catch((error) => {
          console.log('请求失败处理')
        });
      }
    },
    created() {
      this.accountId = this.agentAccount
    }
  }
</script>

<style>

</style>
