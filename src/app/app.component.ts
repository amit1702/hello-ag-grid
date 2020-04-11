import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hello-ag-grid';
  gridOptions;
  lastColIndex = 0;

  constructor() {
    this.gridOptions = {
      ...this.createData(20, 3600),
      rowSelection: 'multiple'
    };
  }

  ngOnInit(): void {

  }

  goToLastColumn = () => {
    const lastColKey = 'col-' + this.lastColIndex;
    this.gridOptions.api.ensureColumnVisible(lastColKey);
  }

  buttonClicked = () => {
    this.goToLastColumn();
  }

  updateData = () => {
    const newGridData = this.createData(20, 4200, 10);
    this.gridOptions.api.setRowData(newGridData.rowData );
    this.gridOptions.api.setColumnDefs(newGridData.columnDefs );
    this.goToLastColumn();
  }

  getSelectedNodes = () => {
    const selectedNodes = this.gridOptions.api.getSelectedNodes();
    console.log('selectedNodes', selectedNodes);
  }

  createData = (rowCount: number, colCount: number, offset: number = 0) => {
    this.lastColIndex = colCount - 1;
    const rowData = [];
    for (let row = 0; row < rowCount; row++) {
      const obj = {};
      for (let propertyIndex = 0; propertyIndex < colCount; propertyIndex++) {
        obj['col-' + propertyIndex] = 'row-' + row + ' col-' + propertyIndex + '-' + offset;
      }
      rowData.push(obj);
    }

    const columnDefs: any[] = [];
    for (let propertyIndex = 0; propertyIndex < colCount; propertyIndex++) {
      const col = {
        headerName: 'Column-' + propertyIndex,
        field: 'col-' + propertyIndex,
        width: 140,
        sortable: true,
        filter: true
      };
      columnDefs.push(col);
    }
    columnDefs[0].pinned = 'left';
    columnDefs[0].cellStyle = {
      backgroundColor: 'gray'
    };
    columnDefs[0].checkboxSelection = true;

    return {
      rowData,
      columnDefs
    };
  }
}
