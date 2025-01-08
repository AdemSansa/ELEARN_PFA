package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Model.Forum;
import com.Elearning.demo.MainPack.Repository.ForumRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forums")
public class ForumController {
    private static final Logger log = LoggerFactory.getLogger(ForumController.class);
    @Autowired
    private ForumRepository forumRepository;


    //Create A forum
    @PostMapping("/add")
    public ResponseEntity<Forum> addForum(@RequestBody Forum forum) {
        System.out.println(
                "Forum Title: " + forum.getTitle() + "\n" +
                        "Forum Description: " + forum.getDescription() + "\n" +
                        "Forum Created By: " + forum.getUserUrl() + "\n"
        );
        Forum savedForum = forumRepository.save(forum);
        return ResponseEntity.ok(savedForum);
    }
    // Edit Forum
    @PutMapping("/edit/{id}")
    public ResponseEntity<Forum> editForum(@PathVariable String id, @RequestBody Forum forum) {
        Forum existingForum = forumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Forum not found with ID: " + id));

        existingForum.setTitle(forum.getTitle());
        existingForum.setDescription(forum.getDescription());
        existingForum.setUserUrl(forum.getUserUrl());
        System.out.println(
                "Forum Title: " + forum.getTitle() + "\n" +
                        "Forum Description: " + forum.getDescription() + "\n" +
                        "Forum Created By: " + forum.getUserUrl() + "\n"
        );
        Forum savedForum = forumRepository.save(existingForum);
        return ResponseEntity.ok(savedForum);
    }
    //Delete Forum
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteForum(@PathVariable String id) {
        forumRepository.deleteById(id);
        System.out.println("succcesssss");
        Map<String, String> response = new HashMap<>();

        response.put("message", "Forum Deleted Successfully");

        return ResponseEntity.ok(response);
    }



    @GetMapping
    public ResponseEntity<List<Forum>> getAllForums() {
        return ResponseEntity.ok(forumRepository.findAll());
    }
}