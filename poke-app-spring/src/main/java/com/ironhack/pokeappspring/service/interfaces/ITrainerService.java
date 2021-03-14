package com.ironhack.pokeappspring.service.interfaces;

import com.ironhack.pokeappspring.controller.dto.TrainerDto;
import com.ironhack.pokeappspring.model.Pokemon;
import com.ironhack.pokeappspring.model.Trainer;

import java.util.List;

public interface ITrainerService {
    List<Trainer> getAllTrainers();

    List<Pokemon> getPokemonsByTrainer(Long id);

    Trainer storeTrainer(TrainerDto trainerDto);

    void deleteTrainer(Long id);

    Pokemon addPokemonToTeam(String name, Long id);

    void deletePokemonOfTeam(Long id);
}
