package org.deb.stock.price.controller;

import org.deb.stock.price.model.StockPrice;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class StockPriceControllerTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void streamEvents() {
        // given
        StockPriceController stockPriceController = new StockPriceController();
        List<String> symbolist = new ArrayList<>();
        symbolist.add("D05:SGX");
        symbolist.add("O39:SGX");
        symbolist.add("U11:SGX");

        // when
        Flux<ServerSentEvent<StockPrice[]>> prices = stockPriceController.streamEvents(symbolist);

        // then
        Assertions.assertNotNull(prices);
        Assertions.assertTrue(prices.take(3).count().block() > 0);
        prices.take(3).subscribe(stockPrice -> {
            Assertions.assertTrue(stockPrice.data().length == 3);
            for (int i = 0; i < stockPrice.data().length; i++) {
                StockPrice eachStock = stockPrice.data()[i];
                double price = eachStock.getPrice();
                Assertions.assertTrue(price > 0 && price < 51);
                Assertions.assertTrue(symbolist.contains(eachStock.getSymbol()));
                Assertions.assertTrue(eachStock.getTrend().equals("Up") || eachStock.getTrend().equals("Down"));
            }
        });
    }
}