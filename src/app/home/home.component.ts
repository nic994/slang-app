import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlangWordsEntry } from '../SlangWordsEntry.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  term: string = '';
  results: SlangWordsEntry[] = [];
  searchStarted: boolean = false;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.search();
  }

  search(): void {
    if (this.term.trim() !== '') {
      this.apiService.search(this.term).subscribe({
        next: (entries) => {
          this.results = entries;
          this.searchStarted = true;
        },
        error: (error) => {
          if (error.status === 404) {
            this.results = [];
            this.searchStarted = true;
          }
        },
      });
    } else {
      this.results = [];
      this.searchStarted = false;
    }
  }

  clearResults() {
    this.results = [];
    this.searchStarted = false;
  }
  logo = '../../asset/image/logo2.png';
}
