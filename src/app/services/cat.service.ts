import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Breed, CatItem } from "../interfaces/cats.interface";
import { Injectable } from "@angular/core";

@Injectable()
export class CatService {
  public basicUrl = 'https://api.thecatapi.com/v1/images/search?'
  constructor(private http: HttpClient) {}

  public getCatsData(page: string, results: string, breed: string): Observable<CatItem[]> {
    return this.http.get<CatItem[]>(
      `${this.basicUrl}limit=${results}${breed === 'none' ? '' : '&breed_ids=' + breed}&page=${page}&order=asc&api_key=${environment.apiKey}`
    );
  }

  public getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(
      'https://api.thecatapi.com/v1/breeds'
    );
  }
}
