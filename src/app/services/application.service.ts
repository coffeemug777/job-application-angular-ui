import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from './opening.service';

const applicationServiceUrl = 'http://localhost:8081/api/application';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getById(appId: string) {
    return this.http.get(applicationServiceUrl + '/' + appId);
  }

  add(value: Application): Observable<Application> {
    return this.http.post(
      applicationServiceUrl,
      value
    ) as Observable<Application>;
  }

  update(id: string, value: Application) {
    return this.http.put(applicationServiceUrl + '/update/' + id, value);
  }
}
