import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { CropService } from "app/services/crop.service";
import { DropdownList } from 'app/models/dropdownlist';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { DropdownService } from 'app/services/dropdown.service';


@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None,
})

export class CropComponent implements OnInit {
  _unsubscribeAll: Subject<any>;
  updateCrops: FormGroup;
  
  ngOnInit(): void {
    
    this.cs.onCropChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      data[0][0].forEach((item) => {
        if (item.isSelected) {
          this.crops.push({ label: item.Name, value: item.Id })
        } else {
          this.allCrops.push({ label: item.Name, value: item.Id })
        }
      });
    });

    this.filteredCrops = this.cropCtrl.valueChanges.pipe(
      startWith(""),
      map((crop: any) => crop ? this.ds._filter(crop, this.allCrops) : this.allCrops.slice()));

  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cropCtrl = new FormControl();
  
  filteredCrops: Observable<DropdownList[]>;
  crops: DropdownList[] = [];
  allCropsWithoutFilter: DropdownList[] = [];
  allCrops: DropdownList[] = [];

  @ViewChild('cropInput', { static: false }) cropInput: ElementRef<HTMLInputElement>;
  @ViewChild('Crops', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private cs: CropService,
    private ds: DropdownService,
    
  ) {


    this._unsubscribeAll = new Subject();

  }
  add(event: MatChipInputEvent): void {
    // Add crop only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    // if (!this.matAutocomplete.isOpen) {
    //   const input = event.input;
    //   const value = event.value;

    //   // Add our crop
    //   if ((value || "").trim()) {
    //     this.crops.push({ label: event.value["label"], value: event.value["value"] });
    //     this.allCrops.slice(this.crops.indexOf({ label: event.value["label"], value: event.value["value"] }),
    //       this.crops.indexOf({ label: event.value["label"], value: event.value["value"] }) + 1);
    //   }

    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }

    //   this.cropCtrl.setValue(null);
    // }
  }

  /***
   * remove items from the selected list
   */
  remove(crop: DropdownList): void {
    const indexC = this.crops.indexOf(crop);
    if (indexC >= 0) {
      this.crops.splice(indexC, 1);
    }
    const indexA = this.allCrops.indexOf(crop);
    if (indexA < 0) {
      this.allCrops.push(crop);
    }
  }

  /***
   * Select items from the list
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    const indexC = this.crops.indexOf(event.option.value);
    if (indexC < 0) {
      this.crops.push(event.option.value);
    }

    const indexA = this.allCrops.indexOf(event.option.value);
    if (indexA >= 0) {
      this.allCrops.splice(indexA, 1);
    }

    this.cropInput.nativeElement.value = '';
    this.cropCtrl.setValue(null);
  }

  // private _filter(value: any): DropdownList[] {
  //   if (typeof value === "string") {
  //     const filterValue = value.toLowerCase();
  //     let list = this.allCrops.filter(crop => crop.label.toLowerCase().indexOf(filterValue) === 0);
  //     return list;
  //   }
  //   return this.allCrops;
  // }

  /**
   * Update the dropdown values to the server
   */
  UpdateItemCrops() {
    let IDList: string = "";

    this.crops = this.crops.filter(
      (thing, i, arr) => arr.findIndex(t => t === thing) === i
    );

    this.crops.forEach((item) => {
      IDList += item.value + ",";
    })

    this.cs.UpdateItemCrops(IDList);

  }
}
