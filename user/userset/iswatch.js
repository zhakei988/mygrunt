var fs = require('fs');
var child_process = require('child_process');

if(fs.existsSync("config.json"))
{
		child_process.execFile(process.cwd()+'/user/userset/watch.bat', null, {
			cwd:process.cwd()
		}, function(error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			} else 
			{
				console.log("打开浏览器成功,正在进行实时监控！");
				console.log(stderr)
				console.log(stdout)
			}

		});		
}else
{
   		console.log("未检测到项目配置文件，请按下面操作进行配置");
}
   