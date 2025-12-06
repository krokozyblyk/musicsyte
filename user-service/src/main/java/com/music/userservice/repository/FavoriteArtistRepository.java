package com.music.userservice.repository;

import com.music.userservice.entity.FavoriteArtist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FavoriteArtistRepository extends JpaRepository<FavoriteArtist, FavoriteArtist.FavoriteArtistId> {
    List<FavoriteArtist> findByUserId(Long userId);

    @Query("SELECT fa.artistId FROM FavoriteArtist fa WHERE fa.userId = :userId")
    List<Long> findArtistIdsByUserId(@Param("userId") Long userId);

    boolean existsByUserIdAndArtistId(Long userId, Long artistId);

    @Modifying
    @Transactional
    @Query("DELETE FROM FavoriteArtist fa WHERE fa.userId = :userId AND fa.artistId = :artistId")
    void deleteByUserIdAndArtistId(@Param("userId") Long userId, @Param("artistId") Long artistId);
}







