import { Column, DataType, Model } from 'sequelize-typescript';

export class BaseEntity<T> extends Model<T> {
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    CreatedDateTime: Date;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    CreatedBy: string;

    @Column({
        type: DataType.DATE,
    })
    ModifiedDateTime: Date;

    @Column({
        type: DataType.UUID,
    })
    ModifiedBy: string;
}
