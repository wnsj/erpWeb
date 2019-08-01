<!-- author:dingdong -->
<!-- 所在部门主管信息 -->
<!-- author:dingdong -->
<!-- 所有岗位信息 -->
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
        leaderId: '',
        leaderInfoList: []
      }
    },
    props: ['lid'],
    watch:{
      leaderId:{
        handler(newVal){
          this.leaderId = newVal
          this.$emit('leaderChange',newVal)
        },
        immediate: true
      },
    },
    methods:{
      setDeptId(val){
        this.deptId = val;
        console.log("部门ID" + val)
        this.getLeaderInfo();
      },
      getLeaderInfo:function () {
        let url = this.url + '/computerController/queryLeaderInfo?deptId=' + this.deptId
        axios.get(url).then((response) =>{
          console.log(response.data.retData);
          this.leaderInfoList = response.data.retData;
          if(this.leaderInfoList != null && this.leaderInfoList.length > 0){
            this.leaderId = this.leaderInfoList[0].leaderId;
          }
        }).catch(function (error) {
          console.log(error);
          alert("get请求失败");
        })
      }
    },
    created() {
      this.leaderId = this.lid
    }
  }
</script>

<style scoped>

</style>

