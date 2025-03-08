import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { DocumentRepository } from '../../infrastructure/repository/document.repository';
import { NotFoundException } from '@nestjs/common';
import { Document } from '../../domain/document/document';

describe('DocumentService', () => {
  let documentService: DocumentService;
  let documentRepository: DocumentRepository;

  const mockDocumentRepository = {
    addDocument: jest.fn(),
    findDocumentById: jest.fn(),
    updateDocumentById: jest.fn(),
    deleteDocumentById: jest.fn(),
  };

  const mockDocument: Document = {
    id: '1',
    documentName: 'Test Document',
    documentDetails: 'This is a test document',
    createdBy: 'created by',
    createdDateTime: new Date()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        { provide: DocumentRepository, useValue: mockDocumentRepository },
      ],
    }).compile();

    documentService = module.get<DocumentService>(DocumentService);
    documentRepository = module.get<DocumentRepository>(DocumentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addDocument', () => {
    it('should add a document successfully', async () => {
      mockDocumentRepository.addDocument.mockResolvedValue(mockDocument);

      const result = await documentService.addDocument(mockDocument);
      expect(result).toEqual(mockDocument);
      expect(mockDocumentRepository.addDocument).toHaveBeenCalledWith(mockDocument);
    });
  });

  describe('findDocumentById', () => {
    it('should return a document if found', async () => {
      mockDocumentRepository.findDocumentById.mockResolvedValue(mockDocument);

      const result = await documentService.findDocumentById('1');
      expect(result).toEqual(mockDocument);
      expect(mockDocumentRepository.findDocumentById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if document is not found', async () => {
      mockDocumentRepository.findDocumentById.mockResolvedValue(null);

      await expect(documentService.findDocumentById('2')).rejects.toThrow(NotFoundException);
      expect(mockDocumentRepository.findDocumentById).toHaveBeenCalledWith('2');
    });
  });

  describe('updateDocumentById', () => {
    it('should update a document if it exists', async () => {
      mockDocumentRepository.findDocumentById.mockResolvedValue(mockDocument);
      mockDocumentRepository.updateDocumentById.mockResolvedValue(true);

      const result = await documentService.updateDocumentById('1', mockDocument);
      expect(result).toBe(true);
      expect(mockDocumentRepository.updateDocumentById).toHaveBeenCalledWith('1', mockDocument);
    });

    it('should throw NotFoundException if document does not exist', async () => {
      mockDocumentRepository.findDocumentById.mockResolvedValue(null);

      await expect(documentService.updateDocumentById('2', mockDocument)).rejects.toThrow(NotFoundException);
      expect(mockDocumentRepository.findDocumentById).toHaveBeenCalledWith('2');
    });
  });

  describe('deleteDocumentById', () => {
    it('should delete a document if it exists', async () => {
      mockDocumentRepository.findDocumentById.mockResolvedValue(mockDocument);
      mockDocumentRepository.deleteDocumentById.mockResolvedValue(true);

      const result = await documentService.deleteDocumentById('1');
      expect(result).toBe(true);
      expect(mockDocumentRepository.deleteDocumentById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if document does not exist', async () => {
      mockDocumentRepository.findDocumentById.mockResolvedValue(null);

      await expect(documentService.deleteDocumentById('2')).rejects.toThrow(NotFoundException);
      expect(mockDocumentRepository.findDocumentById).toHaveBeenCalledWith('2');
    });
  });
});
