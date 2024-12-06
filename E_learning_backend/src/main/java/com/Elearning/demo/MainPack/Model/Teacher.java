package com.Elearning.demo.MainPack.Model;

import java.util.List;

public class Teacher extends User {
    private List<String> courses;

    public Teacher() {
        super();
        this.addRole("Teacher");
    }

    public Teacher(String name, String email, String password) {
        super(name, email, password);
        this.addRole("Teacher");
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }

    public void addCourse(String course) {
        this.courses.add(course);
    }
}