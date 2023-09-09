import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

  /* Using data.ts*/

  // getAll(): Food[] {
  //   return sample_foods;
  // }

  // getFoodById(foodId: string) {
  //   return sample_foods.find((x) => x.id === foodId) ?? new Food();
  // }

  // getAllFoodsBySearchTerm(searchTerm: string) {
  //   return this.getAll().filter((food) =>
  //     food.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  // getAllTags(): Tag[] {
  //   return sample_tags;
  // }

  // getAllFoodsByTag(tag: string): Food[] {
  //   return tag == 'All'
  //     ? this.getAll()
  //     : this.getAll().filter((food) => food.tags?.includes(tag));
  // }

  /* using http */

  // getAll(): Observable<Food[]> {
  //   return this.http.get<Food[]>(FOODS_URL);
  // }

  // getFoodById(foodId: string): Observable<Food> {
  //   return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  // }

  // getAllFoodsBySearchTerm(searchTerm: string) {
  //   return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  // }

  // getAllTags(): Observable<Tag[]> {
  //   return this.http.get<Tag[]>(FOODS_TAGS_URL);
  // }

  // getAllFoodsByTag(tag: string): Observable<Food[]> {
  //   return tag == 'All'
  //     ? this.getAll()
  //     : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  // }
}
