package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findChatByForumId(String forumId);

}
