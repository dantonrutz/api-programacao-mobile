-- CreateEnum
CREATE TYPE "public"."RoleEnum" AS ENUM ('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "roles" "public"."RoleEnum"[] DEFAULT ARRAY['STUDENT']::"public"."RoleEnum"[];
