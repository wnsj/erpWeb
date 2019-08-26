<template>
	<!--家庭成员-->
	<div class="tab-pane fade" id="checkFamily">
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
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	export default {
		
		data() {
			return {
				personalFamily:[],
				
				
				
				familyInfo:{},
				modifyFIIndex:0,
				accountId:'',
			};
		},
		methods:{
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
