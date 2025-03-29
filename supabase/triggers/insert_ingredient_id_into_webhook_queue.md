CREATE OR REPLACE FUNCTION queue_ingredient_webhook()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO webhook_queue (ingredient_id, name)
VALUES (NEW.id, NEW.name);
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

CREATE TRIGGER after_ingredient_insert
AFTER INSERT ON ingredients
FOR EACH ROW
EXECUTE FUNCTION queue_ingredient_webhook();
$$
