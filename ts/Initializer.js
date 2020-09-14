///<reference path="TableModel.ts" />
///<reference path="TablesController.ts" />
$(window).ready(function () {
    ko.cleanNode(window.document.body);
    var rawPredictions = JSON.parse($('#json-data').html());
    var table = new TableModel();
    for (var i in rawPredictions) {
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
//# sourceMappingURL=Initializer.js.map