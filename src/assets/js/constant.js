
/*
	./:当前目录。
	../:父级目录。
	/:根目录
 */
import Cookies from 'js-cookie'
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

//权限判断方法（包含返回true，反之false）
function has(param){
	//未传值
	if(isBlank(param)) return false;
	var jsonString = Cookies.get("accountData");
	//未登录
	if(isBlank(jsonString))return false;
	var accountData = JSON.parse(jsonString);
	var permission = accountData.permission;
	for (var i = 0; i < permission.length; i++) {
		if(permission[i] == param){
			return true;
		}
	}
	return false;
}

//部门判断方法（包含返回true，反之false）
function hasDept(param){
  //未传值
  if(isBlank(param)) {
    return false
  };
  const jsonString = Cookies.get("accountData");
  //未登录
  if(isBlank(jsonString))return false;
  const accountData = JSON.parse(jsonString);
  const deptId = accountData.account.departId;
  const state = accountData.account.account_State;
  if(deptId == (param) && state == "在用"){
    return true;
  } else{
    return false;
  }
}
//职位判断方法（包含返回true，反之false）
function hasPosId(param){
  //未传值
  if(isBlank(param)) {
    return false
  };
  const jsonString = Cookies.get("accountData");
  //未登录
  if(isBlank(jsonString))return false;
  const accountData = JSON.parse(jsonString);
  const positionId = accountData.account.position_ID;
  const state = accountData.account.account_State;
  if(positionId == (param) && state == "在用") {
    return true;
  }else {
    return false;
  }
}

//职位级别判断方法（包含返回true，反之false）
function hasPosType(param){
  //未传值
  if(isBlank(param)) return false;
  const jsonString = Cookies.get("accountData");
  //未登录
  if(isBlank(jsonString))return false;
  const accountData = JSON.parse(jsonString);
  const positionTypeId = accountData.account.positionTypeId;
  const state = accountData.account.account_State;
  if(positionTypeId == (param) && state == "在用") return true;
  return false;
}

//用户的基本信息
export function accountInfo(){

	var jsonString = Cookies.get("accountData");
	//未登录
	if(isBlank(jsonString))return false;
	var accountData = JSON.parse(jsonString);
	var accountInfo = accountData.account;
	return accountInfo;
}

export {
	//isBlank,
	CallVueMethod,
	has,
	hasDept,
	hasPosId,
	hasPosType
}
