package com.placement.service;

import com.placement.entity.Placement;
import com.placement.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlacementService {

    @Autowired
    private PlacementRepository repository;

    public List<Placement> getAllPlacements() {
        return repository.findAll();
    }

    public Placement savePlacement(Placement placement) {
        return repository.save(placement);
    }

    public Placement getPlacementById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement not found with id: " + id));
    }

    public void deletePlacement(Long id) {
        repository.deleteById(id);
    }
}