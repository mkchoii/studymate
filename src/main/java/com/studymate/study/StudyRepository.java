package com.studymate.study;

import com.studymate.goal.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Integer> {

    List<Study> findAllByCategory(Category category);
}
