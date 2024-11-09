package com.hml;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@MapperScan("com.hml.mapper")
@SpringBootApplication
@EnableSwagger2
public class WocaoApplication {

    public static void main(String[] args) {
        SpringApplication.run(WocaoApplication.class, args);
    }

}
