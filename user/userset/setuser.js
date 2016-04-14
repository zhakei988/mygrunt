var fs = require('fs');
var child_process = require('child_process'); 
var path = require('path');
var cont ="";
var arr=process.argv.slice(2);
cont=('{"name": "'+arr[0]+'","author": "'+arr[1]+'","description": "'+arr[2]+'","date":"'+arr[3]+'"}');	
console.log("-------------------------------------------------------");
function mdk(src)
{

	var os = src.split("/");
	var newsrc = "";
	for(var i=0;i< os.length;i++)
	{
		newsrc = newsrc+"/"+os[i];
		if(i==0)
		{
		newsrc = os[i];
		}
		
		if(fs.existsSync(newsrc))
		{
			continue;
		}else
		{
			fs.mkdirSync(newsrc);
		}
	}
	if(src == newsrc)
	{
		child_process.exec('grunt copymodules');
		console.log("配置src目录完成");
		fs.writeFile("config.json",cont,function(err)
			{ 
				if(err)
				{
					console.log("配置config.json失败");
				}else
				{
					console.log("配置config.json完成");
				}
			})	

	}else
	{
		console.log("配置src失败");
		console.log("配置config.json失败");
	}
}
mdk('src/'+arr[1]+'/'+arr[0]+'/');