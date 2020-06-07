package org.deb.stock.price.controller;

import org.deb.stock.price.model.StockPrice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/stock/price/v0")
public class StockPriceController {
    @Value("${retryCount:5}")
    private int retryCount;

    @GetMapping(value="/[{symbols}]",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<StockPrice[]> price(@PathVariable List<String> symbols){
        return Flux.interval(Duration.ofSeconds(1)).map(e->getPrice(symbols)).retry(retryCount);
    }

    // This will call API to get the price for symbol
    private StockPrice[] getPrice(List<String> allSymbols) {
           StockPrice[] prices = new StockPrice[allSymbols.size()];
           for (int i = 0; i < prices.length; i++){
                  // TODO : Change to real API Call to get the price
                  double price = ThreadLocalRandom.current().nextDouble(500);
                  StockPrice stockPrice = new StockPrice(allSymbols.get(i),price,LocalDateTime.now());
                  prices[i]=stockPrice;
           }
           return prices;
    }

}
