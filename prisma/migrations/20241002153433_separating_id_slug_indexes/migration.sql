-- DropIndex
DROP INDEX "Polygon_id_slug_idx";

-- CreateIndex
CREATE INDEX "Polygon_id_idx" ON "Polygon"("id");

-- CreateIndex
CREATE INDEX "Polygon_slug_idx" ON "Polygon"("slug");
