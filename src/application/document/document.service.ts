import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../../infrastructure/repository/document.repository';
import { Document } from '../../domain/document/document';



@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  // Add a new Document
  async addDocument(documentDetail: Document): Promise<Document> {
    return this.documentRepository.addDocument(documentDetail);
  }

  // Find Document by ID
  async findDocumentById(id: string): Promise<Document> {
    const Document = await this.documentRepository.findDocumentById(id);
    if (!Document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return Document;
  }


  // Update Document by ID
  async updateDocumentById(id: string, documentDetail: Document): Promise<boolean> {
    const existingDocument = await this.findDocumentById(id);
    if (!existingDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return this.documentRepository.updateDocumentById(id, documentDetail);
  }

  // Delete Document by ID
  async deleteDocumentById(id: string): Promise<boolean> {
    const existingDocument = await this.findDocumentById(id);
    if (!existingDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return this.documentRepository.deleteDocumentById(id);
  }
}