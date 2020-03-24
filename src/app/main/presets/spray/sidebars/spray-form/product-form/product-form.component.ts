import { Component, OnInit, Inject, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '../product';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PresetsService } from 'app/main/presets/presets.service';

import { takeUntil, startWith, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


import { GroupedCommonNames } from './GroupedCommonNames';
import { CommonName } from '../CommonName';

@Component({
  selector: 'product-form-dialog',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {
  @Input() CropID: string;

  dialogRef: any;
  action: string;

  product: Product;
  products: CommonName;
  CommonNames: GroupedCommonNames[] = [];
  productForm: FormGroup;

  commonNameCtrl = new FormControl();
  filteredCommonNames: Observable<GroupedCommonNames[]>;

  _unsubscribeAll: Subject<any>;

  dialogTitle: string;

  constructor(
    private ps: PresetsService,

    public matDialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder, ) {

    this._unsubscribeAll = new Subject();
    // Set the defaults
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Product';
      this.product = _data.product;

    }
    else {
      this.dialogTitle = 'New Product';
      this.product = new Product({
        PresetPropID: _data.product.PresetPropID
      });
    }
  }

  ngOnInit() {

    this.filteredCommonNames = this.commonNameCtrl.valueChanges.pipe(startWith(""),
      map((name: any) => name ? this._filter(name) : this.CommonNames.slice()));

    this.productForm = this._formBuilder.group({
      ID: [""],
      PresetPropID: [""],

      commonNameCtrl: [new FormControl()],
      rate: ["", Validators.required],
      area: [new FormControl(), Validators.required],
      volume: [new FormControl(), Validators.required],
    });

    this.productForm.get("ID").setValue(this.product.ID || "")
    this.productForm.get("PresetPropID").setValue(this.product.PresetPropID || "")
    this.productForm.get("commonNameCtrl").setValue(this.product.ProductName)
    this.productForm.get("area").setValue(this.product.Area)
    this.productForm.get("rate").setValue(this.product.Amount)
    this.productForm.get("volume").setValue(this.product.Volume)


    this.ps.onCommonNameChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {

        //group a list
        let cats = [...new Set(data.map(item => item.rem))]

        cats.forEach(item => {
          this.CommonNames.push({
            category: item.toString(),
            products: data.filter((product) => {
              return product.rem === item
            })
          })
        });

      });
  }

  /**
   * 
   * @param item DropdownList, 
   * returns the Display element
   */
  public displayFn(item: CommonName): string {
    return item && item.PesticidesCommonName ? item.PesticidesCommonName : '';
  }

  public _filter(value: string): GroupedCommonNames[] {
    if (value) {
      return this.CommonNames
        .map(group => ({ category: group.category, products: this.filter(group.products, value) }))
        .filter(group => group.products.length > 0);
    }
    return this.CommonNames;
  }


  filter(opt: CommonName[], value: any): CommonName[] {
    if (typeof value === "string") {
      const filterValue = value.toLowerCase();
      return opt.filter(item => item.PesticidesCommonName.toLowerCase().indexOf(filterValue) === 0);
    } else {
      console.log(value)
      console.log(opt)

      this.productForm.get("area").setValue(value.areaparameter)
      this.productForm.get("rate").setValue(value.rateMax)
      this.productForm.get("volume").setValue(value.volumeparameter)
      this.productForm.get("commonNameCtrl").setValue(value)
      return opt;
    }
  };
}
