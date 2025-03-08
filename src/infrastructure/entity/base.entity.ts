import { Column, DataType, Model } from 'sequelize-typescript';

export class BaseEntity<T extends {}> extends Model<T> {
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdDateTime: Date;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    createdBy: string;

    @Column({
        type: DataType.DATE,
    })
    modifiedDateTime?: Date;

    @Column({
        type: DataType.UUID,
    })
    modifiedBy?: string;
}
