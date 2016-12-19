/*
	tcb 同城帮项目
	2016年11月25日
	cjl
*/
$("a").click(function(e){
	e.preventDefault();
})

//显示地图
var map = new AMap.Map('container',{
           zoom: 10,
           center: [116.39,39.9]
       });
var clickEventListener = map.on('click', function(e) {
        document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
    });
    var auto = new AMap.Autocomplete({
        input: "tipinput"
    });
 var auto = new AMap.Autocomplete({
        input: "tipinput"
    });
 var auto1 = new AMap.Autocomplete({
        input: "sousuoInput"
    });
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
    }
//轮播图
function fImg(){
	var count = $("#wrap img").length;
	var width = $("#wrap img").width();
	var index = 1;
	var t = setInterval(move,2000);
	var m;
	function move(){
		$("#wrap").animate({
			left:-index*width,
		});
		index++;
		if(index>=count-1){
			clearInterval(t);
			m = setInterval(move1,2000)
		}
	}
	function move1(){
		$("#wrap").animate({
			left:-index*width,
		});
		index--;
		if(index<=0){
			clearInterval(m);
			t = setInterval(move,2000)
		}
	}
}
fImg();

for(var i=0;i<4;i++){
	$("#banner_big ul li").eq(i).find("span").hide();
}
$("#banner_ul").on("mouseenter","li",function(){
	$(this).find("span").show();
	var n= $(this).index();
	$(this).find("div").show();
});
$("#banner_ul").on("mouseleave","li",function(){
	$(this).find("span").hide();
	var n= $(this).index();
	$(this).find("div").hide();
});
//关闭城市列表
$("#close1").on("click",function(){
	$(this).parents(".bb").hide();
});
$("#checkCitys").on("click",function(){
	$(this).siblings(".bb").toggle();
});

//地图显示和隐藏
$("#showMap").on("click",function(e){
	$("#bigDiv").show();
	$("#map1").show();
});
$("#map1 h3 a").on("click",function(){
	$("#bigDiv").hide();
	$("#map1").hide();
})

//请求热门手机回收模块中数据
$.get("data/huishou.json",{},huishou,"json");
function huishou(responseDate){
	$("#tmp").load("template/huishou.html",function(){
	var htmlStr = baidu.template("huishouTmp",responseDate);
	$("#huishouUl").html(htmlStr);
	$("#huishouUl").css({'list-style':'none'});
		$("#tmp").empty();
	});
}
//请求二手良品模块中数据
$.get("data/liangpin.json",{},function(responseDate){
	$("#tmp").load("template/liangpin.html",function(){
		var htmlStr = baidu.template("liangpinTmp",responseDate)
		$("#liangpin").html(htmlStr);
		$("#tmp").empty();
	});
});


//请求tab中--卖手机模块中数据
$.get("data/maishouji.json",{},function(responseDate){
	$("#tmp").load("template/maishouji.html",function(){
		var htmlStr = baidu.template("maishoujiTmp",responseDate)
		$("#maishouji").html(htmlStr);
		$("#tmp").empty();
	});
});
//请求tab中---买二手机maimaimai模块中数据
$.get("data/maimaimai.json",{},function(responseDate){
	$("#tmp").load("template/maimaimai.html",function(){
		var htmlStr = baidu.template("maimaimaiTmp",responseDate)
		$("#maimaimai").html(htmlStr);
		$("#tmp").empty();
	});
});
//请求tab中---修电脑模块中数据
$.get("data/xiudiannao.json",{},function(responseDate){
	$("#tmp").load("template/xiudiannao.html",function(){
		var htmlStr1 = baidu.template("xiudiannaoTmp1",responseDate);
		var htmlStr2 = baidu.template("xiudiannaoTmp2",responseDate);
		$("#hotwenti").html(htmlStr1);
		$("#otherwenti").html(htmlStr2);
		$("#tmp").empty();
	});
});
//请求tab中---修手机/pad模块中数据
$.get("data/xiushouji.json",{},function(responseDate){
	$("#tmp").load("template/xiushouji.html",function(){
		var htmlStr = baidu.template("xiushoujiTmp",responseDate)
		$("#small1").html(htmlStr);
		$("#tmp").empty();
	});
});
//请求店铺数据,并加载
$.get("data/shop.json",{},function(responseDate){
	$("#tmp").load("template/shop.html",function(){
		var htmlStr = baidu.template("shopTmp",responseDate);
		$("#left_main").html(htmlStr);
		$("#tmp").empty();
	});
	//在地图上添加图标
	for(var n=0;n<responseDate.shop_data.length;n++){
		var x = parseFloat(responseDate.shop_data[n].map_longitude);
		var y = parseFloat(responseDate.shop_data[n].map_latitude);
		new AMap.Marker({
			icon : 'http://vdata.amap.com/icons/b18/1/2.png',
	  		position: [x,y],
	    	title: responseDate.shop_data[n].shop_name,
	     	map: map

		});
		map.setZoomAndCenter(9, [x, y]);
	}
});
//登录页面
$("#denglu_1").on("click",function(e){
	$("#bigDiv").show();
	$("#denglu").show();
});
$("#close_denglu").on("click",function(e){
	$("#bigDiv").hide();
	$("#denglu").hide();
});

//翻页插件
$(function(){
	function pager(pageId, pageSize, totleNum, currentPage){
		var pageCount = Math.ceil(totleNum/pageSize),//一共有多少页
			currentPage = currentPage || "1",//第几页
			barFrame =  '<a href="#left_main" style="visibility: visible; color: rgb(102, 102, 102); background: white;">首页</a>'+
					'<a href="#left_main" style="visibility: visible; color: rgb(102, 102, 102); background: white;">上一页</a>'+
					'<a href="#left_main" style="color: rgb(102, 102, 102); visibility: visible; background: white;">下一页</a>'+
					'<a href="#left_main" style="color: rgb(102, 102, 102); visibility: visible; background: white;">尾页</a>';
					//构建分页工具条主结构
					$("#"+pageId).html(barFrame);//载入首页、上一页、下一页、尾页 数据
					//构建页码
					//初始化起始页码，计算开始页码
					var startIndex = currentPage<=5?1:currentPage-4;
					var str="";
					for(var n=0;n<10 && startIndex<=pageCount;n++){
						str+= startIndex==currentPage?'<a href="#left_main" class="curPage stopA">'+startIndex+'</a>':'<a href="#left_main" class="stopA">'+startIndex+'</a>'
						startIndex++;
					}
					$("#"+pageId).find("a:eq(2)").before(str)
					//点击跳到首页
					$("#"+pageId).off("click").on("click","a",function(){
						if($(this).html()=="首页"){
							pager(pageId,5,100,1);
						}else if($(this).html()=="尾页"){
							pager(pageId,5,100,pageCount);
						}else if($(this).html()=="上一页"&&currentPage<=1){
								return;
						}else if($(this).html()=="上一页"){
							pager(pageId,5,100,currentPage-1);
						}else if($(this).html()=="下一页"&&currentPage<20){
							pager(pageId,5,100,currentPage+1);
						}else if($(this).html()=="下一页"&&currentPage>=20){
								return;
						}else{
							var pageNum = parseInt($(this).html());
							pager(pageId,5,100,pageNum);
						}
					})	
					
				}
				pager("left_bottom",5,100,1);
});


//修手机加载城市信息
//切换页面显示
$("#weixiuCitySpan").on("click",function(){
	$("#weixiuCity1").toggle();
});
//调取数据
$.get("data/city.json",{},function(responseDate){
	$("#tmp").load("template/weixiuCity.html",function(){
		var htmlStr = baidu.template("weixiuCityTmp",responseDate);
		$("#weixiuCity1").html(htmlStr);
		$("#bb").html(htmlStr);
		$("#tmp").empty();
		$("#bb .cityCenter").on("click","a",function(){
			$("#bb .cityCenter a").removeClass();
			$(this).addClass("nowCity");
			$("#bb .cityBottom div").removeClass();
			$("#bb .cityBottom div").eq($(this).index()).addClass("nowCityList");
		});

		$("#weixiuCity1 .cityCenter").on("click","a",function(){
			$("#weixiuCity1 .cityCenter a").removeClass();
			$(this).addClass("nowCity");
			$("#weixiuCity1 .cityBottom div").removeClass();
			$("#weixiuCity1 .cityBottom div").eq($(this).index()).addClass("nowCityList");
		});
		//点击关闭上面切换城市机按钮
		$("#bb .closeCity1").on("click",function(){
			$("#bb").hide();
		});
		//点击关闭下面维修当中关闭
		$("#weixiuCity1 .closeCity1").on("click",function(){
			$("#weixiuCity1").hide();
		});
	});
});