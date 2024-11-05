package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
public interface UserRepository extends MongoRepository<User, String> {
    Optional <User> findByName(String Name);
    Optional <User> findByEmail(String email);
    Optional <User> findByEmailAndPassword(String email, String password);
}
