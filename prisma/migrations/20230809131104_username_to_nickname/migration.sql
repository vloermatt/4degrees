/*
  Warnings:

  - You are about to drop the column `username` on the `Tally` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `Tally` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tally" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "away" INTEGER NOT NULL,
    "home" INTEGER NOT NULL
);
INSERT INTO "new_Tally" ("avatar", "away", "home", "id") SELECT "avatar", "away", "home", "id" FROM "Tally";
DROP TABLE "Tally";
ALTER TABLE "new_Tally" RENAME TO "Tally";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
