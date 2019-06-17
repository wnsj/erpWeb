<template>
	<select class="form-control" v-model="postTypeId" v-on:change="postTypeChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in jobsType" :key="index" :value="item.positionType_ID">
			{{item.positionType_Name}}
		</option>
	</select>
</template>

<script>
	import axios from 'axios'

	export default {
		components: {

		},
		// props: {
		// 	postTypeId: {
		// 		default: 0
		// 	},
		// 	postTypeName: {
		// 		default: ''
		// 	},
		// },
		data(){
			return{
				pTypeId:'',
				pTypeName:'',
				jobsType:[],
				postTypeId:'0',
				postTypeName:''
			}
		},
		methods: {
			// 获取岗位类型信息
			getjobsType() {
				var url = this.url + "/kqParamSetContr/queryPositionType";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.jobsType = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			postTypeChange(postTypeId) {
				for (var i = 0; i < this.jobsType.length; i++) {
					if (postTypeId == this.jobsType[i].positionType_ID){
						  this.postTypeName = this.jobsType[i].positionType_Name;
						  return;
					}
				}
				this.$emit('postTypeChange', this.postTypeId, this.postTypeName);
			},
			setParam(postTypeId){
				this.postTypeId = postTypeId;
			}
		},
		created() {
			this.getjobsType();
		}
	}
</script>

<style>
</style>
