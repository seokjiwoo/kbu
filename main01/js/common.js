$(document).ready(function(){
	COMMON.UI.screen();
	COMMON.UI.selectmenu(".select_style1");
	COMMON.UI.screen_control(".page_controls");
	COMMON.UI.faqList("#bodys .contents .s_dev_faqlist");
	COMMON.UI.nav("#bodys .lnb");
	COMMON.UI.gnb("#header .header_wrap");
});
$(window).load(function(){
	COMMON.UI._load();
});

//COMMON 객체 생성
var COMMON = {};
//COMMO에 네임스페이스로 util을 생성 - 유틸리티 관련 기능 모음
COMMON.util = {};
//COMMO에 네임스페이스로 UI를 생성 - ui 관련 프로퍼티 모음
COMMON.UI = {
	_load : function(){//로딩후 계산해서 실행할것들
	},
	_fx : function(func){
		if(typeof func === "function"){
			func();
		}
	},
	screen : function(){
		sizeCheck();
		$(window).resize(function(){
			sizeCheck();
		});
		function sizeCheck(){
			var w = document.body.clientWidth;
			if(document.getElementById("main_lnb")){//메인 페이지일경우
				if(w >= 1280){
					document.body.className = "w1280";
				}else if(w >= 0 && w < 1280){
					document.body.className = "w1024";
				}
			}else{//서브 페이지일경우
				if(w >= 1280){
					document.body.className = "w1280";
				}else if(w >= 640 && w < 1280){
					document.body.className = "w1024";
				}else if(w < 640){
					document.body.className = "w640";
				}
			}
		}
	},
	gnb : function(a){
		var obj = $(a);
		var gnb = $(".gnb", obj);
		var li = $(".gnb > ul > li", obj);
		var old = null;
		var m_nav = $(".m_nav", obj);
		var m_depth3 = "off";
		var m_depth3_state = function(){
			if(m_depth3 == "on"){
				gnb.addClass("depth3_on");
			}else{
				gnb.removeClass("depth3_on");
			}
		}
		li.click(function(){
			if(document.body.className != "w640") return false;
			if(old != null && old.attr("class") != this.className) old.removeClass("on");
			if($(this).attr("class").indexOf("on") > -1){
				$(this).removeClass("on");
				m_depth3 = "off";
				gnb.removeClass("depth3_on");
			}else{
				$(this).addClass("on");
				m_depth3 = "on";
				old = $(this);
			}
			m_depth3_state();
		});
		m_nav.click(function(){
			if(gnb.attr("class").indexOf("depth2_on") > -1){
				gnb.removeClass("depth2_on");
			}else{
				if(gnb.attr("class").indexOf("depth3_on") > -1){
					gnb.removeClass("depth3_on");
				}
				gnb.addClass("depth2_on");
			}
		});
		li.mouseenter(function(){
			if(document.body.className != "w640"){
				$(this).addClass("on");
			}
		});
		li.mouseleave(function(){
			if(document.body.className != "w640"){
				$(this).removeClass("on");
			}
		});
	},
	nav : function(a){
		var obj = a;
		var dep1_ul = $("> ul", obj);
		var link = dep1_ul.find("> li");
		var old = dep1_ul.find("> li.on");

		link.click(function(){
			if(old != null){
				if($(this).attr("class") == "on"){
					$(this).attr("class","");
				}else{
					old.removeClass("on");
					$(this).addClass("on");
				}
			}else{
				$(this).addClass("on");
			}
			old = $(this);

			if(this.getElementsByTagName("ul")[0]){
				return false;
			}
		});
	},
	selectmenu : function(a){
		var $obj = $(a);
		var $btn = $(".button a", $obj);

		$btn.click(function(e){
			var thisContainer = $(this).parents(a);
			if(thisContainer.attr("class").indexOf("on") == -1){
				thisContainer.addClass("on");
			}else{
				thisContainer.removeClass("on");
			}
			COMMON.UI.onbodyclick($,e, thisContainer,function(e){thisContainer.removeClass("on");});
			return false;
		});
	},
	onbodyclick : function($,e,obj,func){//버블링을 취소하고 영역바깥쪽 바디를 클릭할때만 넘어온 펑션을 실행
		var e = e || window.event;
		if (e.stopPropagation) e.stopPropagation();
		else window.event.cancelBubble = true;
		$(document.body).bind("click",func);
	},
	screen_control : function(a){
		var obj = $(a)
		, print = $(".print", obj)
		, zoomin = $(".zoomin", obj)
		, zoomout = $(".zoomout", obj)
		, defaultZoom = 100;

		print.click(function(){
			window.print();
			return false;
		});
		zoomout.click(function(){
			if(navigator.userAgent.indexOf("Firefox") > -1){
				alert("이 브라우저는 해당 기능을 지원하지 않습니다.");
				return false;
			}
			defaultZoom -= 10;
			document.body.style.zoom = defaultZoom + "%";
		});
		zoomin.click(function(){
			if(navigator.userAgent.indexOf("Firefox") > -1){
				alert("이 브라우저는 해당 기능을 지원하지 않습니다.");
				return false;
			}
			defaultZoom += 10;
			document.body.style.zoom = defaultZoom + "%";
		});
	},
	faqList : function(a){
		var obj = a;
		var $link = $("dl > dt > .title a", obj);
		var $dt = null, $dd = null, $old_dt = null, $old_dd = null;

		$link.click(function(){
			$dt = $(this).parents("dt"), $dd = $dt.next();
			if($old_dt != null){
				if($dt.attr("class") == "select"){
					$dt.attr("class","");
					$dd.attr("class","");
				}else{
					$old_dt.attr("class","");
					$old_dd.attr("class","");
					$dt.attr("class","select");
					$dd.attr("class","select");
				}
			}else{
				$dt.attr("class","select");
				$dd.attr("class","select");
			}
			$old_dt = $dt;
			$old_dd = $dd;
			return false;
		});
	}
};
