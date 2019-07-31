<!-- author:dingdong -->
<!-- 所有岗位信息 -->
<template>
  <select class="form-control" v-model="positionId">
    <option v-for="position in positionInfoList" :value="position.positionId">{{position.positionName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "positionInfo",
    data(){
      return {
        positionId: '',
        positionInfoList: [],
      }
    },
    props: ['pid'],
    watch:{
      positionId:{
        handler(newVal){
          this.positionId = newVal
          this.$emit('jobChange',newVal)
        },
        immediate: true
      },
    },
    methods:{
      getPositionInfo:function () {
        let url = this.url + '/computerController/queryPositionInfo'
        axios.get(url)
        .then((response) =>{
          console.log(response.data.retData);
          this.positionInfoList = response.data.retData;
          this.positionId = this.positionInfoList[0].positionId;
        }).catch(function (error) {
          console.log(error);
          alert("get请求失败");
        })
      }
    },
    created() {
      this.positionId = this.pid
    }
  }
</script>

<style scoped>

</style>
