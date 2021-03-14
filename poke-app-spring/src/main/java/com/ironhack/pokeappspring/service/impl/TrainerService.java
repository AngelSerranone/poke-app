package com.ironhack.pokeappspring.service.impl;

import com.ironhack.pokeappspring.controller.dto.TrainerDto;
import com.ironhack.pokeappspring.model.Pokemon;
import com.ironhack.pokeappspring.model.Trainer;
import com.ironhack.pokeappspring.repository.PokemonRepository;
import com.ironhack.pokeappspring.repository.TrainerRepository;
import com.ironhack.pokeappspring.service.interfaces.ITrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerService implements ITrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private PokemonRepository pokemonRepository;

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public List<Pokemon> getPokemonsByTrainer(Long id) {
        retrieveTrainer(id);
        return pokemonRepository.findByTrainerId(id);
    }

    public Trainer storeTrainer(TrainerDto trainerDto) {
        Trainer trainer = new Trainer(trainerDto.getName(), trainerDto.getAge(), trainerDto.getHobby(), trainerDto.getPhoto());
        return trainerRepository.save(trainer);
    }

    public void deleteTrainer(Long id) {
        pokemonRepository.deleteByTrainerId(id);
        trainerRepository.deleteById(id);
    }

    public Pokemon addPokemonToTeam(String name, Long id) {
        Pokemon pokemon = new Pokemon(name);
        Trainer trainer = retrieveTrainer(id);
        pokemon.setTrainer(trainer);
        return pokemonRepository.save(pokemon);
    }

    private Trainer retrieveTrainer(Long id) {
        Optional<Trainer> trainer = trainerRepository.findById(id);
        if (trainer.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer with id " + id + " not found.");
        }
        return trainer.get();
    }

    public void deletePokemonOfTeam(Long id) {
        Pokemon pokemon = retrievePokemon(id);
        pokemonRepository.delete(pokemon);
    }

    private Pokemon retrievePokemon(Long id) {
        Optional<Pokemon> pokemon = pokemonRepository.findById(id);
        if (pokemon.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon with id " + id + " not found.");
        }
        return pokemon.get();
    }
}
