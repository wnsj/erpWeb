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
        agent:{},
        agentList: [] // 代理人或者证明人集合
      };
    },
    props: ['agentAccount'], // 父组件传来的值
    watch: {
      accountId:{
        handler(newVal){
          this.accountId = newVal
          this.$emit('agentChange',newVal)
        },
        immediate: true
      },
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
      initParamNull(){  // 初始化参数为空
        this.accountId = ''
      },
      initParamZero(){  // 初始化参数为0
        this.accountId = '0'
      },
      showAgentInfo(val){
        this.agent = val
      },
      // 查询审批人信息
      getAgentList: function () {
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryAgentList',
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
          console.log(response.data.retData)
          this.agentList = response.data.retData;
          if(this.accountId == '0') { // 如果父组件传来的是'0' 就让组件显示默认值 否则不显示
            this.accountId = this.agentList[0].account;
          }
          if(!this.isBlank(this.agent.account)){
            for(let i=0; i<this.agentList.length; i++){
              if(this.agent.account == this.agentList[i].account){
                return false;
              }
            }
            this.agentList.push(this.agent);
            this.accountId = this.agent.account;
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      }
    },
    created() {
      this.accountId = this.agentAccount
    },
  }
</script>

<style>

</style>
