<template>
  <select class="form-control" v-model.lazy="position" v-on:change="positionChange()">
    <option value="0">---请选择---</option>
    <option v-for="(item,index) in positionList" :key="index" v-bind:value="item.positionId">{{item.positionName}}</option>
  </select>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'position',
    data() {
      return {
        position:'0',
        positionList:[],
        positionName:'',
      };
    },
    props: ['positionId'],
    watch:{
      positionId:function(){
        console.log("监听props域positionId的值："+ this.positionId)
        if(this.positionId == null) {
          console.log("赋值为0")
          this.position = '0'
        }else{
          console.log("开始给position赋值")
          this.position = this.positionId
        }
        console.log("监听props域position的值："+ this.position)
      },
      position:function(val){
        this.$emit('positionChange',val,this.positionName)
        // console.log("监听data域position的值："+ val)
      }
    },
    methods:{
      //提交职位名称和ID
      positionChange: function() {
				
        this.positionName = this.exchangePositionName(this.position)
        // alert(this.positionId+this.positionName)
        // this.$emit('positionChange',this.positionId,this.positionName)
      },
      //添加前缀的部门名字兑换原来的名字
      exchangePositionName: function(param) {
        var res = {}

        for (var i = 0; i < this.positionList.length; i++) {
          res = this.positionList[i]
          if (res.positionId == param) {
            return res.positionName
          }
        }
      },
      // 获取所有项目
      getPosition: function() {
        var url = this.url + '/search/positionList'

        axios.get(url).then((response) => {
          this.positionList = response.data
        })
          .catch((error) => {
            console.log(error)
          });
      },
    },
    created() {
      this.getPosition()
    }
  }
</script>

<style>

</style>
