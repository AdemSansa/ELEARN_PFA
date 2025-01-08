package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {


}
