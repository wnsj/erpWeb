<template>
	<div>
		<input type="file" id="myFile" class="inputfile" @change="handlerUpload($event)">
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
					axios.post('http://172.16.2.248:8080/ERP/wzbg/import', param, config).then(function(
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
				const acceptTypes = ['xlsx', 'xls', 'doc', 'jpg'];
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

