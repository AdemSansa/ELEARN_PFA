package com.Elearning.demo.MainPack.Config;

import com.Elearning.demo.MainPack.Model.Category;
import com.Elearning.demo.MainPack.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    public Category updateCategory(String id, Category category) {
        Category existingCategory = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        existingCategory.setName(category.getName());
        existingCategory.setImageUrl(category.getImageUrl());
        existingCategory.setDescription(category.getDescription());
        return categoryRepository.save(existingCategory);

}}