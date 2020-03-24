
import { DropdownList } from "../models/dropdownlist";
export class RegionList implements DropdownList {
    label: string;
    value: string;
    postcode: string;
    lat: string;
    lng: string;
    state: string;
}