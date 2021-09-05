/* début de la transaction*/
BEGIN;

/* suppression des tables existantes */
DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

/* table list */
CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

/* table card */
CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT,
    "list_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

/* table tag */
CREATE TABLE "tag"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "color" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

/* table card_has_tag */
CREATE TABLE "card_has_tag" (
    -- ON DELETE CASCADE supprimera l'association si la carte ou le tag sont supprimés
    "card_id" INTEGER NOT NULL REFERENCES card("id") ON DELETE CASCADE,
    "tag_id" INTEGER NOT NULL REFERENCES tag("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- pas d'updated_at, une relation ne se met pas à jour
);

/* seeding */
INSERT INTO "list" ("name")
VALUES ('Ma première liste');

INSERT INTO "card" ("name", "list_id")
VALUES ('Carte 1', 1),
       ('Carte 2', 1);

INSERT INTO "tag" ("name", "color")
VALUES ('Urgent', '#F00');

INSERT INTO "card_has_tag" ("card_id","tag_id")
VALUES (1,1);


/* fin de la transaction */
COMMIT;