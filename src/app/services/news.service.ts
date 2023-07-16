import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Article } from '../news-list/article.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '258ed2c59db2dbfcb1392126f6da4514';
  private apiUrl = 'https://gnews.io/api/v4';

  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    const url = `${this.apiUrl}/top-headlines?country=us&token=${this.apiKey}`;
    return this.http
      .get<any>(url)
      .pipe(map((response) => response.articles as Article[]));
  }

  searchNews(keyword: string): Observable<Article[]> {
    const url = `${this.apiUrl}/search?q=${keyword}&token=${this.apiKey}`;
    return this.http
      .get<any>(url)
      .pipe(map((response) => response.articles as Article[]));
  }
}
