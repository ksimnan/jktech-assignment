import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IDocumentRepository } from '../../domain/document/repository';
import { Document } from '../../domain/document/document';
import { DocumentEntity } from '../entity/document.entity';
import { DocumentMapper } from '../mapper/document.mapper';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly documentMapper: DocumentMapper, 
  ) {}

  async addDocument(documentDetail: Document): Promise<Document> {
    const entity = await this.sequelize
      .getRepository(DocumentEntity)
      .create(this.documentMapper.toPersistance(documentDetail));
    return this.documentMapper.toDomain(entity);
  }

  async findDocumentById(id: string): Promise<Document | null> {
    const entity = await this.sequelize.getRepository(DocumentEntity).findOne({
      where: { id },
    });
    if (!entity) return null;
    return this.documentMapper.toDomain(entity);
  }

    async updateDocumentById(id: string, documentDetail: Document): Promise<boolean> {
    await await this.sequelize.getRepository(DocumentEntity).update(this.documentMapper.toPersistance(documentDetail), {
      where: {id },
    });
    return true;
  }

  async deleteDocumentById(id: string): Promise<boolean> {
    const deleted = await this.sequelize.getRepository(DocumentEntity).destroy({
      where: { id },
    });
    return deleted > 0;
  }
}
