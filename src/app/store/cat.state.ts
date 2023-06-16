import { Action, State, StateContext, Selector } from "@ngxs/store";
import { CatItem } from "../interfaces/cats.interface";
import { CatService } from "../services/cat.service";
import { AddCatsData, LoadCatsData } from "./cat.actions";
import { Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
@State<CatItem[]>({
  name: 'cats',
  defaults: []
})

export class CatsState {
  constructor(private catService: CatService) {}

  @Selector()
  static getCatsData(state: CatItem[]): CatItem[] {
    return state;
  }

  @Action(LoadCatsData)
  loadCatsData(ctx: StateContext<CatItem[]>, { page, results, breed }: LoadCatsData): Observable<CatItem[]> {
    return this.catService.getCatsData(page, results, breed)
      .pipe(tap((data: CatItem[]) => {
        ctx.setState(data);
      }));
  }

  @Action(AddCatsData)
  addCatsData(ctx: StateContext<CatItem[]>, { payload }: AddCatsData) {
    ctx.setState((state) => [...state, ...payload]);
  }
}
