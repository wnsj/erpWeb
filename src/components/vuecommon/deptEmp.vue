<template>
  <select class="form-control" v-model="empAccountId"  v-on:change="deptEmpChange">
    <option value="">---请选择---</option>
    <option v-for="(item,index) in deptEmpList" :key="index" v-bind:value="item.account">{{item.name}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'deptEmp',
    data() {
      return {
        empAccountId: '',
        deptId: '',
        empName:'',
        deptEmpList:[],
      };
    },
    props: ['deptEmpId'],
    watch:{
      deptEmpId:function(){
          this.empAccountId = this.deptEmpId
      },
      empAccountId:function(val){
        this.$emit('deptEmpChange',val,this.empName)
      }
    },
    methods:{
      deptEmpChange: function(event) {
        this.empName = this.exchangeDeptEmpName(this.empAccountId)
      },
      exchangeDeptEmpName: function(param) {
        var res = {}
        for (var i = 0; i < this.deptEmpList.length; i++) {
          res = this.deptEmpList[i]
          if (res.id == param) {
            return res.name
          }
        }
      },
      getDeptId(val){
        this.deptId = val;
        console.log("val:"+val);
        this.getDeptEmp();
      },
      // 查询部门下的员工信息
      getDeptEmp: function() {
        var url = this.url + '/wzbgController/queryEmpInfoByDept'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            departmentId: this.deptId  == 0 ? '' : this.deptId
          },
          dataType: 'json',
        }).then((response) => {
          this.deptEmpList = response.data.retData;
          console.log(this.deptEmpList)
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
    },
    created() {
      this.getDeptEmp()
    }
  }
</script>

<style>

</style>
