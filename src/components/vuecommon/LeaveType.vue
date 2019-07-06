<template>
  <select class="form-control" v-model="typeId"  v-on:change="leaveTypeChange">
    <option v-for="(item,index) in leaveTypeList" :key="index" v-bind:value="item.value">{{item.label}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'leaveType',
    data() {
      return {
        typeId: '',
        leaveTypeName:'',
        leaveTypeList:[
          {value:'',label:'---请选择---'},
          {value:'1',label:'病假'},
					{value:'2',label:'事假'},
          {value:'3',label:'婚假'},
          {value:'4',label:'产检'},
          {value:'5',label:'产假'},
          {value:'6',label:'哺乳假'},
          {value:'7',label:'丧假'},
          {value:'8',label:'倒休'},
          {value:'9',label:'其他'},
        ]
      };
    },
    props: ['leaveTypeId'],
    watch:{
      leaveTypeId:function(){
        this.typeId = this.leaveTypeId
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
      }
    }
  }
</script>

<style>

</style>
