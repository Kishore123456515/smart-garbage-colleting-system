package com.smartgarbage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartGarbageBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartGarbageBackendApplication.class, args);
    }
}

