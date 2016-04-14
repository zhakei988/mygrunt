/**
* @class Jser
* @Author JakeChiu
* @createTime 2015-06-09
* @version 1.0
*/
if (typeof(Jser)=='undefined') {var Jser = { lang: {}, params: {} }};
(function(){
	//�������
	Jser.js={
	/**
	 ��ȡurl����
        *@param {String} string       �ַ���
	*/
	getUrlParam:function(string){  
    	//����һ������Ŀ�������������ʽ����  
   		var reg = new RegExp("(^|&)"+ string +"=([^&]*)(&|$)");  
    	//ƥ��Ŀ�����  
    	var r = window.location.search.substr(1).match(reg);  
    	//���ز���ֵ  
    	if (r!=null) return unescape(r[2]);  
    	return null;  
	},
    /**
	 ajax
        *@param {String} option       �ַ�������
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
	 �Զ���ajax
        *@param {String} url       �ַ��������ַ
		*@param {String} result    �ص�����
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
	 ��ȡ�ַ���
        *@param {String} str       �ַ��������ַ
		*@param {String} result    �ص�����
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

/*�ֻ���������*/
(function(){
	//�������
	Jser.js={
	sreW:document.documentElement.clientHeight,
	/**
	 ȥ���ո�
        *@param {String} string       �ַ���
	*/
    empty:function(string) { //ȥ���ո�
        return string.replace(/\s*/g, '');
    },
	/**
	 �ȱ����ű��������ֲ�ʧ��
        *@param {String} w       ͼƬ��ʵ���
		*@param {String} h       ͼƬ��ʵ�߶�
	*/
	setWh:function(w,h){//���ó�ʼֵ���߶ȿ�ȡ��������ݵ�
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
	 �ж��Ƿ���PC
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
	 ���ֻ������¼�
	*/
	bindLisnerTouch:function()
	{
		var touchEvents = {
        touchstart: "touchstart",
        touchmove: "touchmove",
        touchend: "touchend",

        /**
         * @desc:�ж��Ƿ�pc�豸������pc����Ҫ����touch�¼�Ϊ����¼�������Ĭ�ϴ����¼�
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
		var startY = 0,//��ʼ����
		endY = 0,//��������
		seInterval= Jser.js.sreW*0.06,//��������,
		num=1,
		litem = 0,
		top = 0;
		window.addEventListener(touchEvents.touchstart,function(e){//�󶨿�ʼ����
		if(num==0)
		{
		return ;	
		}
		var evens = e.screenY || e.changedTouches[0].pageY;
		$("#list").removeClass("list-transtion")
		startY = evens;
		top = $("#list").css("top").split("px")[0] - startY;
		window.addEventListener("touchmove",function(m_e){//�󶨴����ƶ�
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
		window.addEventListener(touchEvents.touchend,function(e_e){//�󶨽�������
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
			//������Ϻ�
       		};  
			img.onerror = function(){  
            //���ش���
            };  
			img.src = _imglist[i]; //img.src һ��Ҫд��img.onload֮�󣬷�����IE�л��������  
		}
  
       img = null;
	},
	/**
	 ��ʼ�����к���init
	*/
	init:function(){
		$("#list").css("top",0);
		window.addEventListener('touchmove', function(e){e.preventDefault()},false);//���΢����Ļ�ζ�
		window.addEventListener('touchend', function(e){e.preventDefault()},false);//���΢����Ļ�ζ�
		Jser.js.setWh(640,1136);//��ʼ������
		Jser.js.bindLisnerTouch();//���ֻ������¼�
		Jser.js.onloadimg();
		window.addEventListener("load",function(){
			$(".loading").addClass("hide");//�ر�onload
			},false)
	}
}
})();
(function(){
//�ֻ������õ�Ƭ���
Jser.m = {
	scollimg:function(id,option)
	{
	  this.o_id = id;
	  this.id=$("#"+id);
	  this.i=0;
	  this.set={
		 autoplay:true,//�Ƿ��Զ�����
		 timer:3000,//�Զ�����ʱ��
		 spacing:20 //��ָ�������
	  }
	  this.extend(this.set,option)
	  if(id.length>0)
	  {
		 this.init();  
	  }
	}
}
	//ԭ�ͷ���
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
				if(endX-startX <��_this.set.spacing)
				{
					_this.moveLeft();
				}
				if(endX-startX >��_this.set.spacing)
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