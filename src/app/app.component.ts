import {Component, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheet, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppBottomSheetColumnsComponent} from './app-bottom-sheet-columns.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  displayedColumns: string[] = ['position', 'name', 'action'];
  stateCtrl = new FormControl();
  filteredData: Observable<PeriodicElement[]>;
  data =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  showDetails: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (private bottomSheet: MatBottomSheet) {
    this.filteredData = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(d => this._filterStates(d))
      );
  }

  openBottomSheet(): void {
    this.bottomSheet.open(AppBottomSheetColumnsComponent, {
      data: { allColumns: this.allColumns, displayedColumns: this.displayedColumns }
    });
  }

  ngOnInit(): void {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    this.showDetails = false;
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  private _filterStates(value: string): PeriodicElement[] {
    const filterValue = value.toLowerCase();
    return this.data
      .filteredData.filter(d => d.name.toLowerCase().includes(filterValue));
  }

  splitScreen(e: Event) {
    // @ts-ignore
    this.showDetails = e.checked;
  }
}
