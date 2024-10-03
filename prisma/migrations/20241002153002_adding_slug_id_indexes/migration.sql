-- CreateIndex
CREATE INDEX "Change_id_idx" ON "Change"("id");

-- CreateIndex
CREATE INDEX "Polygon_id_slug_idx" ON "Polygon"("id", "slug");

-- CreateIndex
CREATE INDEX "Relation_id_idx" ON "Relation"("id");

-- CreateIndex
CREATE INDEX "User_id_email_idx" ON "User"("id", "email");

-- CreateIndex
CREATE INDEX "Website_id_idx" ON "Website"("id");
