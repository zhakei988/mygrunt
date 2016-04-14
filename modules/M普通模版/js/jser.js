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


