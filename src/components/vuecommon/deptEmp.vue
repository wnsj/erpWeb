<template>
  <select class="form-control" v-model="empId"  v-on:change="deptEmpChange">
    <option value="0">---请选择---</option>
    <option v-for="(item,index) in deptEmpList" :key="index" v-bind:value="item.id">{{item.name}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'deptEmp',
    data() {
      return {
        empId: '0',
        deptId: '',
        empName:'',
        deptEmpList:[],
      };
    },
    props: ['deptEmpId'],
    watch:{
      deptEmpId:function(){
        if(this.deptEmpId == null) {
          this.empId = '0'
        }else{
          this.empId = this.deptEmpId
        }
      },
      empId:function(val){
        this.$emit('deptEmpChange',val,this.empName)
      }
    },
    methods:{
      deptEmpChange: function(event) {
        this.empName = this.exchangeDeptEmpName(this.empId)
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
      // 查询假期类型信息
      getDeptEmp: function() {
        var url = this.url + '/search/selectDeptEmpByDept'
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
