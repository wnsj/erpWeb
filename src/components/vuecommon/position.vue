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
			
      exchangePositionName: function(param) {
        var res = {}

        for (var i = 0; i < this.positionList.length; i++) {
          res = this.positionList[i]
          if (res.positionId == param) {
            return res.positionName
          }
        }
      },
			setPosition:function(param){
				this.position=param
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
			//岗位随部门ID联动
			departLinkChange(departId) {
					alert('departLinkChange'+departId)
				var url = this.url + "/kqParamSetContr/queryDepartmentPosition";
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data: {
							deptId: departId
						},
						dataType: "json"
					})
					.then(response => {
						if (response.data.retCode == "0000") {
							this.positionList = response.data.retData
						} else {
							console.log(response.data);
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
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
