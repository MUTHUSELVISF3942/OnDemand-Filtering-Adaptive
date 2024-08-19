var hostUrl = 'https://services.syncfusion.com/js/production/api/Orders';
var data1 = new ej.data.DataManager({
  url: hostUrl,
  adaptor: new ej.data.WebApiAdaptor(),
});

var grid = new ej.grids.Grid(
      {
          dataSource: data1,
          enableAdaptiveUI: true,
          allowFiltering: true,
          rowRenderingMode: 'Vertical',
          filterSettings: { type: 'CheckBox', enableInfiniteScrolling: true },
          height: '100%',
          load: () => {
              if (!ej.base.Browser.isDevice) {
                  grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0];
              }
              if (grid.pageSettings.pageSizes) {
                  document.querySelector('.e-adaptive-demo').classList.add('e-pager-pagesizes');
              }
              else{
                  document.querySelector('.e-adaptive-demo').classList.remove('e-pager-pagesizes');
              }
          },
          editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Dialog' },
          toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'],
          columns: [
              {
                  field: 'OrderID', headerText: 'Order ID', width: 180, isPrimaryKey: true,
                  validationRules: { required: true, number: true }
              },
              { field: 'Freight', width: 180, format: 'C2', editType: 'numericedit', validationRules: { required: true, number: true } },
              { field: 'CustomerID', headerText: 'Name', width: 180, validationRules: { required: true } },
              { field: 'ShipCity', headerText: 'Ship City', width: 180, validationRules: { required: true } }
          ],
          aggregates: [{
              columns: [{
                  type: 'Sum',
                  field: 'Freight',
                  format: 'C2',
                  footerTemplate: 'Sum: ${Sum}'
              }]
          }]
      });
  if (ej.base.Browser.isDevice) {
      grid.appendTo('#adaptivedevice');
      (document.getElementsByClassName('e-mobile-layout')[0]).style.display = 'none';
  } else {
      grid.appendTo('#adaptivebrowser');
  }