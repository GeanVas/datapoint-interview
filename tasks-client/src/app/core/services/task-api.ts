import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../shared/models/task';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Status } from '../../shared/models/status';

@Injectable({
  providedIn: 'root'
})
export class TaskApi {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;
  private readonly httpClient = inject(HttpClient);

  getTasks(status?: Status): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl, { params: { status: status ?? '' } });
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Exclude<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    return this.httpClient.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
