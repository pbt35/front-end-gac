-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Operation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "toUserId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reversed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Operation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Operation_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Operation" ("amount", "createdAt", "id", "reversed", "toUserId", "type", "userId") SELECT "amount", "createdAt", "id", "reversed", "toUserId", "type", "userId" FROM "Operation";
DROP TABLE "Operation";
ALTER TABLE "new_Operation" RENAME TO "Operation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
