package com.music.userservice.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "favorite_artist")
@IdClass(FavoriteArtist.FavoriteArtistId.class)
public class FavoriteArtist {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "artist_id")
    private Long artistId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public static class FavoriteArtistId implements Serializable {
        private Long userId;
        private Long artistId;

        public FavoriteArtistId() {}

        public FavoriteArtistId(Long userId, Long artistId) {
            this.userId = userId;
            this.artistId = artistId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            FavoriteArtistId that = (FavoriteArtistId) o;
            return Objects.equals(userId, that.userId) &&
                   Objects.equals(artistId, that.artistId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, artistId);
        }
    }
}







