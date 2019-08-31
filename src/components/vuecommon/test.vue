<template>
	<div class="m-5">
		<div class="uploadBox">
			<h3>上传文件</h3>
			<div class="fileBox">
				<input type="file" id="myFile" class="inputfile" @change="handlerUpload($event)">
				<label for="myFile">
					<i class="iconfont">&#xe632;</i>点击上传本地文件
				</label>
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
						<!--进度条-->
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
	</div>

</template>

<script>
	import axios from 'axios'


	export default {
		data() {
			return {
				files: [],
				uploadSuccess: 0
			}
		},
		methods: {
			handlerUpload: function(e) {
				//获取选定的文件
				let tFiles = e.target.files;
				let len = tFiles.length;
				for (var i = 0; i < len; i++) {
					//开始上传每一个文件
					var item = {
						name: tFiles[i].name,
						uploadPercentage: 1,
						size: this.formatFileSize(tFiles[i].size, 0),
						uploadStatus: 0
					}
					console.log(item)
					this.files.push(item);
					//开始上传文件 新建一个formData
					let param = new FormData();
					param.append("name", "wiiiiiinney");
					//通过append向form对象添加数据
					param.append("file", tFiles[i]);
					//FormData私有类对象，访问不到，可以通过get判断值是否传进去
					console.log(param.get("file"));
					//判断大小
					if (!this.checkFileSize(tFiles[i].size)) {
						item.uploadStatus = -3;
						return false;
					}
					if (!this.checkFileType(tFiles[i].name.split('.')[1])) {
						item.uploadStatus = -2;
						return false;
					}
					//通过axios上传文件
					//配置
					let config = {
						//添加请求头 
						headers: {
							"Content-Type": "multipart/form-data"
						},
						//添加上传进度监听事件 
						onUploadProgress: e => {
							var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
							console.log(this.files)
							item.uploadPercentage = completeProgress;
						}
					};
					axios.post('http://172.16.2.248:8080/import', param, config).then(function(
						response) {
						console.log(response);
						item.uploadStatus = 2;
					}).catch(function(error) {
						console.log(error);
						item.uploadStatus = -1;
					});
				}
			},
			formatFileSize: function(fileSize, idx) {
				var units = ["B", "KB", "MB", "GB"];
				idx = idx || 0;
				if (fileSize < 1024 || idx === units.length - 1) {
					return fileSize.toFixed(1) +
						units[idx];
				}
				return this.formatFileSize(fileSize / 1024, ++idx);
			},
			checkFileType: function(fileType) {
				const acceptTypes = ['xlsx','xls', 'doc', 'jpg'];
				for (var i = 0; i < acceptTypes.length; i++) {
					if (fileType === acceptTypes[i]) {
						return true;
					}
				}
				return false;
			},
			checkFileSize: function(fileSize) {
				//2M
				const MAX_SIZE = 2 * 1024 * 1024;
				if (fileSize > MAX_SIZE) {
					return false;
				}
				return true;
			}
		}
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
<!-- // if (this.websocket != null) {
        //   switch (this.websocket.readyState) {
        //     case WebSocket.CONNECTING:
        //       // 值为0，表示正在连接。
        //       break;
        //     case WebSocket.OPEN:
        //       // 值为1，表示连接成功，可以通信了
        //       alert("已经连接了!");
        //       return;
        //     case WebSocket.CLOSING:
        //       // 值为2，表示连接正在关闭。
        //       break;
        //     case WebSocket.CLOSED:
        //       // 值为3，表示连接已经关闭，或者打开连接失败
        //       break;
        //   }
        // }
        //var accountId = document.getElementById('accountId').value;
        //this.accountId = accountId; -->
