<!-- author:dingdong -->
<!-- 审查人组件 -->
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
      props: ['examineAccount'],
      watch:{
        examineAccount:{
          handler(val){
            this.accountId = val
          },
          immediate: true
        },
        accountId:{
          handler(val){
            this.$emit('examineChange',val)
          },
          immediate: true
        }
      },
      methods: {
        changeAble(){ // 设置为禁用
          this.isAble = "disabled"
        },
        initParam(){  // 初始化参数
          this.isAble = false
          this.typeIds = []
          this.examineList = []
        },
        insertCheckInfo(val) {
          this.examineList.push({accountId:val[0], accountName:val[1]})
          this.accountId = val[0]
        },
        getTypeId(val){
          this.typeId = val
          if(this.typeId == 2 || this.typeId == 3){
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
            this.accountId = this.examineList[0].accountId;
          }).catch((error) => {
            console.log('请求失败处理')
          });
        }
      },
      updated() {
        this.accountId = this.examineAccount
      }
    }
</script>

<style scoped>

</style>
