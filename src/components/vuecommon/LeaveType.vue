<template>
  <select class="form-control" v-model="typeId"  v-on:change="leaveTypeChange">
    <option value="0">---请选择---</option>
    <option v-for="(item,index) in leaveTypeList" :key="index" v-bind:value="item.id">{{item.name}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'leaveType',
    data() {
      return {
        typeId: '0',
        leaveTypeName:'',
        leaveTypeList:[]
      };
    },
    props: ['leaveTypeId'],
    watch:{
      leaveTypeId:function(){
        if(this.leaveTypeId == null) {
          this.typeId = '0'
        }else{
          this.typeId = this.leaveTypeId
        }
      },
      typeId:function(val){
        this.$emit('leaveTypeChange',val,this.leaveTypeName)
      }
    },
    methods:{
      // 提交渠道名称和ID
      leaveTypeChange: function(event) {
        this.leaveTypeName = this.exchangeLeaveTypeName(this.typeId)
      },
      // 添加前缀的渠道名字兑换原来的名字
      exchangeLeaveTypeName: function(param) {
        var res = {}
        for (var i = 0; i < this.leaveTypeList.length; i++) {
          res = this.leaveTypeList[i]
          if (res.id == param) {
            return res.name
          }
        }
      },
      // 查询假期类型信息
      getLeaveType: function() {
        var url = this.url + '/kqParamSetContr/queryVacation'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
          },
          dataType: 'json',
        }).then((response) => {
          this.leaveTypeList = response.data.retData;
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
    },
    created() {
      this.getLeaveType();
    }
  }
</script>

<style>

</style>
