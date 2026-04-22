package com.accenture.lkm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS configuration.
 * Allows all origins so that the React frontend (whether served by Nginx,
 * API Gateway, or a local dev server) can reach the backend without CORS errors.
 *
 * In a hardened production setup, replace "*" with your specific ALB/API GW domain.
 */
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")          // covers every endpoint
                        .allowedOriginPatterns("*") // allow all origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(false)    // must be false when origin is "*"
                        .maxAge(3600);
            }
        };
    }
}
