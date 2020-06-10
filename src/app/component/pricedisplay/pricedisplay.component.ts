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


  public dataSource = new MatTableDataSource<StockPrice>(this.stockPrices);
  sub: Subscription;



  constructor(private backendService: BackendService, private zone: NgZone, private changeDetectorRefs: ChangeDetectorRef) {


  }

  ngOnInit(): void {
    this.sub = this.backendService._stockPricesWatch.subscribe(value => {
      if (value !== undefined && value !== null) {
        this.stockPrices = value;
        this.dataSource.data = this.stockPrices;
      }
    });

  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
    this.sub.unsubscribe();
  }

}
