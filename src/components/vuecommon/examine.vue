<!-- author:dingdong -->
<!-- 审查人组件 -->
<template>
  <select class="form-control" v-model="accountId">
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
          positionId: '',
          positionTypeId: '',
          typeIds:[],
          deptIds: [],
          examine:{},
          examineList: [], // 审查人集合
          round: 0,
        }
      },
      props: ['examineAccount'],
      watch:{
        accountId:{
          handler(val){
            this.$emit('examineChange',val)
          },
          immediate: true
        }
      },
      methods: {
        initParam(){  // 初始化参数
          this.isAble = false
          this.typeIds = []
          this.examineList = []
          this.deptIds = []
        },
        insertCheckInfo(val) {
          this.examineList.push({accountId:val[0], accountName:val[1]})
          this.accountId = val[0]
        },
        getTypeId(val){
          this.typeId = val
          if(this.typeId <= 4){
            this.type4(this.typeId)
          }
          if(this.typeId == 5){
            this.type5(this.typeId)
          }
        },
        type4(id){
          if(id == 2 || id == 3){
            this.positionTypeId = 4
          }
          if(id == 4){
            this.positionTypeId = 5
          }
          if(id == 5){
            this.positionTypeId = 6
          }
          if(id == 6){
            this.positionTypeId = ''
            this.typeIds = ''
          }
          if(!this.isBlank(this.positionTypeId)){
            this.typeIds.push(this.positionTypeId);
          }
        },
        type5(id){
          if(id == 5){
            this.positionTypeId = 6
            this.typeIds.push(this.positionTypeId);
          }
          if(id == 6){
            this.positionId = '33'
          }
        },
        // type6(id){
        //   if(id == 6){
        //     this.positionTypeId = '74'
        //   }
        // },
        setTypeId(){
          return this.positionTypeId
        },
        getDeptId(val){
          this.deptId = val
        },
        setRound(){
          return this.round
        },
        showExamineInfo(val){
          this.examine = val
        },
        initTypes(){
          this.positionTypeId = ''
          this.typeIds = ''
        },
        // 查询审查人信息
        getExamineList: function () {
          if(this.typeIds.length == 0){ // 当职位为空时 开始传部门数组
            if(this.deptId == 0){
              this.deptIds = ''
              this.$parent.changeAddBtnAble()
            }else{
              this.deptIds.push(this.deptId)
            }
          }
          if(this.deptId == 0){
            this.round ++
          }
          // console.log("部门" + this.deptId)
          // console.log("职位数组" + this.typeIds)
          // console.log("部门" + this.deptIds)
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
              deptIds: this.deptIds,
              positionId: this.positionId
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData)
            this.examineList = response.data.retData;
            if(!this.isBlank(this.examine.accountId)){
              for(let i=0; i<this.examineList.length; i++){
                if(this.examine.accountId == this.examineList[i].accountId){  // 如果获取的审查人已存在集合中
                  this.accountId = this.examine.accountId;  // 默认显示获取的审查人
                  return false;
                }
              }
              this.examineList.push(this.examine);  // 如果获取的审查人不存在集合中 向集合中加入数据
              this.accountId = this.examine.accountId;  // 默认显示新增加的审查人
            }else{
              this.accountId = this.examineList[0].accountId;
            }
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
