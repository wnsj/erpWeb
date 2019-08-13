<template>
	<!--家庭成员-->
	<div class="tab-pane fade" id="updatafamily">
		<div class="col-md-2 col-md-offset-10 clearfix martop pos_a">
			<button type="button" class="btn btn-warning" data-toggle="modal" v-on:click="popupFamilyInfo()">添加</button>
		</div>
		<div class="col-md-12 clearfix nopad addbord martop mt50">
			<table class="table table-bordered table-responsive" id="addTable">
				<thead>
					<tr>
						<th>称谓</th>
						<th>姓名</th>
						<th>出生日期</th>
						<th>工作单位</th>
						<th>职务</th>
						<th>电话</th>
						<th>微信</th>
						<th>住址</th>
						<th>修改</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in personalFamily" :key="index">
						<td>{{item.appellation}}</td>
						<td>{{item.chname}}</td>
						<td>{{item.birth}}</td>
						<td>{{item.workadress}}</td>
						<td>{{item.position}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.wechat}}</td>
						<td>{{item.famAddress}}</td>
						<td><button type="button" class="btn btn-warning" v-on:click="modifyFamilyInfo(item,index)">修改</button></td>
						<td><button type="button" class="btn btn-warning" @click="cancelRFInfo(index)">删除</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<modifyFEmp ref='modifyFEmp' @submitFamilyInfo='popbackFamilyInfo'></modifyFEmp>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import modifyFEmp from '../subModifyEE/subMes/modifyFamilyEmp.vue'
	export default {
		components:{modifyFEmp},
		
		data() {
			return {
				personalFamily:[],
				
				
				
				familyInfo:{},
				modifyFIIndex:0,
				accountId:'',
			};
		},
		methods:{
			
			//添加家庭成员
			popupFamilyInfo:function(){
				this.familyInfo = {}
				this.familyInfo.type='add'
				this.$refs.modifyFEmp.childrenFEmpInfo(this.familyInfo)
				$("#updatefamily_modify").modal('show')
			},
			popbackFamilyInfo:function(familyInfo){
				
				$("#updatefamily_modify").modal('hide')
				this.familyInfo.uAccountId = this.accountId
				// alert(this.personalFamily.length)
				if(this.familyInfo.type=='modify'){
					this.modifyRFInfo(this.modifyFIIndex)
					
					this.personalFamily.push(familyInfo)
				}
				if(this.familyInfo.type=='add'){
					this.personalFamily.push(familyInfo)
				}
			},
			//修改家庭成员
			modifyFamilyInfo:function(item,index){
				this.familyInfo = {}
				this.familyInfo=Object.assign({},item)
				this.modifyFIIndex = index
				this.familyInfo.type='modify'
				this.$refs.modifyFEmp.childrenFEmpInfo(this.familyInfo)
				$("#updatefamily_modify").modal('show')
			},
			//修改家庭信息
			modifyRFInfo:function(index){
				this.personalFamily.splice(index, 1)
			},
			//删除家庭成员
			cancelRFInfo:function(index){
				if(!confirm('确定删除')){
					return
				}
				var ufmUrl = this.url + '/search/deletFamilyInfo'
				
				//家庭信息
				axios({
					method: 'post',
					url: ufmUrl,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.personalFamily[index],
					dataType: 'json',
				}).then((response) => {
					console.log('personalFamily')
					if (response.data.retCode == '0000') {
						this.personalFamily.splice(index, 1)
						alert('删除成功')
					} else {
						alert(response.data.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
				
			},			
			//账户Id
			childrenFamilyInfo:function(accountId,userId){
				
				this.accountId=accountId
				this.getEmpFamilyInfo(accountId)
			},
			// 获取家庭信息
			getEmpFamilyInfo: function(param) {
				
				this.familyInfo.accountId = param
				
				var ufmUrl = this.url + '/search/singlefamilyList'
				
				//家庭信息
				axios({
					method: 'post',
					url: ufmUrl,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						uAccountId: param,
					},
					dataType: 'json',
				}).then((response) => {
					console.log('personalFamily')
					if (response.data.retCode == '0000') {
						this.personalFamily = response.data.resData
					} else {
						alert(response.data.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
		},
		
		
	}
</script>

<style>

</style>
