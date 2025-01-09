import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourses'
})
export class FilterCoursesPipe implements PipeTransform {

  transform(courses: any[], searchText: string):any[] {
    if (!courses || !searchText) {
      return courses;
    }

    const searchLower = searchText.toLowerCase();
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchLower) || 
      course.description.toLowerCase().includes(searchLower)
    );
  }
}
