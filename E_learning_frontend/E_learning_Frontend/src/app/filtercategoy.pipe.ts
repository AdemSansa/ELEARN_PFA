import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercategoy'
})
export class FiltercategoyPipe implements PipeTransform {

  transform(categories: any[], searchText: string): any[] {
    if (!categories || !searchText) {
      return categories;
    }
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchText.toLowerCase()) ||
      category.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
