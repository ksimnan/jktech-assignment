import { Table, Column, PrimaryKey, DataType } from 'sequelize-typescript';
import { BaseEntity } from './base.entity';

@Table({ tableName: 'users', timestamps: true })
export class UserEntity extends BaseEntity<UserEntity>  {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
})
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.ENUM('admin', 'editor', 'viewer'), allowNull: false })
  role: 'admin' | 'editor' | 'viewer';
}
