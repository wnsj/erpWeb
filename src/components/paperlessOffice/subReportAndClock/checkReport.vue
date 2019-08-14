<!-- author:dingdong -->
<!-- 审核人组件 -->
<template>
  <select class="form-control" v-model="accountId" :disabled="isAble">
    <option v-for="(item,index) in checkList" :key="index" :value="item.accountId">{{item.accountName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "check",
    data() {
      return {
        accountId: '',
        applyAccount: '',
        check:{},
        checkList: [], // 审查人集合
        clickTime: 0,
        deptId: '',
        isAble: false,
        positionTypeId: '',
        round: 0,
        typeId: 0,
        typeIds:[],
      }
    },
    props: ['checkAccount'],
    watch:{
      accountId:{
        handler(val){
          this.$emit('checkChange',val)
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
        this.checkList = []
        this.positionIds = []
        this.round = 0
        this.clickTime = 0
      },
      insertCheckInfo(val) {
        this.checkList.push({accountId:val[0], accountName:val[1]})
        this.accountId = val[0]
      },
      getTypeId(val) { // 获取初始职位级别
        this.typeId = val
        if (this.typeId <= 3) {
          this.type3(this.typeId)
        }
        if (this.typeId == 4) {
          this.type4(this.typeId)
        }
        if (this.typeId == 5) {
          this.type5(this.typeId)
        }
        if (this.typeId == 6) {
          this.type6(this.typeId)
        }
      },
      type3(id) {
        if (id <= 3) {
          this.positionTypeId = 5
        }
        if (id == 5) {
          this.positionTypeId = ''
          this.typeIds = ''
        }
        if (!this.isBlank(this.positionTypeId)) {
          this.typeIds.push(this.positionTypeId);
        }
      },
      type4(id) {
        if (id <= 4) {
          this.positionTypeId = 5
        }
        if (id == 5) {
          this.positionTypeId = 6
        }
        if (id == 6) {
          this.positionTypeId = ''
          this.typeIds = ''
        }
        if (!this.isBlank(this.positionTypeId)) {
          this.typeIds.push(this.positionTypeId);
        }
      },
      type5(id) {
        if (id == 5) {
          this.positionTypeId = 6
          this.typeIds.push(this.positionTypeId);
        }
        if (id == 6 && this.round == 1) {
          this.positionIds.push('33')
        }
      },
      type6(id) {
        this.type = id
      },
      setRound() {
        return this.round
      },
      setTypeId(){
        return this.positionTypeId
      },
      initType5() {
        this.positionTypeId = ''
        this.typeIds = ''
        this.positionIds = ''
      },
      getDeptId(val){
        this.deptId = val
      },
      showCheckInfo(val){
        this.check = val
      },
      getApplyAccount(val) {
        this.applyAccount = val
      },
      getClickTime(val) {
        this.clickTime = val
      },
      setClickTime() {
        return this.clickTime
      },
      // 查询审核人信息
      getCheckList: function () {
        if (this.typeIds.length == 0 && this.deptId == 0) {
          this.$parent.changeCheckAddAble()
        }
        if (this.deptId == 0) {
          this.round++
        }
        if (this.type == 6 && this.clickTime <= 1) {
          if(this.clickTime ==0){
            this.deptId = null
            this.positionIds.push('33')
          }
          if(this.clickTime ==1){
            this.deptId = null
            this.positionIds.push('34')
          }
        }
        if (this.type == 6 && this.clickTime > 1) {
          this.positionIds = []
        }
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryCheckInfo',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptId,
            typeIds: this.typeIds,
            positionIds: this.positionIds
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
          this.checkList = response.data.retData;
          let arr = [];
          for (let i = 0; i < this.checkList.length; i++) {
            arr.push(this.checkList[i].accountId)
          }
          if (this.checkList.length > 0) {
            for (let i = 0; i < this.checkList.length; i++) { // 排除申请人自己
              if (this.applyAccount == this.checkList[i].accountId) {
                this.checkList.splice(i, 1)
              }
            }
          }
          this.accountId = this.checkList[0].accountId;
        }).catch((error) => {
          console.log('请求失败处理')
        });
      }
    },
    updated() {
      this.accountId = this.checkAccount
    }
  }
</script>

<style scoped>

</style>

