$(function(){  
    $(".user-table tr").dblclick(function(){
    $("#myModalUpdate").addClass("in");
    $("#myModalUpdate").show();
    $("#lookms").show();
    $("#myModalUpdate .modal-footer .col-md-8").show();
    $("#myModalJoin .close").click(function(){
        $("#myModalJoin").removeClass("in");
        $("#myModalJoin").hide();
        $("#lookms").hide();
        $("#myModalJoin .modal-footer .col-md-8").hide();
    })
    })
	
	
$(".selected option").removeAttr("selected");	

var time = new Date();
var day = ("0" + time.getDate()).slice(-2);
var month = ("0" + (time.getMonth() + 1)).slice(-2);
var today = time.getFullYear() + "-" + (month) + "-" + (day);
$("input[type='date']").val(today);







    })   
    