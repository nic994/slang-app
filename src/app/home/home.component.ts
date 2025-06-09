import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlangWordsEntry } from '../SlangWordsEntry.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  term: string = '';
  results: SlangWordsEntry[] = [];
  searchStarted: boolean = false;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {}

  search(): void {
    if (this.term.trim() !== '') {
      this.apiService.search(this.term).subscribe(
        (entries) => {
          this.results = entries;
          this.searchStarted = true;
        },
        (error) => {
          if (error.status === 404) {
            // Word not found
            this.results = [];
            this.searchStarted = true;
          } else {
          }
        }
      );
    } else {
      this.results = [];
      this.searchStarted = false;
    }
  }
}
