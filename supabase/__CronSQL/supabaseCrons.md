EXTENSION INSTALL or FIRST SQL to install (if THIRD doesnt run):
create extension if not exists pg_cron;

EXTENSION INSTALL or SECOND SQL:
create extension if not exists pg_net;

THIRD SQL: https://crontab.guru/#5_*__\__\_\*
select cron.schedule(
'call-classify-ingredient', -- name of the cron job
'\* \5 \* \* \*', -- every 5 minutes

$$
select
net.http_post(
  url:='https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient',
  headers:=jsonb_build_object('Content-Type','application/json', 'Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvenp0c2ZocHNvdG1la2plaXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTUzNTEsImV4cCI6MjA0NzMzMTM1MX0.8qdKWWjoF8O2tBAqfByyJcnnpCf4M1r3WvnUDIc9c8k'),
  body:=jsonb_build_object('time', now()),
  timeout_milliseconds:=5000
) as request_id;
$$

);
