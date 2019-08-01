$(function(){  
    $(".user-table tr").dblclick(function(){
    $("#myModalUpdate").addClass("in");
    $("#myModalUpdate").show();
    $("#lookms").show();
    $("#myModalUpdate .modal-footer .col-md-8").show();
    
    })
})
    $(function(){ 
    var str = ''
		var str2 = ''
		for (var i = 1; i < 19; i++)
		{
			hour = 0;
			minute = 30*i;
			for( var j = 0; j<9; j++){
				if(minute >= 60){
					minute = minute - 60;
					hour = hour + 1;
				}

			}
			hour = hour+8
			if(hour<10){
				hour = "0" + hour
			}
			if(minute == 0){
				minute = "0" + minute
			}
			str += "<li><p>" + hour + "：" + minute+"</p></li>"
		}
		for (var i = 1; i < 19; i++)
		{
			hour = 0;
			minute = 30*(i+1);
			for( var j = 0; j<9; j++){
				if(minute >= 60){
					minute = minute - 60;
					hour = hour + 1;
				}

			}
			hour = hour+8
			if(hour<10){
				hour = "0" + hour
			}
			if(minute==0){
				minute = "0" + minute
			}
			str2 += "<li><p>" + hour + "：" + minute+"</p></li>"
		}
		document.getElementById("datatime").innerHTML = str
		document.getElementById("datatime2").innerHTML = str2
		var length
		var index
		var index2
		var hasr1
		var hasr2
		var sysData
		var myDate = new Date();
		var year=myDate.getFullYear();        //获取当前年
		var month=myDate.getMonth()+1;   //获取当前月
		var date=myDate.getDate();            //获取当前日
		var h=myDate.getHours();              //获取当前小时数(0-23)
		var m=myDate.getMinutes();
		var h=7;
		var m=0;
		//
		$(".st-end #datatime li").each(function(){
			if( h >= $(this).text().substring(0, 2)){
				if( h-1 >= $(this).text().substring(0, 2)){
					$(this).wrap("<div class=\"grey\"></div>");
					$(this).children().unwrap();
					
					$(this).unbind('click').click(function(){
						alert("此选择无效，时间冲突")
					})
				}else if( m > $(this).text().substring(5, 3) ){
					$(this).wrap("<div class=\"grey\"></div>");
					$(this).children().unwrap();
					$(this).unbind('click').click(function(){
						alert("此选择无效，时间冲突")
					})
				}else{
					$(this).unbind('click').click(function(){
						//start
						$(".st-end #datatime li").css("background-color","white");
						$(this).css("background-color","pink");
						length = $(".st-end #datatime li").length;
						index = $(".st-end #datatime li").index(this);
						console.log('time1:'+index.value)
						index2 = "-1"
						hasr1 = $(".st-end #datatime").children().index(this)
						if(index >= 1){
							$(".st-end #datatime2 li").css("background-color","white")
							$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
						}else{
							$(".st-end #datatime2 li").css("background-color","white")
						}
						$(".st-end #datatime2 li").unbind('click').click(function(){
							index2 = $(".st-end #datatime2 li").index(this);
							console.log('time2:'+index2.value)
							var hasr2 = $(".st-end #datatime2").children().index(this)
							if($(".st-end #datatime2").children().slice(hasr1, hasr2+1).hasClass("bgred") ==false){
								if(index2 >= index){
									$(".st-end #datatime2 li").css("background-color","white");
									$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
									$(".st-end #datatime2 li").slice(index, index2+1).css("background-color","pink");
									$(".st-end #datatime li").css("background-color","white");
									$(".st-end #datatime li").slice(index, index2+1).css("background-color","pink");
								}else{
									alert("此选择无效，时间冲突")
								}
							}else{
								alert("此选择无效，时间冲突")
							}
						})
						//end	
					})
				}
			}else{
				$(this).unbind('click').click(function(){
					//start
					
					length = $(".st-end #datatime li").length;
					index = $(".st-end #datatime li").index(this);
					index2 = "-1"
					hasr1 = $(".st-end #datatime").children().index(this)
					console.log('time1:'+$(".st-end #datatime").children().innerHTML)
					$(".st-end #datatime li").css("background-color","white");
					$(this).css("background-color","pink");
					if(index >= 1){
						$(".st-end #datatime2 li").css("background-color","white")
						$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
					}else{
						$(".st-end #datatime2 li").css("background-color","white")
					}
					$(".st-end #datatime2 li").unbind('click').click(function(){
						index2 = $(".st-end #datatime2 li").index(this);
						console.log('time2:'+index2.value)
						var hasr2 = $(".st-end #datatime2").children().index(this)		
						console.log('index1:'+hasr1+'index2:'+hasr2)
						
						if($(".st-end #datatime2").children().slice(hasr1, hasr2+1).hasClass("bgred") ==false){
							if(index2 >= index){
								$(".st-end #datatime2 li").css("background-color","white");
								$(".st-end #datatime2 li").slice(0, index).css("background-color","grey");
								$(".st-end #datatime2 li").slice(index, index2+1).css("background-color","pink");
								$(".st-end #datatime li").css("background-color","white");
								$(".st-end #datatime li").slice(index, index2+1).css("background-color","pink");
							}else{
								alert("此选择无效，时间冲突")
							}
						}else{
							alert("此选择无效，时间冲突")
						}
						return hasr2
					})
					//end	
				})
			}
			$(".st-end #datatime2 li").each(function(){
				if( h+1 >= $(this).text().substring(0, 2)){
				
					if( h+1 == $(this).text().substring(0, 2) && m-30 <= $(this).text().substring(5, 3) ){
						$(this).wrap("<li class=\"white\"></li>");
						$(this).children().unwrap();
					}else{
						$(this).unbind('click').click(function(){
							alert("此选择无效，时间冲突")
						})
					}
						$(this).wrap("<div class=\"grey\"></div>");
					$(this).children().unwrap();
					
				}
			})
		})
					
				
		//确定
		$(".btng").unbind('click').click(function(){

			if(index2 >= index){
				
				$(".st-end #datatime li").slice(index, index2+1).wrap("<div class=\"bgred\"></div>");
				$(".st-end #datatime2 li").slice(index, index2+1).wrap("<div class=\"bgred\"></div>");
				$(".st-end #datatime div li p").unwrap();
				$(".st-end #datatime2 div li p").unwrap();
				index2 = 0;index = 1;
			}else{
				alert("各种提示，反正你没选对")
			}
		})

  })