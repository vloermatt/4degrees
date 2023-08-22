/*
  Warnings:

  - Added the required column `awayId` to the `TallyBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `TallyBoard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TallyBoard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leagueId" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL,
    "awayId" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,
    CONSTRAINT "TallyBoard_awayId_fkey" FOREIGN KEY ("awayId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TallyBoard_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TallyBoard" ("id", "leagueId", "open") SELECT "id", "leagueId", "open" FROM "TallyBoard";
DROP TABLE "TallyBoard";
ALTER TABLE "new_TallyBoard" RENAME TO "TallyBoard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
