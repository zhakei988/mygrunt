@echo off
:begin
cls
echo -------------------------------------------------------
echo ��ӭ����grunt
echo �밴����ʾ���в���
echo -------------------------------------------------------
echo 1.�򿪼��

echo 2.��Ŀ����

echo 3.�������̨ 

echo 4.�˳� 
echo -------------------------------------------------------
set/p input=�������֣����س����� :
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
echo ��������ɹ�,���ڽ���ʵʱ��أ�
grunt sever) else echo δ��⵽��Ŀ�����ļ����밴���������������
:chos2
echo -------------------------------------------------------
echo ��name��authorΪ�����
set/p a=��������Ŀ����(name):
set/p b=��������Ŀ����(author):
set/p c=��������Ŀ����(description):
set/p d=��������Ŀ��ʱ(date):
node user/userset/setuser.js %a% %b% %c% %d%
pause
goto begin