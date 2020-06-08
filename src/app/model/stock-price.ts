import { Time } from '@angular/common';
import { Deserializable } from './deserializable';


export class StockPrice implements Deserializable {
   symbol: string;
   price: Number;
   trend: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
  constructor() { }
}

