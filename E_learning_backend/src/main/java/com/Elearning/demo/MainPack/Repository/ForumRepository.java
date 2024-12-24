package com.Elearning.demo.MainPack.Repository;


import com.Elearning.demo.MainPack.Model.Forum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumRepository  extends MongoRepository<Forum, String>
{

}
