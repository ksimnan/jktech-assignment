import { Document } from "./document";

export interface IDocumentRepository{
    addDocument(documentDetail: Document): Promise<Document>;
    findDocumentById(id: string): Promise<Document | null>;
    updateDocumentById(id: string, DocumentDetail: Document): Promise<boolean>;
    deleteDocumentById(id:string): Promise<boolean>
}