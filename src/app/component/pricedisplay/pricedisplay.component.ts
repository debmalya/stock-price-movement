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

  // stockPriceDBS = new StockPrice();


  public dataSource = new MatTableDataSource<StockPrice>(this.stockPrices);
  sub: Subscription;
  // dataSource = stock


  constructor(private backendService: BackendService, private zone: NgZone, private changeDetectorRefs: ChangeDetectorRef) {


  }

  ngOnInit(): void {
    this.sub = this.backendService._stockPricesWatch.subscribe(value => {
      if (value !== undefined && value !== null) {
        // console.log(JSON.stringify(value.values));
        value.forEach((e)=>{
          // JSON.parse(e.);
          console.log("Each :" + JSON.stringify(e))
        });
        this.dataSource.connect();
        this.stockPrices =value;
        this.dataSource.data = this.stockPrices;
        this.changeDetectorRefs.detectChanges();
      }
    });

  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
    this.sub.unsubscribe();
  }

  /**
   * Subscribe to the necessary backend data services
   */
  private loadStockPrices(): void {

  }



}
