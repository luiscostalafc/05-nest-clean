import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { execSync } from "child_process";

const prisma = new PrismaClient();
const schemaId = `test_${randomUUID().replace(/-/g, "_")}`;

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schemaId);
  return url.toString();
}

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId);
  process.env.DATABASE_URL = databaseURL;
  execSync("pnpm prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
