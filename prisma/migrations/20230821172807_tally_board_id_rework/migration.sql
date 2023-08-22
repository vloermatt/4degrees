/*
  Warnings:

  - You are about to drop the column `gameId` on the `TallyBoard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TallyBoard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leagueId" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL
);
INSERT INTO "new_TallyBoard" ("id", "leagueId", "open") SELECT "id", "leagueId", "open" FROM "TallyBoard";
DROP TABLE "TallyBoard";
ALTER TABLE "new_TallyBoard" RENAME TO "TallyBoard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
