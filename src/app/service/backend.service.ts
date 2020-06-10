import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { StockPrice } from '../model/stock-price';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  stockPrices: StockPrice[] = [];
  eachStockPrice = new StockPrice();
  private stockPricesWatch = new BehaviorSubject(this.stockPrices);
  _stockPricesWatch: Observable<StockPrice[]> = this.stockPricesWatch.asObservable();


  constructor(private zone: NgZone) {
    this.getStockPriceList().subscribe(data => {
      this.stockPrices = JSON.parse(JSON.stringify(data));
      this.stockPricesWatch.next(this.stockPrices);
    }, error => console.log('Error: ' + error), () => console.log('done loading stock stream'));
  }

  private stockPriceURL = '/api/stock/price/v0/stream-sse/%5BD05:SGX,O39:SGX,U11:SGX%5D';



  getStockPriceList(): Observable<StockPrice[]> {
    return new Observable((observer) => {

      let eventSource = new EventSource(this.stockPriceURL);

      eventSource.onmessage = (event) => {
        let json = JSON.parse(event.data);
        if (json !== undefined && json !== '') {
          this.zone.run(() => observer.next(json));
        }
      };


      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }


      eventSource.onopen = (event) => {
        console.log("Opened event source :" + eventSource.readyState);
      }

      eventSource.close = () => {
        console.log("Closed event source :" + +eventSource.readyState);
      }


    });
  }
}
