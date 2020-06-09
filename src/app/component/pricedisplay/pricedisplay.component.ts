import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { StockPrice } from 'src/app/model/stock-price';
import { BackendService } from 'src/app/service/backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { cornsilk } from 'color-name';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-pricedisplay',
  templateUrl: './pricedisplay.component.html',
  styleUrls: ['./pricedisplay.component.css']
})
export class PricedisplayComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['symbol', 'price', 'trend'];
  // public dataSource = new MatTableDataSource<StockPrice>();

  public stockPrices: StockPrice[] = [];

  stockPriceDBS = new StockPrice();


  // public dataSource = new MatTableDataSource<StockPrice>();
  sub: Subscription;
// dataSource = stock


  constructor(private backendService: BackendService, private zone: NgZone) {
      this.stockPriceDBS.price=1.007;
      this.stockPriceDBS.symbol="DBS";
      this.stockPriceDBS.trend="UP";
      this.stockPrices.push(this.stockPriceDBS);
  }

  ngOnInit(): void {
    this.sub = this.backendService._stockPricesWatch.subscribe(value => {
      if (value !== undefined && value !== null) {
        // this.stockPrices = [].concat(value);
        this.stockPrices = value;
        // this.dataSource.data = this.stockPrices;
        // console.log("this.dataSource.data :" + JSON.stringify(this.dataSource.data));
        console.log("this.stockPrices :" + JSON.stringify(this.stockPrices));
        // console.log("this.stockPrices.map :" + JSON.stringify(this.stockPrices.map));
        // console.log("this.stockPrices.entries :" + JSON.stringify(this.stockPrices.entries));
        // console.log("this.stockPrices.values :" + JSON.stringify(this.stockPrices.values));
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * Subscribe to the necessary backend data services
   */
  private loadStockPrices(): void {

  }



}
