# CRONS ON SUPABASE

## call-classify-ingredient

SELECT
net.http_post(
url:='https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient',
headers := jsonb_build_object(
'Content-Type', 'application/json',
'Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvenp0c2ZocHNvdG1la2plaXd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTc1NTM1MSwiZXhwIjoyMDQ3MzMxMzUxfQ.ojzY1VHAH-sN2eVIY-YyTnR80cvceoQzybFSO48Z17Y'  
 ),
timeout_milliseconds:=1000
);

## Delete processed webhook queue rows

select
net.http_post(
url:='https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/delete-processed-webhook-tasks',
headers := jsonb_build_object(
'Content-Type', 'application/json',
'Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvenp0c2ZocHNvdG1la2plaXd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTc1NTM1MSwiZXhwIjoyMDQ3MzMxMzUxfQ.ojzY1VHAH-sN2eVIY-YyTnR80cvceoQzybFSO48Z17Y'  
 ),
timeout_milliseconds:=1000
);
