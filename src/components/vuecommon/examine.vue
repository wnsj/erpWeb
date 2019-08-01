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
          examine:{},
          examineList: [] // 审查人集合
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
        showExamineInfo(val){
          this.examine = val
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
