import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1756405643697 implements MigrationInterface {
    name = 'CreateNotificationsTable1756405643697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "message" character varying(255) NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "recipient_id" uuid, "task_id" uuid, "project_id" uuid, "team_id" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_5332a4daa46fd3f4e6625dd275d" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_b4a7cd30c9f4ca1b23ef0eb6dd8" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_95464140d7dc04d7efb0afd6be0" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_b71f6686254f9e0c8aa707aa64e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_b71f6686254f9e0c8aa707aa64e"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_95464140d7dc04d7efb0afd6be0"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_b4a7cd30c9f4ca1b23ef0eb6dd8"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_5332a4daa46fd3f4e6625dd275d"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
