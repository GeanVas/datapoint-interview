import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1771727876407 implements MigrationInterface {
  name = 'InitialMigration1771727876407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "status" text NOT NULL, "priority" text NOT NULL, "dueDate" datetime, "ownerId" integer NOT NULL, "createdAt" datetime NOT NULL, "updatedAt" datetime)`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "status" text NOT NULL, "priority" text NOT NULL, "dueDate" datetime, "ownerId" integer NOT NULL, "createdAt" datetime NOT NULL, "updatedAt" datetime, CONSTRAINT "FK_607de52438268ab19a406349427" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_tasks"("id", "title", "description", "status", "priority", "dueDate", "ownerId", "createdAt", "updatedAt") SELECT "id", "title", "description", "status", "priority", "dueDate", "ownerId", "createdAt", "updatedAt" FROM "tasks"`,
    );
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "status" text NOT NULL, "priority" text NOT NULL, "dueDate" datetime, "ownerId" integer NOT NULL, "createdAt" datetime NOT NULL, "updatedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "tasks"("id", "title", "description", "status", "priority", "dueDate", "ownerId", "createdAt", "updatedAt") SELECT "id", "title", "description", "status", "priority", "dueDate", "ownerId", "createdAt", "updatedAt" FROM "temporary_tasks"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_tasks"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
