import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { StockPrice } from 'src/app/model/stock-price';
import { BackendService } from 'src/app/service/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pricedisplay',
  templateUrl: './pricedisplay.component.html',
  styleUrls: ['./pricedisplay.component.css']
})
export class PricedisplayComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['symbol', 'price', 'trend'];

  public stockPrices: StockPrice[] = [];


  public dataSource = new MatTableDataSource<StockPrice>(this.stockPrices);
  sub: Subscription;



  constructor(private backendService: BackendService, private zone: NgZone) {


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
