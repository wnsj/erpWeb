<template>

	<!-- 家庭管理 -->

	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title">家庭成员</h4>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-md-12">
					<div class="col-md-3">
						<div class="form-group">
							<label for="ygname" class="col-md-3 control-label nopad">员工姓名</label>
							<div class="col-md-9">
								<input type="text" class="form-control" v-model.lazy.trim="familyChild" placeholder="输入工号,姓名查询...">
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label for="ygname" class="col-md-3 control-label nopad">成员姓名</label>
							<div class="col-md-9">
								<input type="text" class="form-control" v-model.lazy="familyName" placeholder="">
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label for="date" class="col-md-3 control-label nopad">生日月份</label>
							<div class="col-md-9">
								<select class="form-control" id="date" v-model="familybirthday">
									<option value="0">全部</option>
									<option v-for="n in 12" v-bind:value="n">{{n}}月</option>
								</select>
							</div>
						</div>
					</div>
					<div class="col-md-2 col-md-offset-1">
						<button type="button" class="btn btn-primary" v-on:click="getFamilyAll()">查询</button>
						<button type="button" class="btn btn-primary" @click="exportTableToExcel('datatable','家庭成员表')">导出</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 table-responsive text-center martop">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th class="text-center">工号</th>
								<th class="text-center">员工姓名</th>
								<th class="text-center">称谓</th>
								<th class="text-center">成员姓名</th>
								<th class="text-center">出生日期</th>
								<th class="text-center">工作单位</th>
								<th class="text-center">职务</th>
								<th class="text-center">电话</th>
								<th class="text-center">微信</th>
								<th class="text-center">家庭住址</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in familyList" :key="index">
								<td>{{item.jobnum}}</td>
								<td>{{item.name}}</td>
								<td>{{item.appellation}}</td>
								<td>{{item.chname}}</td>
								<td>{{item.birth}}</td>
								<td>{{item.workaddress}}</td>
								<td>{{item.position}}</td>
								<td>{{item.phone}}</td>
								<td>{{item.wechat}}</td>
								<td>{{item.famAddress}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="modal-footer"></div>
	</div>

</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				familyChild:'',
				familyName:'',
				famAddress:'',
				familybirthday:'',
				familyList:[],
			};
		},
		methods:{
			
			cleanData:function(){
				this.familyChild=''
				this.familyName=''
				this.familybirthday='0'
			},
			// 获取所有员工的家庭成员信息
			getFamilyAll: function() {
				console.log('getFamilyAll+param'+this.familyChild+this.familyName+this.familybirthday)
				var url = this.url + '/search/fmList'
				this.familyList=[]
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						chname: this.familyName,
						name: this.familyChild,
						jobnum:this.familyChild,
						birth: this.familybirthday,
					},
					dataType: 'json',
				}).then((response) => {
					console.log('getFamilyAll')
					var res=response.data
					if(res.retCode=='0000'){
						// alert(res.resData.length)
						if(res.resData.length>0){
							this.familyList = res.resData
							console.log(this.familyList)
							$("#myModalQuery").modal('hide');
						}else{
							alert('没有查询到家庭成员相关数据')
						}
					}else{
						alert(res.retMsg)
					}
					
					
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
		},
		created() {
			this.getFamilyAll()
		}
	}
</script>

<style>

</style>
