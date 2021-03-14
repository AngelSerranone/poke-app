package com.ironhack.pokeappspring.controller.impl;

import com.ironhack.pokeappspring.controller.dto.TrainerDto;
import com.ironhack.pokeappspring.controller.interfaces.ITrainerController;
import com.ironhack.pokeappspring.model.Pokemon;
import com.ironhack.pokeappspring.model.Trainer;
import com.ironhack.pokeappspring.service.interfaces.ITrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class TrainerController implements ITrainerController {


    @Autowired
    private ITrainerService trainerService;

    @GetMapping("/trainers")
    public List<Trainer> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    @GetMapping("/trainer/{id}")
    public List<Pokemon> getPokemonsByTrainer(@PathVariable Long id) {
        return trainerService.getPokemonsByTrainer(id);
    }

    @PostMapping("/trainer")
    @ResponseStatus(HttpStatus.CREATED)
    public Trainer storeTrainer(@RequestBody @Valid TrainerDto trainerDto) {
        return trainerService.storeTrainer(trainerDto);
    }

    @DeleteMapping("/trainer/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
    }

    @PostMapping("/pokemon/{name}/{id}")
    public Pokemon addPokemonToTeam(@PathVariable String name, @PathVariable Long id) {
        return trainerService.addPokemonToTeam(name, id);
    }

    @DeleteMapping("/pokemon/{id}")
    public void deletePokemonOfTeam(@PathVariable Long id) {
        trainerService.deletePokemonOfTeam(id);
    }
}
