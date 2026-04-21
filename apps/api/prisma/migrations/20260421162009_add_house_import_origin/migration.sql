-- AlterTable
ALTER TABLE "House" ADD COLUMN     "originGroup" TEXT,
ADD COLUMN     "originSections" TEXT[] DEFAULT ARRAY[]::TEXT[];
