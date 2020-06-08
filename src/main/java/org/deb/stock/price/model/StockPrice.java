package org.deb.stock.price.model;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockPrice {
    private  String symbol;
    private double price;
    private String trend;
    private LocalDateTime time;


}
