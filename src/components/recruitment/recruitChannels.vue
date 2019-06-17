<template>
	<div class="container user-container" id="recruitchannels-app" v-cloak>
	    <div class="row">
	        <div class="col-md-12 col-lg-12 main-title">
	            <h2>招聘渠道管理</h2>
	        </div>
	    </div>
	    
		<div class="container user-container">
			<button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#addInfo">新增</button>
		</div>
	
		
	    <div class="row">
	        <div class="col-md-12 col-lg-12">
	            <div class="table-responsive">
	                <table class="table table-bordered table-hover user-table" id="datatable">
	                    <thead>
	                        <tr>
	                            <th class="text-center">序号</th>
	                            <th class="text-center">名称</th>
	                            <th class="text-center">修改</th>
	                            <th class="text-center">删除</th>
	                        </tr>
	                    </thead>
	                    <tbody>
							<tr v-for="(item,index) in recruitmentChannelsList" :key="index">
								<td>{{index+1}}</td>
								<td>{{item.recruitChannelName}}</td>
								<td><button type="button" class="btn btn-primary col-md-offset-5" data-toggle="modal" data-target="#changeInfo" @click="getRecruitChannelInfo(item)">修改</button></td>
								<td><button type="button" class="btn btn-danger col-md-offset-5" data-toggle="modal" data-target="#deleteInfo" @click="getRecruitChannelInfo(item)">删除</button></td>
							</tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	    </div>
	    
		
		
		<!---模态对话框-->
		<!-- 新增 -->
		<div role="dialog" class="modal"  id="addInfo" >
		    <div class="modal-dialog" >
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal">
		                    <span>×</span>
		                </button>
						<h4 class="modal-title">编辑招聘渠道</h4>
		            </div>
		            <div class="modal-body" >
						<div class="form-group clearfix"><label for="channles" class="col-md-2 control-label text-right">招聘渠道：</label>
					 <div class="col-md-5"><input type="text" id="channles" class="form-control" v-model="newRecruitmentChannels"></div></div>
						
		                <button class="btn btn-primary col-md-offset-4 " data-dismiss="modal">返回</button>
		                <button class="btn btn-danger col-md-offset-1" data-dismiss="modal"  @click="addChannelsInfo">确认</button>
		            </div>
		        </div>
		    </div>
		</div>
		<!-- 编辑 -->
		<div role="dialog" class="modal"  id="changeInfo" >
		    <div class="modal-dialog" >
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal">
		                    <span>×</span>
		                </button>
		        		<h4 class="modal-title">编辑招聘渠道</h4>
		            </div>
		            <div class="modal-body" >
		        		<div class="form-group clearfix"><label for="channles" class="col-md-2 control-label text-right">招聘渠道：</label>
		        	 <div class="col-md-5"><input type="text" id="channles" class="form-control" v-model="recruitmentChannelsName"></div></div>
		        		
		                <button class="btn btn-primary col-md-offset-4" data-dismiss="modal">返回</button>
		                <button class="btn btn-danger col-md-offset-1" data-dismiss="modal" @click="changeChannelsInfo">确认</button>
		            </div>
		        </div>
		    </div>
		</div>
		<!-- 删除 -->
		<div role="dialog" class="modal"  id="deleteInfo" >
		    <div class="modal-dialog" >
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal">
		                    <span>×</span>
		                </button>
		                <h4 class="modal-title">确认要删除此行数据吗？</h4>
		            </div>
		            <div class="modal-body" >
		                <button class="btn btn-primary col-md-offset-4" data-dismiss="modal">返回</button>
		               <button class="btn btn-danger col-md-offset-1" data-dismiss="modal" @click="deleteChannelsInfo">确认</button>
		            </div>
		        </div>
		    </div>
		</div>
	

	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		
		data(){
			return{
				recruitmentChannelsList:[],
				recruitmentChannelsId:'',
				recruitmentChannelsName:'',
				newRecruitmentChannels:'',
			}
		},
		
		methods: {
			//获取招聘渠道
			getChannelsList() {
				axios({
					method: 'post',
					url:this.url+'/zpglController/queryRecruitChannel',
					dataType:'json',
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.recruitmentChannelsList = response.data.retData
					} else {
						alert(response.data.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			
			//新增招聘渠道信息 
			addChannelsInfo(){
				if (this.newRecruitmentChannels=='') {
					alert('信息不能为空');
					return false;
				}
				axios({
					method: 'post',
					url:this.url+'/zpglController/addRecruitChannel',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						recruitChannelName:this.newRecruitmentChannels
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.getChannelsList()
				}).catch((error) => {
					console.log('请求失败处理')
				});
			
				this.newRecruitmentChannels = ''
			},
			
			//点击获取整条信息
			getRecruitChannelInfo(item){
				this.recruitmentChannelsId = item.recruitChannelId,
				this.recruitmentChannelsName = item.recruitChannelName,
				console.log(this.recruitmentChannelsId);
				console.log(this.recruitmentChannelsName);
			},
			
			//修改该条招聘渠道信息 
			changeChannelsInfo(item){
				if (this.recruitmentChannelsName=='') {
					alert('职位名称不能为空');
					return false;
				}
				axios({
					method: 'post',
					url:this.url+'/zpglController/updateRecruitChannel',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						recruitChannelId:this.recruitmentChannelsId,
						recruitChannelName:this.recruitmentChannelsName,
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.getChannelsList()
				}).catch((error) => {
					console.log('请求失败处理')
				});
				
				this.recruitmentChannelsName = ''
				this.recruitmentChannelsId = ''
			},
			
			//删除某一条招聘渠道信息 
			deleteChannelsInfo(){
				axios({
					method: 'post',
					url:this.url+'/zpglController/deleteRecruitChannel',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						id:this.recruitmentChannelsId,
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.getChannelsList()
				}).catch((error) => {
					console.log('请求失败处理')
				});
				this.recruitmentChannelsId = ''
			},
			
		},
		
		created() {
			this.getChannelsList()
		}
	}
	
	
</script>

<style>
.user-container {background-color: #fff;width: 100%;padding: 10px 20px;}
.user-btn-group {text-align: right;padding: 15px 15px;}
.user-btn-group>button {margin: 0 2px;}
.form-group{line-height: 30px;}
.form-group>label{padding: 0;}
</style>
