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
        isAble: false,
        accountId: '',
        deptId: '',
        typeId: 0,
        positionTypeId: '',
        typeIds:[],
        check:{},
        checkList: [], // 审查人集合
        days: 0,
        flag: '',
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
        this.typeIds = []
        this.checkList = []
        this.isAble = false
      },
      insertCheckInfo(val) {
        this.checkList.push({accountId:val[0], accountName:val[1]})
        this.accountId = val[0]
      },
      getTypeId(val) { // 获取初始职位级别
        this.typeId = val[0]
        this.days = val[1]
        if(this.days < 3){
          if (this.typeId <= 3) {
            this.type3(this.typeId)
          }
          // if (this.typeId == 4) {
          //   this.type4(this.typeId)
          // }
          // if (this.typeId == 5) {
          //   this.type5(this.typeId)
          // }
          // if (this.typeId == 6) {
          //   this.type6(this.typeId)
          // }
        }
        // if(this.days >= 3){
        //   if (this.typeId <= 3) {
        //     this.type3MoreThan3(this.typeId)
        //   }
        //   if (this.typeId == 4) {
        //     this.type4MoreThan3(this.typeId)
        //   }
        //   if (this.typeId == 5) {
        //     this.type5MoreThan3(this.typeId)
        //   }
        //   if (this.typeId == 6) {
        //     this.type6MoreThan3(this.typeId)
        //   }
        // }
      },
      type3(id) {
        if (id <= 3) {
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
      // type4(id) {},
      // type5(id) {},
      // type6(id) {},
      // type3MoreThan3(id){
      //
      // },
      // type4MoreThan3(id){
      //
      // },
      // type5MoreThan3(id){
      //
      // },
      // type6MoreThan3(id){
      //
      // },
      setTypeId(){
        return this.positionTypeId
      },
      getDeptId(val){
        this.deptId = val
      },
      showCheckInfo(val){
        this.check = val
      },
      // 查询审核人信息
      getCheckList: function () {
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
          this.checkList = (response.data.retData);
          if(!this.isBlank(this.check.accountId)){
            for(let i=0; i<this.checkList.length; i++){
              if(this.check.accountId == this.checkList[i].accountId){  // 如果获取的审查人已存在集合中
                this.accountId = this.check.accountId;  // 默认显示获取的审查人
                return false;
              }
            }
            this.checkList.push(this.check);  // 如果获取的审查人不存在集合中 向集合中加入数据
            this.accountId = this.check.accountId;  // 默认显示新增加的审查人
          }else{
            this.accountId = this.checkList[0].accountId;
          }
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

