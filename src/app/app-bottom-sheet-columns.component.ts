import {Component, Inject} from '@angular/core';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {AppComponent} from './app.component';

@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
  styleUrls: [
    'app.component.css'
  ]
})
export class AppBottomSheetColumnsComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  allColumns: string[] = this.data.allColumns;
  displayedColumns: string[] = this.data.displayedColumns;

  checkDisplayedColumns(col) {
    return this.displayedColumns.includes(col);
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  updateCheckedList(column, check): void {
    if (check) {
      const index = this.displayedColumns.indexOf(column);
      if (index > -1) {
        this.displayedColumns.splice(index, 1);
      }
    } else {
      this.displayedColumns.splice(this.displayedColumns.length - 1, 0, column);
    }
  }

}
