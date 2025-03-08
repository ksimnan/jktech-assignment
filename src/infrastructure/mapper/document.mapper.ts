import { Injectable } from '@nestjs/common';
import { Document } from '../../domain/document/document';
import { DocumentEntity } from '../entity/document.entity';

@Injectable()
export class DocumentMapper {
    toPersistance(document: Document): DocumentEntity {
        return new DocumentEntity(document as any);
    }
  toDomain(entity: DocumentEntity): Document {
    return new Document({
      id: entity.id,
      documentDetails: entity.documentDetails,
      documentName: entity.documentName,
      createdBy: entity.createdBy,
      createdDateTime: entity.createdDateTime,
      modifiedDateTime: entity.modifiedDateTime,
      modifiedBy: entity.modifiedBy,
    });
  }
}
