<template>

	<div class='col-sm-8'>
		testFnction类
		<button v-on:click="testFnction()">testFnction</button>
	</div>

</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	import {moment} from 'moment'
	
	export default {
		data() {
			return {
				checkEmpList:[],
				isValue:true,
			}
		},
		methods: {
			userAllInfo:function() {
				return {
					'id':0,
					'name':'muwenliang',
					'position':'java组长',
					'depart':'公共事业部'
				}
			},
			testFnction:function(){
				alert('1')
				this.getProject()
				alert('2')
				if(this.isValue==true){
					alert('isvalue:'+this.isValue)
				}else{
					alert('isvalue:'+this.isValue)
				}
			},
			// 获取所有项目
			getProject: function() {
				var url = this.url + '/search/projectList'
			
				axios.get(url).then((response) => {
						this.projectList = response.data
						this.isValue=false
						console.log(response.data)
					})
					.catch((error) => {
						console.log(error)
					});
			},

		},
	}
</script>

<style>

</style>
