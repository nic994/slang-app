import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SlangWordsEntry } from './SlangWordsEntry.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://unofficialurbandictionaryapi.com/api/search';
  constructor(private http: HttpClient) {}

  search(term: string): Observable<SlangWordsEntry[]> {
    return this.http
      .get<{ data: SlangWordsEntry[] }>(`${this.baseUrl}?term=${term}`)
      .pipe(map((response: { data: any }) => response.data));
  }
}
