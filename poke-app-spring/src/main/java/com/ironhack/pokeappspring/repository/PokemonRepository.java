package com.ironhack.pokeappspring.repository;

import com.ironhack.pokeappspring.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

    List<Pokemon> findByTrainerId(Long id);

    @Transactional
    void deleteByTrainerId(Long id);
}
