@echo off
:begin
cls
echo -------------------------------------------------------
echo 欢迎来到grunt
echo 请按照提示进行操作
echo -------------------------------------------------------
echo 1.打开监控

echo 2.项目配置

echo 3.进入控制台 

echo 4.退出 
echo -------------------------------------------------------
set/p input=输入数字，按回车继续 :
if "%input%"=="1" (goto chos1)
if "%input%"=="2" (goto chos2)
if "%input%"=="3" (goto chos3)
if "%input%"=="4" (goto chos4)
:end
exit
:chos4
exit
goto:eof
:chos3
start
goto:eof
:chos1
if exist %cd%/config.json (echo ------------------------------------------------------- 
echo 打开浏览器成功,正在进行实时监控！
grunt sever) else echo 未检测到项目配置文件，请按下面操作进行配置
:chos2
echo -------------------------------------------------------
echo 【name和author为必填项】
set/p a=请输入项目名称(name):
set/p b=请输入项目作者(author):
set/p c=请输入项目介绍(description):
set/p d=请输入项目工时(date):
node user/userset/setuser.js %a% %b% %c% %d%
pause
goto begin