package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Config.UserService;
import com.Elearning.demo.MainPack.Model.Chat;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.ChatRepository;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private Authservice authservice;

    // Add a chat to a forum
    @PostMapping("/add")
    public ResponseEntity<Chat> addChat(@RequestBody Chat chat, Principal principal) {
        //Get Logged in User name and info
        chat.setCreatedAt(LocalDateTime.now());
        chat.setCreatedBy(chat.getCreatedBy());
        chat.setCreatedAt(LocalDateTime.now());
        Chat savedChat = chatRepository.save(chat);
        return ResponseEntity.ok(savedChat);
    }

    // Get all chats for a specific forum
    @GetMapping("/forum/{forumId}")
    public ResponseEntity<List<Chat>> getChatsByForumId(@PathVariable String forumId) {
        return ResponseEntity.ok(chatRepository.findChatByForumId(forumId));
    }
}