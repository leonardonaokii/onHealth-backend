import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddMedicalSpecialtyIdAsForeignKeytoDoctorMedicalSpecialty1622781824014
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'doctors',
      new TableForeignKey({
        name: 'DoctorsMedicalSpecialty',
        columnNames: ['medical_specialty'],
        referencedColumnNames: ['id'],
        referencedTableName: 'medical_specialty',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('doctors', 'DoctorsMedicalSpecialty');
  }
}
