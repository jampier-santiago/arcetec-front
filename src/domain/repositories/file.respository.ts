// Packages
import { Observable } from 'rxjs';

export abstract class FileRepository {
  // * user login
  abstract uploadFile(data: any): Observable<{ url: string }>;
}
