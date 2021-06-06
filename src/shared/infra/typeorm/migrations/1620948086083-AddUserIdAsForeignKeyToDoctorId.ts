import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddUserIdAsForeignKeyToDoctorId1620948086083
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'doctors',
      new TableForeignKey({
        name: 'UserDoctor',
        columnNames: ['id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('doctors', 'UserDoctor');
  }
}
