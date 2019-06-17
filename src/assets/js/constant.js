/*
	./:当前目录。
	../:父级目录。
	/:根目录
 */
/*判断值是否为空，是空返回true*/
export function isBlank(value) {
	if (value == '' || value == null || value == undefined || (value.length >
			0 && value.trim().length == 0)) return true;
	return false;
}

/*
js中调用vue中的方法
例：
	1.在vue中新建一个用于导出方法的方法(sendApproves)
		sendApproves(){
			//js中的set方法【this.Day()为导出方法】
			CallVueMethod.setApproves(this.Day());
		}
	2.调用vue中的导出方法，最后在js中调用get方法（相当于间接调用了vue中的Day方法）
	mounted() {
		//调用vue中的导出方法
		this.sendApproves();
		$(function(){
			//调用get方法（相当于调用了Day方法）
			CallVueMethod.getApproves();
		});
	}
*/
var CallVueMethod = {
	approves: null,
	setApproves(approves) {
		if (approves) {
			this.approves = approves;
		}
	},
	getApproves(approves) {
		return this.approves;
	}
}


export {
	//isBlank,
	CallVueMethod
}