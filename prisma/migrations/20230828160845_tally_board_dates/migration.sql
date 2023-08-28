-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TallyBoard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leagueId" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL,
    "awayId" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,
    "halfHomeScore" INTEGER NOT NULL DEFAULT 0,
    "halfAwayScore" INTEGER NOT NULL DEFAULT 0,
    "homeScore" INTEGER NOT NULL DEFAULT 0,
    "awayScore" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TallyBoard_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TallyBoard_awayId_fkey" FOREIGN KEY ("awayId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TallyBoard_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TallyBoard" ("awayId", "awayScore", "halfAwayScore", "halfHomeScore", "homeId", "homeScore", "id", "leagueId", "open") SELECT "awayId", "awayScore", "halfAwayScore", "halfHomeScore", "homeId", "homeScore", "id", "leagueId", "open" FROM "TallyBoard";
DROP TABLE "TallyBoard";
ALTER TABLE "new_TallyBoard" RENAME TO "TallyBoard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
