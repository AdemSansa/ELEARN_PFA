package com.Elearning.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ElearnApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElearnApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Adjust the path pattern if needed
						.allowedOrigins("http://localhost:4200") // Allow your frontend origin
						.allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed methods
						.allowedHeaders("*"); // Allow all headers (or specify if needed)
			}
		};
	}
}

