<template>
  <select class="form-control" v-model="accountId" :disabled="isAble">
    <option v-for="(item,index) in examineList" :key="index" :value="item.accountId">{{item.accountName}}</option>
  </select>
</template>

<script>
    import axios from 'axios'

    export default {
      name: "examine",
      data() {
        return {
          isAble: false,
          accountId: '',
          deptId: '',
          typeId: 0,
          positionTypeId: '',
          typeIds:[],
          examineList: [] // 审查人集合
        }
      },
      methods: {
        changeAble(){ // 设置为禁用
          this.isAble = "disabled"
        },
        initAble(){ // 初始化为可用
          this.isAble = false
        },
        insertCheckInfo(val) {
          this.examineList.push({accountId:val[0], accountName:val[1]})
          this.accountId = val[0]
        },
        getTypeId(val){
          this.typeId = val
          if(this.typeId == 1 || this.typeId == 2){
            this.positionTypeId = 4
          }
          if(this.typeId == 4){
            this.positionTypeId = 5
          }
          if(this.typeId == 5){
            this.positionTypeId = 6
          }
          this.typeIds.push(this.positionTypeId);
        },
        setTypeId(){
          return this.positionTypeId
        },
        getDeptId(val){
          this.deptId = val
        },
        // 查询审查人信息
        getExamineList: function () {
          axios({
            method: 'post',
            url: this.url + '/leavePrepareController/queryCheckInfo',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              deptId: this.deptId,
              typeIds: this.typeIds
            },
            dataType: 'json',
          }).then((response) => {
            console.log(response.data.retData)
            this.examineList = (response.data.retData);
          }).catch((error) => {
            console.log('请求失败处理')
          });
        }
      },
    }
</script>

<style scoped>

</style>
