<template>
	<!--调动记录-->
	<div class="tab-pane fade" id="updatarecord">
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
				<tr>
					<td>成都运营</td>
					<td>外推</td>
					<td>成都运营</td>
					<td>竞价</td>
					<td></td>
					<td>2018-12-1</td>
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
					console.log(response.data)
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
		}
		
	}
</script>

<style>

</style>
