import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class AddAppointmentIdAndSymptomIdAsForeignKeyToAppointmentsSymptoms1623822113930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'appointments_symptoms',
            new TableForeignKey({
              name: 'AppointmentsSymptomsAppointment',
              columnNames: ['appointment_id'],
              referencedTableName: 'appointments',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            }),
        );

          await queryRunner.createForeignKey(
            'appointments_symptoms',
            new TableForeignKey({
              name: 'AppointmentsSymptomsSymptom',
              columnNames: ['symptom_id'],
              referencedTableName: 'symptoms',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            }),
        );
          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments_symptoms', 'AppointmentsSymptomsSymptom');

        await queryRunner.dropForeignKey('appointments_symptoms', 'AppointmentsSymptomsAppointment');
    }

}
