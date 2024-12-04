package com.Elearning.demo.MainPack.Components;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.*;

public class JwtUtil {
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256) ; // Replace with a strong secret key
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours
    private Set<String> blacklistedTokens = new HashSet<>();

    // Generate Token
    public String generateToken(String email,String name,String userId, List role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);   // Add user ID
        claims.put("name", name);  // Add user name
        claims.put("email", email); // Optional: Add email
        return Jwts.builder()
                .setSubject(email)
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    // Validate Token
    public boolean validateToken(String token) {
        try {
            if (isBlacklisted(token)) {
                return false; // Invalid if token is blacklisted
            }
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }

    }

    // Extract Email from Token
    public String extractUser(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    // Add a token to the blacklist
    public void addToBlacklist(String token) {
        blacklistedTokens.add(token);
    }

    // Check if a token is blacklisted
    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
    public String extractUserEmail(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return claims.get("email", String.class); // Extract user ID
    }
}
