-- Revert kanbanlike:01-base-tables from pg

BEGIN;

BEGIN;

DROP TABLE IF EXISTS "card_has_label";
DROP TABLE IF EXISTS "label";
DROP TABLE IF EXISTS "card";
DROP TABLE IF EXISTS "list";
DROP TABLE IF EXISTS "user";

COMMIT;

COMMIT;
