
//获取当月第一天
export function getCurrentMonthFirst() {
	var date = new Date();
	date.setDate(1);
	var month = parseInt(date.getMonth() + 1);
	var day = date.getDate();
	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	return date.getFullYear() + '-' + month + '-' + day;
}

//获取当月最后一天
export function getCurrentMonthLast() {
	var date = new Date();
	var currentMonth = date.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	var lastTime = new Date(nextMonthFirstDay - oneDay);
	var month = parseInt(lastTime.getMonth() + 1);
	var day = lastTime.getDate();
	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	return date.getFullYear() + '-' + month + '-' + day;
}

//转化YYYY-MM-DD
export function timeInit(timestring) {
	if (timestring != null && timestring != undefined && timestring != '') {

		var newTimeArr = timestring.split(" ")
		return newTimeArr[0]
	} else {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}
}
//获取年月日时分秒毫秒 2016.01.01 23:59:59.000
export function getYYYYMMDDHHMMSS_24(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy.MM.dd 23:59:59.000'); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
}

//获取年月日时分 2016.01.01 23:59
export function getYYYYMMDDHHMM() {
	var date = new Date();
	return formatDate(date, 'yyyy-MM-dd hh:mm'); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
}

/*根据出生日期算出年龄*/
export function jsGetAge(strBirthday){
  var returnAge;
  var strBirthdayArr=strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if(nowYear == birthYear){
    returnAge = 0;//同年 则为0岁
  }
  else{
    var ageDiff = nowYear - birthYear ; //年之差
    if(ageDiff > 0){
      if(nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if(dayDiff < 0)
        {
          returnAge = ageDiff - 1;
        }
        else
        {
          returnAge = ageDiff ;
        }
      }
      else
      {
        var monthDiff = nowMonth - birthMonth;//月之差
        if(monthDiff < 0)
        {
          returnAge = ageDiff - 1;
        }
        else
        {
          returnAge = ageDiff ;
        }
      }
    }
    else
    {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge;//返回周岁年龄
}

//yyyy-MM-dd HH:mm:ss.SSS
function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
};

//获取年月日 2016.01.01
function getYYYYMMDD(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy.MM.dd'); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
}

//获取时分秒 20:30:12
function getHHMMSS(time) {
	var date = new Date(time);
	return formatDate(date, 'HH:mm:ss'); // 时间点 例 21点12分12秒的格式
}

//获取年月日时分秒毫秒 2016.01.01 00:00:00.00
function getYYYYMMDDHHMMSS(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy.MM.dd HH:mm:ss.000'); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
}

//获取年月日时分秒 2016-01-01 00:00:00
function getYYYY_MM_DD_HH_MM_SS(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy-MM-dd HH:mm:ss');
}

//获取年月日 2016-01-01
function getYYYY_MM_DD(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy-MM-dd');
}

//获取年月日 2016/01/01	
function getYYYY$MM$DD(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy/MM/dd');
}

//获取当前年月日时分秒 2016-01-01 00:00:00
function getCurrentYYYY_MM_DD_HH_MM_SS() {
	var date = new Date();
	return formatDate(date, 'yyyy-MM-dd HH:mm:ss');
}

export {
	formatDate,
	padLeftZero,
	getYYYYMMDD,
	getHHMMSS,
	getYYYYMMDDHHMMSS,
	getYYYY_MM_DD_HH_MM_SS,
	getYYYY_MM_DD,
	getYYYY$MM$DD,
	getCurrentYYYY_MM_DD_HH_MM_SS
}

