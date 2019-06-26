
	var flag = 0;

	$("table").mousedown(function(ev){
		
		if(flag == 0){	
		var tableid=$(this).attr('id');
		var el = document.getElementById(tableid);
		var oDiv = document.createElement("div");
		el.appendChild(oDiv);
		oDiv.setAttribute("id","menu");
		oDiv.innerHTML="复制";
		
		var oMenu = document.getElementById("menu");
		
			el.oncontextmenu = function(ev) {		
			//左键--button属性=1，右键button属性=2
			if(ev.button == 2) {
				ev.preventDefault();
	
				var oLeft = $(this).width() /2 - ($('#menu').width() /2);
				var oTop = $(this).height() /2 - ($('#menu').height() /2);			
	
				oMenu.style.display = "block";
				oMenu.style.left = oLeft + "px";
				oMenu.style.top = oTop + "px";
				
				flag = 1;
				if(flag == 1){
					$(this).addClass('context-menu-select');
				}
			}
		}
		
		}
		
		$("#menu").click(function(){
			oMenu.innerHTML="";
			$("#menu").hide();
			copy(tableid);
			$('.context-menu-one').removeClass('context-menu-select');
		})
		
		
	
	})
	
	function copy(tableid){
		var textArea = document.createElement("textarea");
		document.body.appendChild(textArea);
		textArea.setAttribute("id","copy");
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;
		textArea.style.width = '1px';
		textArea.style.height = '1px';
		textArea.style.padding = 0;
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		textArea.style.background = 'transparent';
			
		var e = document.getElementById("copy");
		var a = document.getElementById(tableid).outerHTML;	
		var c = e.innerHTML=a;
		e.select(c); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		alert("内容复制成功！");
		location.reload(); 
		
	}