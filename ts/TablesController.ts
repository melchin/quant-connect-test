///<reference path="TableModel.ts" />

class TablesController {

    public static UpdatePageSize(table: TableModel, event) {
        console.log(table, event);

        let newPageSize = event.target.value;

        if (newPageSize == 'all') {
            table.SetPageSize(Number.MAX_VALUE);
        } else {
            table.SetPageSize(parseInt(newPageSize));
        }

        table.SetPage(1);
    }

    public static PreviousPage(table: TableModel) {
        let currentPage = table.Page();
        if (currentPage < 2) return;
        table.SetPage((currentPage - 1));
    }

    public static NextPage(table: TableModel) {
        let currentPage = table.Page();
        if (currentPage >= table.Pages()) return;
        table.SetPage((currentPage + 1));
    }

    public static SortByTime(table: TableModel) {
        let currentSort = table.SortBy();
        switch (currentSort) {
            case 'time-desc':
            case 'none':
                table.SetSorting('time-asc');
                break;
            case 'time-asc':
                table.SetSorting('time-desc');
                break;
        }
    }
}