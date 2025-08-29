import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTimeEntriesTable1756415146699 implements MigrationInterface {
    name = 'CreateTimeEntriesTable1756415146699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_entries" ("id" SERIAL NOT NULL, "description" text, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE, "duration_minutes" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "task_id" uuid, "user_id" uuid, CONSTRAINT "PK_b8bc5f10269ba2fe88708904aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_entries" ADD CONSTRAINT "FK_104aa11ede7c8d5afbbe1fdbb24" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_entries" ADD CONSTRAINT "FK_f16c3c269283ee42429d09d693d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_entries" DROP CONSTRAINT "FK_f16c3c269283ee42429d09d693d"`);
        await queryRunner.query(`ALTER TABLE "time_entries" DROP CONSTRAINT "FK_104aa11ede7c8d5afbbe1fdbb24"`);
        await queryRunner.query(`DROP TABLE "time_entries"`);
    }

}
