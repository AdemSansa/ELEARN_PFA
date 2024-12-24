package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Model.Forum;
import com.Elearning.demo.MainPack.Repository.ForumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forums")
public class ForumController {
    @Autowired
    private ForumRepository forumRepository;


    //Create A forum
    @PostMapping("/add")
    public ResponseEntity<Forum> addForum(@RequestBody Forum forum) {
        Forum savedForum = forumRepository.save(forum);
        return ResponseEntity.ok(savedForum);
    }



    @GetMapping
    public ResponseEntity<List<Forum>> getAllForums() {
        return ResponseEntity.ok(forumRepository.findAll());
    }
}