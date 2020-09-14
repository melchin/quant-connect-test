var RowModel = /** @class */ (function () {
    function RowModel(prediction) {
        this.Time = prediction.TimeMoment.format('llll');
        this.Symbol = prediction.Symbol;
        this.Direction = prediction.Direction;
    }
    return RowModel;
}());
//# sourceMappingURL=RowModel.js.map