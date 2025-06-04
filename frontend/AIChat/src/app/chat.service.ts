import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../environment';
import { catchError, map } from 'rxjs/operators';
import { ChatMessage } from './models/chat.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  

  constructor(private http: HttpClient) {
    
  }

  sendMessage(message: string): Observable<ChatMessage> {
    const url = `${environment.apiUrl}/chat`;
    const body = { content: message };

    return this.http.post<ChatMessage>(url, body);
  }

  newChat(): Observable<string> {
    const url = `${environment.apiUrl}/new_chat`;

    return this.http.post<string>(url, {});
  }
} 