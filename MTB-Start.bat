@echo off
cd C:\Users\user\Desktop\DiscordBots\MedaTrainBot_JS-main
:while
	set input_num=
	echo MTBêßå‰ÉVÉXÉeÉÄ
	echo /---------------------------------------------/
	echo 1:bot start   2:command restart
	set /p input_num=

	if %input_num%==1 (
		npm start
		START C:\Users\user\Desktop\MTB-Start.bat
	) else if %input_num%==2 (
		npm run deploy
		npm start
		START C:\Users\user\Desktop\MTB-Start.bat
	) else (
		echo Error!:Unknown Word
		START C:\Users\user\Desktop\MTB-Start.bat
	)
START C:\Users\user\Desktop\MTB-Start.bat