package com.music.userservice.controller;

import com.music.userservice.entity.FavoriteArtist;
import com.music.userservice.repository.FavoriteArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorite-artists")
public class FavoriteArtistController {

    @Autowired
    private FavoriteArtistRepository favoriteArtistRepository;

    @PostMapping
    public ResponseEntity<FavoriteArtist> addFavoriteArtist(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long artistId = request.get("artistId");

        if (userId == null || artistId == null) {
            return ResponseEntity.badRequest().build();
        }

        // Check if already exists
        if (favoriteArtistRepository.existsByUserIdAndArtistId(userId, artistId)) {
            FavoriteArtist existing = favoriteArtistRepository.findByUserId(userId)
                    .stream()
                    .filter(fa -> fa.getArtistId().equals(artistId))
                    .findFirst()
                    .orElse(null);
            if (existing != null) {
                return ResponseEntity.ok(existing);
            }
        }

        FavoriteArtist favoriteArtist = new FavoriteArtist();
        favoriteArtist.setUserId(userId);
        favoriteArtist.setArtistId(artistId);

        FavoriteArtist saved = favoriteArtistRepository.save(favoriteArtist);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Long>> getFavoriteArtistIdsByUserId(@PathVariable Long userId) {
        List<Long> artistIds = favoriteArtistRepository.findArtistIdsByUserId(userId);
        return ResponseEntity.ok(artistIds);
    }

    @GetMapping("/user/{userId}/artist/{artistId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long userId, @PathVariable Long artistId) {
        boolean exists = favoriteArtistRepository.existsByUserIdAndArtistId(userId, artistId);
        return ResponseEntity.ok(exists);
    }

    @DeleteMapping("/user/{userId}/artist/{artistId}")
    @Transactional
    public ResponseEntity<Void> removeFavoriteArtist(@PathVariable Long userId,
                                                      @PathVariable Long artistId) {
        favoriteArtistRepository.deleteByUserIdAndArtistId(userId, artistId);
        return ResponseEntity.noContent().build();
    }
}









