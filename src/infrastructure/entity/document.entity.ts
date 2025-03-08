import { Table, Column, PrimaryKey, DataType } from 'sequelize-typescript';
import { BaseEntity } from './base.entity';

@Table({ tableName: 'users', timestamps: false })
export class DocumentEntity extends BaseEntity<DocumentEntity>  {
  @PrimaryKey
  @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  documentName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  documentDetails: string;
}