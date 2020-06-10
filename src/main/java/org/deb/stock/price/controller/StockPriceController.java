package org.deb.stock.price.controller;

import lombok.extern.slf4j.Slf4j;
import org.deb.stock.price.model.StockPrice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/stock/price/v0")
@Slf4j
public class StockPriceController {
  
  private ConcurrentHashMap<String, Double> priceMap = new ConcurrentHashMap<>();


  @GetMapping(value="/stream-sse/[{symbols}]")
  public Flux<ServerSentEvent<StockPrice[]>> streamEvents(@PathVariable List<String> symbols) {
    return Flux.interval(Duration.ofSeconds(1))
      .map(e -> ServerSentEvent.<StockPrice[]> builder()
        .id(String.valueOf(e))
        .event("message")
        .data(getPrice(symbols))
        .comment("Periodic stock price update")
        .build());
  }

  // This will call API to get the price for symbol
  private StockPrice[] getPrice(List<String> allSymbols) {
    StockPrice[] prices = new StockPrice[allSymbols.size()];
    for (int i = 0; i < allSymbols.size(); i++) {
      // TODO : Change to real API Call to get the price
      String currentSymbol = allSymbols.get(i);
      double price = ThreadLocalRandom.current().nextDouble(50);
      Double previousPrice = priceMap.get(currentSymbol);
      if (previousPrice == null) {
        previousPrice = 0.00;
      }
      StockPrice stockPrice = new StockPrice(currentSymbol, price, price - previousPrice > 0 ? "Up" : "Down", LocalDateTime.now());
      priceMap.put(currentSymbol, price);
      prices[i] = stockPrice;
    }
    return prices;
  }

}
