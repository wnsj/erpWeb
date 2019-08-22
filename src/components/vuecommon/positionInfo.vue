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
    data() {
      return {
        positionId: '0',
        positionInfoList: [],
      }
    },
    props: ['pid'],
    watch: {
      positionId: {
        handler(newVal) {
          this.$emit('jobChange', newVal)
        },
        immediate: true
      },
    },
    methods: {
      setPositionId(val) {
        this.positionId = val
      },
      getPositionInfo() {
        let url = this.url + '/computerController/queryPositionInfo'
        axios.get(url).then((response) => {
          console.log(response.data.retData);
          this.positionInfoList = response.data.retData;
          console.log("职位id" + this.positionId)
          if (this.positionId == '0') {
            this.positionInfoList.splice(0, 0, {positionId: '0', positionName: '全部'})
          }
        }).catch(function (error) {
          console.log(error);
          alert("get请求失败");
        })
      }
    },
    created() {
      this.getPositionInfo()
    },
    updated() {
      this.positionId = this.pid
    }
  }
</script>

<style scoped>

</style>
