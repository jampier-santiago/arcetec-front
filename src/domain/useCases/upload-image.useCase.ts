// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { FileRepository } from '../repositories/file.respository';

export class UploadFileUseCase implements UseCase<string, { url: string }> {
  constructor(private readonly fileRepository: FileRepository) {}

  // * Implementation of the use case to filter a category from the database
  // * You can only filter by gave the category name
  execute(data: string): Observable<{ url: string }> {
    return this.fileRepository.uploadFile(data);
  }
}
