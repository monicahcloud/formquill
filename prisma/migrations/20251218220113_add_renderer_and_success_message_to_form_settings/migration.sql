-- AlterTable
ALTER TABLE "FormSettings" ADD COLUMN     "renderer" VARCHAR(16) NOT NULL DEFAULT 'classic',
ADD COLUMN     "successMessage" TEXT NOT NULL DEFAULT 'Thanks! We received your response.';
