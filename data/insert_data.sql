BEGIN;

INSERT INTO "user" (
"first_name",
"last_name",
"email",
"password"
) VALUES
( 'Philippe', 'Candille', 'philippe@oclock.io', '$2b$10$7vwYGrz2TGeyG4X8YnD9BOag9I.YKGUTJELs64qGmcK/syHu2BzTG'),
( 'Chuck', 'Norris', 'chuck@oclock.io', '$2b$10$7vwYGrz2TGeyG4X8YnD9BOag9I.YKGUTJELs64qGmcK/syHu2BzTG');

INSERT INTO "list" (
"name",
"position",
"user_id"
) VALUES
( 'A faire', 1, 1),
( 'En cours', 2, 1),
( 'Finis', 3, 1),
( 'Liste de course', 1, 2);

INSERT INTO "card" (
"name",
"position",
"status",
"list_id"
) VALUES
( 'MCD', 1, 'in progress', 1 ),
( 'MLD', 2, 'in progress', 1 ),
( 'Routes back', 1, 'in progress', 2 ),
( 'Routes front', 2, 'done', 2),
( 'Créer le projet', 1, 'done', 3 ),
( 'Faire snippet create data', 2, 'done', 3 ),
( 'Pommes ', 1, 'in progress', 4 ),
( 'Fromage blanc', 2, 'in progress', 4 );

INSERT INTO "label" (
"name",
"color"
) VALUES
( 'KanbanLike', 'green'),
( 'course', 'red');

INSERT INTO "card_has_label" (
"card_id",
"label_id"
) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 2),
(8, 2);

COMMIT;





