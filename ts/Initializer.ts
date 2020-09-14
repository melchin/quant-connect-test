///<reference path="TableModel.ts" />
///<reference path="TablesController.ts" />

$(window).ready(() => {
    ko.cleanNode(window.document.body);

    let rawPredictions = JSON.parse($('#json-data').html());

    let table = new TableModel();
    for (let i in rawPredictions) {
        if (rawPredictions.hasOwnProperty(i)) {
            table.AddPrediction(rawPredictions[i]);
        }
    }
    table.SetPageSize(Number.MAX_VALUE);
    table.SetPage(1);

    example = {
        Table: table
    };

    ko.applyBindings(example);
});