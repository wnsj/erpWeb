<!-- author:dingdong -->
<!-- 所在部门主管信息 -->
<template>
  <select class="form-control" v-model="leaderId">
    <option v-for="leader in leaderInfoList" :value="leader.leaderId">{{leader.leaderName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "leaderInfo",
    data(){
      return {
        deptId: '',
        leaderId: '', // 创建props里的pid的副本
        leaderInfoList: []
      }
    },
    props: ['lid'], // 父组件传来的值
    watch:{         // 监听属性
      leaderId:{    // 监听data里leaderId的数据变化
        handler(newVal){
          this.leaderId = newVal  // 当监听到leaderId的值有变化时 将最新的值赋值给data里的leaderId
          this.$emit('leaderChange',newVal) // 子组件通过$emit 触发父组件的自定义事件,并且将最新的值返回给父组件
        },
        immediate: true // 代表在wacth里声明了leaderId这个方法之后立即先去执行handler方法
      },
    },
    methods:{
      setDeptId(val){
        this.deptId = val;
        console.log("部门ID" + val)
        this.getLeaderInfo();
      },
      // 查询渠道信息
      getLeaderInfo: function() {
        axios({
          method: 'post',
          url: this.url + '/computerController/queryLeaderInfo',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData);
          this.leaderInfoList = response.data.retData;
          if(this.leaderInfoList != null && this.leaderInfoList.length > 0){
            this.leaderId = this.leaderInfoList[0].leaderId;
          }
        }).catch(error => {
          console.log(error)
        });
      },
    },
    created() {
      this.leaderId = this.lid
    }
  }
</script>

<style scoped>

</style>

