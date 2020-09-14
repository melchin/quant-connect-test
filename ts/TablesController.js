///<reference path="TableModel.ts" />
var TablesController = /** @class */ (function () {
    function TablesController() {
    }
    TablesController.UpdatePageSize = function (table, event) {
        console.log(table, event);
        var newPageSize = event.target.value;
        if (newPageSize == 'all') {
            table.SetPageSize(Number.MAX_VALUE);
        }
        else {
            table.SetPageSize(parseInt(newPageSize));
        }
        table.SetPage(1);
    };
    TablesController.PreviousPage = function (table) {
        var currentPage = table.Page();
        if (currentPage < 2)
            return;
        table.SetPage((currentPage - 1));
    };
    TablesController.NextPage = function (table) {
        var currentPage = table.Page();
        if (currentPage >= table.Pages())
            return;
        table.SetPage((currentPage + 1));
    };
    TablesController.SortByTime = function (table) {
        var currentSort = table.SortBy();
        switch (currentSort) {
            case 'time-desc':
            case 'none':
                table.SetSorting('time-asc');
                break;
            case 'time-asc':
                table.SetSorting('time-desc');
                break;
        }
    };
    return TablesController;
}());
//# sourceMappingURL=TablesController.js.map