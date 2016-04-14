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


