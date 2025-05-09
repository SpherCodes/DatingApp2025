import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_Models/member';
import { PaginatedResult } from '../_Models/pagination';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginatedResults = signal<PaginatedResult<Member[]> | null>(null);

  toggleLike(targetId: number) {
    return this.http.post(`${this.baseUrl}likes/${targetId}`, {})
  }
  
  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params =  setPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);
    return this.http.get<Member[]>(`${this.baseUrl}likes?predicate=${predicate}`,
      { observe: 'response', params }).subscribe({
        next: response => setPaginatedResponse(response, this.paginatedResults),
      });
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }
}