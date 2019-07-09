<template>
  <select class="form-control" v-model="leaveTypeLabel">
    <option v-for="(item,index) in leaveTypeList" :key="index" v-bind:value="item.label">{{item.label}}</option>
  </select>
</template>
<script>
  import axios from 'axios'
  export default {
    name:'leaveType',
    data() {
      return {
        leaveTypeLabel: '',
        leaveTypeList:[
          {label:'病假'},
          {label:'事假'},
          {label:'婚假'},
          {label:'产检'},
          {label:'产假'},
          {label:'哺乳假'},
          {label:'丧假'},
          {label:'倒休'},
          {label:'其他'}
        ]
      };
    },
    props: ['leaveTypeName'],
    watch:{
      leaveTypeName:function(){
        this.leaveTypeLabel = this.leaveTypeName
      },
      leaveTypeLabel:function(val){
        this.$emit('leaveTypeChange',val)
      }
    },
    methods:{
      
    }
  }
</script>

<style>

</style>
