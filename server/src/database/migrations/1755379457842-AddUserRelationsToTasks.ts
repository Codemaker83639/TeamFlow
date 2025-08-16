import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRelationsToTasks1755379457842 implements MigrationInterface {
    name = 'AddUserRelationsToTasks1755379457842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "created_by_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "assigned_to_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_0804c9432857e4d333583f5afe1" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_9430f12c5a1604833f64595a57f" FOREIGN KEY ("assigned_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_9430f12c5a1604833f64595a57f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_0804c9432857e4d333583f5afe1"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "assigned_to_id"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "created_by_id"`);
    }

}
