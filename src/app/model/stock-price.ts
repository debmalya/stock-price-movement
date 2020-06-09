import { Time } from '@angular/common';
import { Deserializable } from './deserializable';


export class StockPrice implements Deserializable {
   public symbol: string;
   public price: Number;
   public trend: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
  constructor() { }
}

