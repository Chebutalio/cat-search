import { CatItem } from "../interfaces/cats.interface";

export class LoadCatsData {
  static readonly type = '[Cats] Load Data';
  constructor(public page: string, public results: string, public breed: string) {}
}

export class AddCatsData {
  static readonly type = '[Cats] Add Data';
  constructor(public payload: CatItem[]) {}
}
