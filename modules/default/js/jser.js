/**
* @class Jser
* @Author JakeChiu
* @createTime 2015-06-09
* @version 1.0
*/
if (typeof(Jser)=='undefined') {var Jser = { lang: {}, params: {} }};
(function(){
	//声明类库
	Jser.js={
	/**
	 获取url参数
        *@param {String} string       字符串
	*/
	getUrlParam:function(string){  
    	//构造一个含有目标参数的正则表达式对象  
   		var reg = new RegExp("(^|&)"+ string +"=([^&]*)(&|$)");  
    	//匹配目标参数  
    	var r = window.location.search.substr(1).match(reg);  
    	//返回参数值  
    	if (r!=null) return unescape(r[2]);  
    	return null;  
	},
    /**
	 ajax
        *@param {String} option       字符串数组
	*/
	SetAjax:function(option)
	{
            jQuery.ajax({dataType: "jsonp", type: "get", url:option.urlstr, success: function (str) {
	        option.getresult(str);
            },
	        error: function (msg) {
            option.getresult(msg);
            }
    });
	},
	/**
	 自定义ajax
        *@param {String} url       字符串请求地址
		*@param {String} result    回调函数
	*/
    postAjax:function(url,result)
    {
			if(result!="")
			{
			try{
			var hs=eval(result)
			var option = {urlstr:url,getresult:function(data) {hs(data) }};
			}catch(e)
			{
			var option = {urlstr:url,getresult:function(data) {}};
			}
			}else
			{
			var option = {urlstr:url,getresult:function(data) {}};
			}
			this.SetAjax(option);
     },
	 /**
	 截取字符串
        *@param {String} str       字符串请求地址
		*@param {String} result    回调函数
	*/
	 limit:function(str,num)
	 {
		    var objString = $.trim(str);  
            var objLength = $.trim(str).length;  
	        if(objLength > num){   
            objString = objString.substring(0,num) + "..";  
            }  	 
			return  objString;
	 }	
	
}})();

/*手机滚动翻屏*/
(function(){
	//声明类库
	Jser.js={
	sreW:document.documentElement.clientHeight,
	/**
	 去除空格
        *@param {String} string       字符串
	*/
    empty:function(string) { //去除空格
        return string.replace(/\s*/g, '');
    },
	/**
	 等比缩放背景，保持不失真
        *@param {String} w       图片真实宽度
		*@param {String} h       图片真实高度
	*/
	setWh:function(w,h){//设置初始值、高度宽度、背景兼容等
	    if(h > Jser.js.sreW)
		{
			$(".list-lay").css("background-size","100% auto")
		}else
		{
		    $(".list-lay").css("background-size","auto 100%")
		}
		$(".list-lay").height(Jser.js.sreW);
	},
	/**
	 判断是否是PC
	*/
	IsPC:function()
	{  
           var userAgentInfo = navigator.userAgent;
           var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
           var flag = true;
           for (var v = 0; v < Agents.length; v++) {  
               if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
           }  
           return flag;  
	},
	getId:function(id){
		return document.getElementById(id);
	},
	/**
	 绑定手机触摸事件
	*/
	bindLisnerTouch:function()
	{
		var touchEvents = {
        touchstart: "touchstart",
        touchmove: "touchmove",
        touchend: "touchend",

        /**
         * @desc:判断是否pc设备，若是pc，需要更改touch事件为鼠标事件，否则默认触摸事件
         */
        int:function(){
			if(Jser.js.IsPC())
			{
				    this.touchstart = "mousedown";
					this.touchmove = "mousemove";
					this.touchend = "mouseup";
			}
			}
		}
		touchEvents.int();
		var startY = 0,//开始坐标
		endY = 0,//结束坐标
		seInterval= Jser.js.sreW*0.06,//滑动距离,
		num=1,
		litem = 0,
		top = 0;
		window.addEventListener(touchEvents.touchstart,function(e){//绑定开始触摸
		if(num==0)
		{
		return ;	
		}
		var evens = e.screenY || e.changedTouches[0].pageY;
		$("#list").removeClass("list-transtion")
		startY = evens;
		top = $("#list").css("top").split("px")[0] - startY;
		window.addEventListener("touchmove",function(m_e){//绑定触摸移动
		if(num==0)
		{
		return ;
		}
		var evenm = m_e.changedTouches[0].pageY
		$(".jt").html(top+evenm);
        if(top+evenm < 0)
		{
			if(litem != $("#list .list-lay").length -1)
			{
			$("#list").css("top",top+evenm);  
			}
		}
		//if(m_e.changedTouches[0].pageY>0 && litem<$("#list .list-lay").length -1)
		//{
		//$("#list").css("top",-m_e.changedTouches[0].pageY); 
		//}
		});
		window.addEventListener(touchEvents.touchend,function(e_e){//绑定结束触摸
		var evene = e_e.screenY || e_e.changedTouches[0].pageY
		$("#list").addClass("list-transtion")
		$("#list").css("margin",0)
		endY=evene;
			if(num==1)
			{
				num = 0;
				if(endY-startY < 0)
				{
					if( -(endY-startY) > seInterval)
					{
						if(litem < $("#list .list-lay").length -1)
						{
						litem++;
						}
					}
				}else
				{
					if(endY-startY > 0)
					{
						 if(endY-startY > seInterval)
					    {
							if(litem>0)
							{
							litem--;
							}
							
						}
					}
				}
				$("#list").css("top",-(Jser.js.sreW*litem));
				if(top==0)
				{
					num=1
				}else
				{
					if(litem == $("#list .list-lay").length -1)
					{
				    num=1;
					}else
					{
						 window.setTimeout(function(){num=1},500)
					}
				}
					
				
						if(litem == $("#list .list-lay").length -1)
						{
							$(".jt").hide();
						}else
						{
							$(".jt").show();
						}
			}
		},false);
		},false);
	},
	onloadimg:function()
	{
		var img = new Image();  
		$("body").append('<div style="display:none" id="hideimg"></div>')
		for(var i =0;i<_imglist.length;i++)
		{
			img.onload = function(){  
			$("#hideimg").append(img);
			//加载完毕后
       		};  
			img.onerror = function(){  
            //加载错误
            };  
			img.src = _imglist[i]; //img.src 一定要写在img.onload之后，否则在IE中会出现问题  
		}
  
       img = null;
	},
	/**
	 初始化运行函数init
	*/
	init:function(){
		$("#list").css("top",0);
		window.addEventListener('touchmove', function(e){e.preventDefault()},false);//清除微信屏幕晃动
		window.addEventListener('touchend', function(e){e.preventDefault()},false);//清除微信屏幕晃动
		Jser.js.setWh(640,1136);//初始化设置
		Jser.js.bindLisnerTouch();//绑定手机触摸事件
		Jser.js.onloadimg();
		window.addEventListener("load",function(){
			$(".loading").addClass("hide");//关闭onload
			},false)
	}
}
})();
(function(){
//手机触摸幻灯片插件
Jser.m = {
	scollimg:function(id,option)
	{
	  this.o_id = id;
	  this.id=$("#"+id);
	  this.i=0;
	  this.set={
		 autoplay:true,//是否自动播放
		 timer:3000,//自动播放时间
		 spacing:20 //手指滑动间距
	  }
	  this.extend(this.set,option)
	  if(id.length>0)
	  {
		 this.init();  
	  }
	}
}
	//原型方法
	Jser.m.scollimg.prototype={
		init:function(){
			this.bindstyle();
			this.setHtml();
			this.binbotBtn();
			this.bobtn();
			this.moveLeft();
			this.moveRight();
			this.bindtouch();
			if(this.set.autoplay) this.autoplay();
			
		},
		bindstyle:function()
		{
			this.id.append('<style>html{ font-size:62.5%}body{ font-size:1.4rem}ul,li,img,body{ list-style:none; padding:0; margin:0}.boxlay{ width:100%; overflow:hidden; position:relative}.boxlay .lay{ width:100%;}.boxlay .img { position:absolute; left:0; top:0; transition:all 0.8s}.boxlay .img li img{ width:100%; float:left;}.boxlay .img li a{display:table-cell;vertical-align:middle;}.boxlay .img li{ float:left;display:table}.boxlay .ico{ position:absolute; right:0;bottom:5%}.boxlay .ico li{ float:left; width:12px; height:12px; border-radius:50%; background:#000; margin-right:6px}.boxlay .ico li.on{ background:#fff}</style>')
		},
		extend: function( obj1, obj2 ){
			for ( var attr in obj2 ) {
				obj1[ attr ] = obj2[ attr ]
			}
		},
		bindtouch:function()
		{
			var _this =this;
			var startX=0,endX=0;
			document.getElementById(_this.o_id).getElementsByTagName("ul")[0].addEventListener('touchstart',function(e){
				window.clearInterval(_this.ital);
				e.preventDefault();
				startX = e.touches[0].pageX;
				
			},false);
			//document.getElementById(this.o_id).addEventListener('touchmove',touch,false);
			document.getElementById(this.o_id).getElementsByTagName("ul")[0].addEventListener('touchend',function(ev){
				ev.preventDefault();
				endX = ev.changedTouches[0].clientX;
				if(endX-startX <　_this.set.spacing)
				{
					_this.moveLeft();
				}
				if(endX-startX >　_this.set.spacing)
				{
					_this.moveRight();
				}
				_this.autoplay();
			},false);
		},
		setHtml:function()
		{
			var _id = this.id;
			var _len = this.len = _id.find(".img li").length;
			var arr =[];
			arr.push('<ul class="ico">')
			_id.find(".img li").each(function(index, element) {
				if(index==0)
				{
                	arr.push('<li class="on"></li>')
				}else
				{
					arr.push('<li></li>')
				}
            });
			arr.push('</ul>')
			_id.append(arr.join(''));
			_id.height(this.set.height)
			_id.find(".img li").width($(window).width())
			_id.find('.img').width($(window).width()*_len);
			_id.find('.ico').width((_id.find('.ico li:eq(0)').width()+parseInt(_id.find('.ico li:eq(0)').css("margin-right")))*_len);
		},
		binbotBtn:function()
		{
			var _this = this;
			var _id = this.id;
				_id.find('.ico li').click(
				function()
				{
					window.clearInterval(_this.ital);
					_this.i=$(this).index();
					_this.moveLeft()
					_this.autoplay()
				}
				)
		},
		bobtn:function()
		{
			this.id.find('.ico li').eq(this.i).addClass('on').siblings().removeClass('on');
		},
		autoplay:function()
		{
			var _this = this;
			if(_this.set.autoplay)
			{
			this.ital = window.setInterval(function(){_this.moveLeft();},_this.set.timer)
			}else
			{
				this.ital="";
			}
		},
		moveLeft:function()
		{	
			if(this.i == this.len -1){this.i=0}else{this.i++;}
			var _id = this.id;
			_id.find('.img').css('left',$(window).width()*this.i*-1)
			this.bobtn();
			
		},
		moveRight:function(n)
		{	
			if(this.i !=0){this.i--;}
			var _id = this.id;
			_id.find('.img').css('left',$(window).width()*this.i*-1)
			this.bobtn();
		}
	}
})()