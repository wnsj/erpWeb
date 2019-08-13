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
        accountId: '',
        applyAccount: '',
        clickTime: 0,
        deptId: '',
        examine: {},
        examineList: [],
        isAble: false,
        positionIds: [],
        positionTypeId: '',
        round: 0,
        typeId: 0,
        type: '',
        typeIds: []
      }
    },
    props: ['examineAccount'],
    watch: {
      accountId: {
        handler(val) {
          this.$emit('examineChange', val)
        },
        immediate: true
      }
    },
    methods: {
      changeAble(){ // 设置为禁用
        this.isAble = "disabled"
      },
      initParam() {  // 初始化参数
        this.isAble = false
        this.typeIds = []
        this.examineList = []
        this.positionIds = []
        this.round = 0
        this.clickTime = 0
      },
      insertCheckInfo(val) {  // 向集合中插入审查人
        this.examineList.push({accountId: val[0], accountName: val[1]})
        this.accountId = val[0]
      },
      getTypeId(val) { // 获取初始职位级别
        this.typeId = val[0]
        console.log("职位级别" + this.typeId)
        if (this.typeId <= 3) {
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
      type3(id) {
        if (id <= 3) {
          this.positionTypeId = 4
        }
        if (id == 4) {
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
      type4(id) {
        if (id == 4) {
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
      setTypeId() {
        return this.positionTypeId
      },
      getDeptId(val) {
        this.deptId = val
      },
      setRound() {
        return this.round
      },
      initType5() {
        this.positionTypeId = ''
        this.typeIds = ''
        this.positionIds = ''
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
      // 查询审查人信息
      getExamineList: function () {
        if (this.typeIds.length == 0 && this.deptId == 0) {
          this.$parent.changeExamineAddAble()
        }
        if (this.deptId == 0) {
          this.round++
        }
        if (this.type == 6 && this.clickTime <= 2) {
          if (this.clickTime == 0) {
            this.deptId = null
            this.positionIds.push('74')
          }
          if (this.clickTime == 1) {
            this.deptId = null
            this.positionIds.push('33')
          }
          if (this.clickTime == 2) {
            this.deptId = null
            this.positionIds.push('34')
          }
        }
        if (this.type == 6 && this.clickTime > 2) {
          this.positionIds = []
        }
        console.log("部门" + this.deptId)
        console.log("职位级别" + this.typeIds)
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
        }).then(response => {
          console.log(response.data.retData)
          this.examineList = response.data.retData;
          let arr = [];
          for (let i = 0; i < this.examineList.length; i++) {
            arr.push(this.examineList[i].accountId)
          }
          if (this.examineList.length > 0) {
            for (let i = 0; i < this.examineList.length; i++) { // 排除申请人自己
              if (this.applyAccount == this.examineList[i].accountId) {
                this.examineList.splice(i, 1)
              }
            }
          }
          this.accountId = this.examineList[0].accountId;
        }).catch(err => {
          console.log(err)
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
