<template>

	<!-- <div class="m-5">
		<div class="uploadBox">
			<h3>上传文件</h3>
			<div class="fileBox">
				<input type="file" id="myFile" class="inputfile" @change="handlerUpload($event)">
				<label for="myFile">
					<i class="iconfont">&#xe632;</i>点击上传本地文件
				</label>
				<button v-on:click="downLaod()">下载文件</button>
			</div>
			<ul class="files">
				<li v-for="(file, index) in files">
					<div class="fileInfo">

						<div class="fileName filePart">
							{{ file.name }}
						</div>
						<div class="fileSize filePart ml10">
							{{file.size}}
						</div>
						
						<div class="progress">
							<span :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2?'':'red'}"></span>
						</div>
						<div class="fileStatus">
							<span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传或者删除</span>
							<span v-if="file.uploadStatus == 2" class="uploadSuccess"> 已上传</span>
							<span v-if="file.uploadStatus == 1" class="uploadSuccess"> 上传中...</span>
							<span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件类型不符合要求</span>
							<span v-if="file.uploadStatus == -3" class="uploadFail">出错啦，文件大小超出限制</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	</div> -->
	<div>
		
		<input list="students">
		<datalist id="students">
			<option value="student1"></option>
		</datalist>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	import {
		moment
	} from 'moment'

	export default {
		data() {
			return {
				files: [],
				uploadSuccess: 0
			}
		},
		methods: {}
	}
</script>

<style>

</style>
<!-- accountInfo:{"permission":["1","2","3","4","5","6","7","70","72","74"],
"accessToken":"624d10794d40e33d7d81328e1aeba12f",
"account":{"departId":"55","departName":"开发组",
"positionName":"研发组长","account_State":"在用",
"account_Name":"王杰林","account_ID":"239","account_Pwd":"",
"position_ID":"73","account_Mac":null}} -->
