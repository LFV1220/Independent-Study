import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Article } from '../news-list/article.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '99f9ef006dca4e07bc8753982a5dd5c9';
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?country=us&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  searchNews(keyword: string): Observable<Article[]> {
    const url = `${this.apiUrl}/everything?q=${keyword}&apiKey=${this.apiKey}`;
    return this.http
      .get<any>(url)
      .pipe(map((response) => response.articles as Article[]));
  }
}
