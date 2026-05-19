package com.placement.controller;

import com.placement.entity.Placement;
import com.placement.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
@CrossOrigin(origins = "http://localhost:3000")
public class PlacementController {

    @Autowired
    private PlacementService service;

    @GetMapping
    public List<Placement> getAll() {
        return service.getAllPlacements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Placement> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPlacementById(id));
    }

    @PostMapping
    public ResponseEntity<Placement> create(@RequestBody Placement placement) {
        Placement saved = service.savePlacement(placement);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Placement> update(@PathVariable Long id, @RequestBody Placement placement) {
        placement.setId(id);
        return ResponseEntity.ok(service.savePlacement(placement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deletePlacement(id);
        return ResponseEntity.noContent().build();
    }
}