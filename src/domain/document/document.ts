export type DocumentEssentialProperties = Required<{
    readonly id: string;
    readonly documentName: string;
    readonly documentDetails: string;
    readonly createdBy: string;
    readonly createdDateTime: Date;
}>;

export type DocumentOptionalProperties = Partial<{
    readonly modifiedDateTime?: Date;
    readonly modifiedBy?: string;
}>;

export type UserProperties = DocumentEssentialProperties & Required<DocumentOptionalProperties>;

export class Document  {
    readonly id: string;
    readonly documentName: string;
    readonly documentDetails: string;
    readonly createdBy: string;
    readonly createdDateTime: Date;
    readonly modifiedDateTime?: Date;
    readonly modifiedBy?: string;

    constructor(properties: DocumentEssentialProperties & DocumentOptionalProperties) {
        Object.assign(this, properties);
    }
}
