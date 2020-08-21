@echo off

::Switching to resources folder to call grunt tasks
cd..
cd resources

::call grunt updateTestData

::To call grunt local and report tasks
call grunt local
call grunt report

cd..

pause