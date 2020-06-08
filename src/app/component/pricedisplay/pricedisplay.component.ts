import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { StockPrice } from 'src/app/model/stock-price';
import { BackendService } from 'src/app/service/backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { cornsilk } from 'color-name';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pricedisplay',
  templateUrl: './pricedisplay.component.html',
  styleUrls: ['./pricedisplay.component.css']
})
export class PricedisplayComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['symbol', 'price', 'trend'];
  // public dataSource = new MatTableDataSource<StockPrice>();

  stockPrices: StockPrice[] = [];
  dataSource = new MatTableDataSource(this.stockPrices);
  sub : Subscription


  constructor(private backendService: BackendService, private zone: NgZone) {

  }

  ngOnInit(): void {
    this.loadStockPrices();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  /**
   * Subscribe to the necessary backend data services
   */
  private loadStockPrices(): void {
    this.sub = this.backendService._stockPricesWatch.subscribe(value => {
      if (value !== undefined && value !== null) {
        this.stockPrices = [].concat(value);
        this.dataSource.data = this.stockPrices;
        console.log("this.stockPrices :" + JSON.stringify(this.dataSource.data.values));
      }
    });
  }



}
