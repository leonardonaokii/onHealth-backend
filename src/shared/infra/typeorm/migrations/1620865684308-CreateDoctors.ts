import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctors1620865684308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'crm',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'medical_specialty',
            type: 'int',
          },
          {
            name: 'rating',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'appointments_total',
            type: 'int',
            default: 0,
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
    await queryRunner.dropTable('doctors');
  }
}
