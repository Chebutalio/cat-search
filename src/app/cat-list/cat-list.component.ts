import { Component, OnInit } from '@angular/core';
import { Breed, CatItem } from "../interfaces/cats.interface";
import { Select, Store } from "@ngxs/store";
import { CatsState } from "../store/cat.state";
import { debounceTime, Observable } from "rxjs";
import { AddCatsData, LoadCatsData } from "../store/cat.actions";
import { CatService } from "../services/cat.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})

export class CatListComponent implements OnInit {
  @Select(CatsState.getCatsData) catsData$!: Observable<CatItem[]>;

  public page: number = 1;
  public isMoreCats: boolean = true;
  public filterCatsForm!: FormGroup;
  public breeds: Breed[] = [];
  public isNoCats: boolean = false;
  constructor(
    private store: Store,
    private catService: CatService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.formInit();
    this.loadCats();
  }

  private loadCats(): void {
    const { results, breed } = this.filterCatsForm.value;
    this.store.dispatch(new LoadCatsData(this.page.toString(), results, breed));
    this.catsData$.pipe(debounceTime(300))
      .subscribe(res => {
        this.isNoCats = res.length === 0;
        this.isMoreCats = res.length >= parseInt(results, 10);
      });
  }

  public loadMoreCats(): void {
    const { results, breed } = this.filterCatsForm.value;
    this.page++
    this.catService.getCatsData(this.page.toString(), results, breed)
      .subscribe(cats => {
        this.isMoreCats = cats.length >= parseInt(results, 10);
        this.store.dispatch(new AddCatsData(cats));
      })
  }

  private loadBreeds(): void {
    this.catService.getBreeds()
      .subscribe(breeds => {
        this.breeds = breeds;
      });
  }

  private formInit(): void {
    this.filterCatsForm = this.formBuilder.group({
      results: ['10'],
      breed: ['none'],
    });

    this.loadBreeds();

    this.filterCatsForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.loadCats();
      });
  }
}
