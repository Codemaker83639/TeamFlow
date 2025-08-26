import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentsAndAttachmentsTables1756243849444 implements MigrationInterface {
    name = 'CreateCommentsAndAttachmentsTables1756243849444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_attachments" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "file_path" character varying NOT NULL, "mime_type" character varying NOT NULL, "file_size_kb" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "task_id" uuid, "uploaded_by_user_id" uuid, CONSTRAINT "PK_34eb9e5133310a488eaba0be28a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "taskId" uuid, "userId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task_attachments" ADD CONSTRAINT "FK_8c07320adec50a39744a4a301d3" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_attachments" ADD CONSTRAINT "FK_b0c770603cc3a1397cbf51d337f" FOREIGN KEY ("uploaded_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`ALTER TABLE "task_attachments" DROP CONSTRAINT "FK_b0c770603cc3a1397cbf51d337f"`);
        await queryRunner.query(`ALTER TABLE "task_attachments" DROP CONSTRAINT "FK_8c07320adec50a39744a4a301d3"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "task_attachments"`);
    }

}
