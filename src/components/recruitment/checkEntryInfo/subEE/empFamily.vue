<template>
	<div class="tab-pane fade" id="cFamily">
		<div class="col-md-2 col-md-offset-10 clearfix martop pos_a">
			<button type="button" class="btn btn-warning" data-toggle="modal" v-on:click="popupFamilyInfo()">入职添加</button>
		</div>
		<div class="col-md-12 clearfix nopad addbord martop addtable mt50">
			<table class="table table-bordered table-responsive">
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
						<td>{{item.workAdress}}</td>
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
		<familyEmp ref='fEmp' @submitFamilyInfo='popbackFamilyInfo'></familyEmp>
	</div>
	
</template>

<script>
	import familyEmp from '../subEE/addEmpFamily.vue'
	export default {
		components:{familyEmp},
		
		data() {
			return {
				personalFamily:[],
				
				
				
				familyInfo:{},
				modifyFIIndex:0,
			};
		},
		methods:{
			//清空数据
			cleanData:function(){
				this.personalFamily=[]
			},
			//添加家庭成员
			popupFamilyInfo:function(){
				console.log('popupFamilyInfo')
				this.familyInfo = {}
				this.familyInfo.type='add'
				this.$refs.fEmp.childrenFEmpInfo(this.familyInfo)
				$("#familyAdd").modal('show')
			},
			popbackFamilyInfo:function(familyInfo){
				console.log('popbackFamilyInfo')
				$("#familyAdd").modal('hide')
				
				if(this.familyInfo.type=='modify'){
					this.cancelRFInfo(this.modifyFIIndex)
					
					this.personalFamily.push(familyInfo)
				}
				if(this.familyInfo.type=='add'){
					console.log('familyInfo'+this.familyInfo.type)
					this.personalFamily.push(familyInfo)
				}
			},
			//修改家庭成员
			modifyFamilyInfo:function(item,index){
				console.log('modifyFamilyInfo')
				this.familyInfo = {}
				this.familyInfo=Object.assign({},item)
				this.modifyFIIndex = index
				this.familyInfo.type='modify'
				this.$refs.fEmp.childrenFEmpInfo(this.familyInfo)
				$("#familyAdd").modal('show')
			},
			//删除家庭成员
			cancelRFInfo:function(index){
				console.log('cancelRFInfo')
				this.personalFamily.splice(index, 1)
			},			
			
			childrenFamilyInfo:function(param){
				this.getEmpFamilyInfo(param)
			},
		}
	}
</script>

<style>

</style>
