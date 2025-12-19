-- CreateTable
CREATE TABLE "FormTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'General',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "fields" JSONB NOT NULL,
    "renderer" VARCHAR(16) NOT NULL DEFAULT 'classic',
    "successMessage" TEXT NOT NULL DEFAULT 'Thanks! We received your response.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormTemplate_slug_key" ON "FormTemplate"("slug");
