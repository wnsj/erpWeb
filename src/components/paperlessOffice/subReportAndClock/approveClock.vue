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
        accountId: '',
        applyAccount: '',
        approve:{},
        approveList: [],
        clickTime: 0,
        deptId: '',
        flag: '',
        isAble: false,
        positionIds: [],
        positionTypeId: '',
        round: 0,
        typeId: 0,
        type: '',
        typeIds:[]
      }
    },
    props: ['approveAccount'],
    watch:{
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
        this.positionIds = []
        this.round = 0
        this.clickTime = 0
      },
      insertCheckInfo(val) {
        this.approveList.push({accountId:val[0], accountName:val[1]})
        this.accountId = val[0]
      },
      getTypeId(val){
        this.typeId = val
        if (this.typeId <= 3) { // 当职位 <= 3
          this.type3(this.typeId)
        }
        if (this.typeId == 4) { // 当职位 = 4
          this.type4(this.typeId)
        }
        if (this.typeId == 5) { // 当职位 = 5
          this.type5(this.typeId)
        }
        if (this.typeId == 6) { // 当职位 = 6
          this.type6(this.typeId)
        }
      },
      type3(id){
        if (id <= 3) {
          this.positionTypeId =5
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
        if (id == 4) {
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
        this.type = id
      },
      type6(id) {
        this.type = id
      },
      setTypeId(){
        return this.positionTypeId
      },
      getDeptId(val){
        this.deptId = val
      },
      setRound() {
        return this.round
      },
      showApproveInfo(val){
        this.approve = val
      },
      initType5() {
        this.typeIds = ''
        this.positionIds = []
        this.round ++
      },
      getApplyAccount(val){
        this.applyAccount = val
      },
      getClickTime(val) {
        this.clickTime = val
      },
      getFlag(val) {
        this.flag = val
      },
      // 查询审核人信息
      getApproveList: function () {
        if (this.typeIds.length == 0 && this.deptId == 0 && this.flag == 1) {
          this.$parent.changeApproveAddAble()
          this.$parent.changeApproveModifyAble()
        }
        if (this.deptId == 0) {
          this.round++
        }
        if (this.type == 5 || this.type == 6) {
          if(this.round == 0){
            this.deptId = ''
            this.positionIds.push('33')
            this.round ++
          }
        }
        console.log("轮数" + this.round)
        console.log("部门" + this.deptId)
        console.log("type" + this.type)
        console.log("职位" + this.typeIds)
        console.log("岗位" + this.positionIds)
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
          this.approveList = (response.data.retData);
          let arr = [];
          for (let i = 0; i < this.approveList.length; i++) {
            arr.push(this.approveList[i].accountId)
          }
          if (this.approveList.length > 0) {
            for (let i = 0; i < this.approveList.length; i++) { // 排除申请人自己
              if (this.applyAccount == this.approveList[i].accountId) {
                this.approveList.splice(i, 1)
              }
            }
          }
          this.accountId = this.approveList[0].accountId;
          //------------------------------------------修改时-----------------------------------------
          if (!this.isBlank(this.approve.accountId)) {  // 有批准人才执行
            if (this.clickTime == 0) {  // 第一次加载
              if(arr.indexOf(this.approve.accountId) == -1){
                this.approveList.push(this.approve);  // 如果获取的批准人不存在集合中 向集合中加入数据
                this.accountId = this.approve.accountId;  // 默认显示新增加的审查人
              }
            } else {  // 不是首次加载 显示第一项
              this.accountId = this.approveList[0].accountId;
            }
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      }
    },
    updated() {
      this.accountId = this.approveAccount
    }
  }
</script>

<style scoped>

</style>

