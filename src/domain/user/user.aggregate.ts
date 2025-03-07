import { AggregateRoot } from '@nestjs/cqrs';


export type UserEssentialProperties = Required<{
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly role: boolean;
    readonly createdBy: string;
    readonly createdDateTime: Date;
}>;

export type UserOptionalProperties = Partial<{
    readonly modifiedDateTime?: Date;
    readonly modifiedBy?: string;
}>;

export type KpiProperties = UserEssentialProperties & Required<UserOptionalProperties>;

export class User extends AggregateRoot {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly role: boolean;
    readonly createdBy: string;
    readonly createdDateTime: Date;
    readonly modifiedDateTime?: Date;
    readonly modifiedBy?: string;

    constructor(properties: UserEssentialProperties & UserOptionalProperties) {
        super();
        Object.assign(this, properties);
    }
}

