# TRIGGERS ON SUPABASE

## ADD INGREDIENT INSERTS FOR CLASSIFY INGREDIENTS TO WEBOOK QUEUE

DROP TRIGGER IF EXISTS
"after_insert_ingredient"
ON
"public"."ingredients";
CREATE TRIGGER "after_insert_ingredient"
AFTER INSERT
ON "public"."ingredients"
FOR EACH ROW
EXECUTE FUNCTION
"public"."queue_ingredient_webhook"();
