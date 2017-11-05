package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

@SpringBootApplication
public class MainApp extends SpringBootServletInitializer {

	public static void main(String[] args) {
		System.out.println("starting embedded tomcat");
		SpringApplication.run(MainApp.class, args);

	}
	
	@Override
	protected final SpringApplicationBuilder configure(final SpringApplicationBuilder application){
		return application.sources(MainApp.class);
	}
	

}
