<!-- author:dingdong -->
<!-- 对接人信息 -->
<template>
  <select class="form-control" v-model="handId">
    <option v-for="hand in handInfoList" :value="hand.handId">{{hand.handName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "handInfo",
    data(){
      return {
        handId: '',
        handInfoList: []
      }
    },
    props: ['hid'],
    watch:{
      handId:{
        handler(newVal){
          this.handId = newVal
          this.$emit('handChange',[newVal, this.getHandName(newVal)])
        },
        immediate: true
      },
    },
    methods:{
      setHandId(val){
        this.handId = val
      },
      getHandName(handId) {
        for (let i = 0; i < this.handInfoList.length; i++) {
          const handInfo = this.handInfoList[i]
          if (handInfo.handId == handId) {
            return handInfo.handName
          }
        }
      },
      getHandInfo:function () {
        const url = this.url + '/computerController/queryHandInfo'
        axios.get(url).then((response) =>{
          console.log(response.data.retData);
          this.handInfoList = response.data.retData;
        }).catch(function (error) {
          console.log(error);
          alert("get请求失败");
        })
      },
    },
    created() {
      this.getHandInfo()
      this.handId = this.hid
    }
  }
</script>

<style scoped>

</style>

