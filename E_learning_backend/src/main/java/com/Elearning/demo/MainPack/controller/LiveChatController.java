package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Model.ChatMessage;
import com.Elearning.demo.MainPack.Repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class LiveChatController {
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {
        // Optionally, you can add logic to save the message in MongoDB here.
        message.setSender(message.getSender());
        message.setContent(message.getContent());
        message.setTimestamp(new java.util.Date().toString());
        chatMessageRepository.save(message);
        System.out.println("Message sent: " + message.getContent());
        return message;
    }
    @PostMapping("/messages")
    public ResponseEntity<ChatMessage> saveMessage(@RequestBody  ChatMessage message) {

        ChatMessage savedMessage = chatMessageRepository.save(message);
        // Save the message in the database
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getAllMessages() {
        // Return all messages from the database
        return ResponseEntity.ok( chatMessageRepository.findAll());
    }
}
