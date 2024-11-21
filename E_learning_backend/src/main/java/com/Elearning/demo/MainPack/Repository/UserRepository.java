package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.User;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
public interface UserRepository extends MongoRepository<User, String> {
    Optional <User> findByName(String Name);
    Optional <User> findByEmail(String email);
    Optional <User> findByEmailAndPassword(String email, String password);
    Optional <User> findByResetToken(String resetToken);

}
