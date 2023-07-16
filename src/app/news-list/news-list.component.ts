import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  newsList: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.searchNews();
  }

  searchNews() {
    const keyword = this.searchTerm || 'Tampa FL';
    this.isLoading = true;
    this.newsService.searchNews(keyword).subscribe((articles) => {
      this.newsList = articles;
      this.isLoading = false;
    });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }
}
