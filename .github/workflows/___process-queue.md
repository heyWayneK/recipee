# GIVES ERROR
# {"code":401,"message":"Invalid JWT"}

name: Call Supabase Edge Function

on:
  schedule:
    - cron: "*/5 * * * *" # Every 5 minutes
  workflow_dispatch: # Allows manual triggering

jobs:
  call-function:
    runs-on: ubuntu-latest
    steps:
      - name: Call Edge Function
        run: |
          curl -X POST https://zozztsfhpsotmekjeiwt.supabase.co/functions/v1/classify-ingredient \
          -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
