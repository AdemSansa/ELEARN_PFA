package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Chat;
import com.Elearning.demo.MainPack.Model.TopChatter;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findChatByForumId(String forumId);


    @Aggregation(pipeline = {
            "{ $group: { _id: '$createdBy', messageCount: { $sum: 1 } } }",
            "{ $sort: { messageCount: -1 } }",
            "{ $limit: 10 }"
    })
    List<TopChatter> findTopChatters();

}
