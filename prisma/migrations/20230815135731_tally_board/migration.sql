/*
  Warnings:

  - Added the required column `boardId` to the `Tally` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TallyBoard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tally" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "away" INTEGER NOT NULL,
    "home" INTEGER NOT NULL,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "Tally_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "TallyBoard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tally" ("avatar", "away", "home", "id", "nickname") SELECT "avatar", "away", "home", "id", "nickname" FROM "Tally";
DROP TABLE "Tally";
ALTER TABLE "new_Tally" RENAME TO "Tally";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
