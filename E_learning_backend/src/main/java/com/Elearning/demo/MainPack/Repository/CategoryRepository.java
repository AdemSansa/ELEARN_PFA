package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}
