import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointmentsSymptoms1623821701394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'appointments_symptoms',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'appointment_id',
                  type: 'uuid',
                  isNullable: true,
                },
                {
                  name: 'symptom_id',
                  type: 'int',
                  isNullable: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments_symptoms');
    }

}
