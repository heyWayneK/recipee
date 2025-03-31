IMPORTANT: hide .env
DEPLOY: npx supabase functions deploy classify-ingredient

# SETUP

STEP 1: CREATE FUNCTION
STEP 2: ADD TRIGGERs

## TRIGGER

CREATE TABLE webhook_queue (
id SERIAL PRIMARY KEY,
ingredient_id INT NOT NULL,
name TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
processed BOOLEAN DEFAULT FALSE,
FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

## TRIGGER

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

## TRIGGER FUNCTION

Create the Trigger Function
This function adds a task to the queue whenever a new row is inserted into ingredients.

### RUN SQL TO CREATE FUNCTION:

CREATE OR REPLACE FUNCTION public.queue_ingredient_webhook()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
INSERT INTO webhook_queue (ingredient_id, name, type)
VALUES (NEW.id, NEW.name, 'classify-ingredient');
RETURN NEW;
END;
$function$;

### OR just paste FUNCTION

BEGIN
INSERT INTO webhook_queue (ingredient_id, name, type)
VALUES (NEW.id, NEW.name, 'classify-ingredient');
RETURN NEW;
END;

#### OLD trigger v1 - dont use

BEGIN
INSERT INTO webhook_queue (ingredient_id, name)
VALUES (NEW.id, NEW.name);
RETURN NEW;
END;
