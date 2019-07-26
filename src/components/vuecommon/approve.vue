<!-- author:dingdong -->
<!-- 审核人组件 -->
<template>
  <select class="form-control" v-model="accountId" :disabled="isAble">
    <option v-for="(item,index) in approveList" :key="index" :value="item.accountId">{{item.accountName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "approve",
    data() {
      return {
        isAble: false,
        accountId: '',
        deptId: '',
        typeId: 0,
        positionTypeId: '',
        typeIds:[],
        approveList: [] // 审查人集合
      }
    },
    props: ['approveAccount'],
    watch:{
      approveAccount:{
        handler(val){
          this.accountId = val
        },
        immediate: true
      },
      accountId:{
        handler(val){
          this.$emit('approveChange',val)
        },
        immediate: true
      }
    },
    methods: {
      changeAble(){ // 设置为禁用
        this.isAble = "disabled"
      },
      initParam(){  // 初始化参数
        this.typeIds = []
        this.approveList = []
        this.isAble = false
      },
      insertCheckInfo(val) {
        this.approveList.push({accountId:val[0], accountName:val[1]})
        this.accountId = val[0]
      },
      getTypeId(val){
        this.typeId = val
        if(this.typeId == 2 || this.typeId == 3){
          this.positionTypeId = 5
        }
        if(this.typeId == 4){
          this.positionTypeId = 6
        }
        // if(this.typeId == 5){
        //   this.positionTypeId = 6
        // }
        this.typeIds.push(this.positionTypeId);
      },
      setTypeId(){
        return this.positionTypeId
      },
      getDeptId(val){
        this.deptId = val
      },
      // 查询审核人信息
      getApproveList: function () {
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
          this.approveList = (response.data.retData);
          this.accountId = this.approveList[0].accountId;
        }).catch((error) => {
          console.log('请求失败处理')
        });
      }
    },
    updated() {
      this.accountId = this.approveAccount
      console.log(this.approveAccount)
    }
  }
</script>

<style scoped>

</style>

