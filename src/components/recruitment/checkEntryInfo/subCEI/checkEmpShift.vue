<template>
	<!--调动记录-->
	<div class="tab-pane fade" id="checkRecord">
		<table class="table table-bordered table-responsive">
			<thead>
				<tr>
					<th>原部门</th>
					<th>原职位</th>
					<th>现部门</th>
					<th>现职位</th>
					<th>调动类型</th>
					<th>调动日期</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in shiftList" :key="index">
					<td>{{item.oldDepartmentName}}</td>
					<td>{{item.oldPositionName}}</td>
					<td>{{item.newDepartmentName}}</td>
					<td>{{item.newPositionName}}</td>
					<td>{{item.flag}}</td>
					<td>{{item.upDateTime}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				shiftList:[],//换岗列表
			};
		},
		methods:{
			childrenShiftInfo:function(accountId,userId){
				this.postionShift(accountId)
			},
			postionShift:function(param){
				var uPositionUrl = this.url + '/search/positionShifts'
				//职位调动信息
				axios({
					method: 'post',
					url: uPositionUrl,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountId: param,
					},
					dataType: 'json',
				}).then((response) => {
					console.log()
					var res = response.data
					console.log('response:'+res.resData+'param'+param)
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							this.shiftList = res.resData
						} 
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
		}
		
	}
</script>

<style>

</style>
