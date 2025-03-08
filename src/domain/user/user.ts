export type UserEssentialProperties = Required<{
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly createdBy: string;
    readonly createdDateTime: Date;
}>;

export type UserOptionalProperties = Partial<{
    readonly modifiedDateTime?: Date;
    readonly modifiedBy?: string;
}>;

export type UserProperties = UserEssentialProperties & Required<UserOptionalProperties>;

export class User  {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly createdBy: string;
    readonly createdDateTime: Date;
    readonly modifiedDateTime?: Date;
    readonly modifiedBy?: string;

    constructor(properties: UserEssentialProperties & UserOptionalProperties) {
        Object.assign(this, properties);
    }
}
