import { Injectable } from '@angular/core';
import { DropdownList } from 'app/models/dropdownlist';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }


  /**
   * 
   * @param name typed string in the autocomplete input. Searchable dropdown filtering function can be done here
   */
  public _filter(name: string, List: DropdownList[]): DropdownList[] {
    if (typeof name === "string") {
      const filterValue = name.toLowerCase();
      return List.filter(option => option.label.toLowerCase().indexOf(filterValue) === 0);
    }
    return List;
  }

}
