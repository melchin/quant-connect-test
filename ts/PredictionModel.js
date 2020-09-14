var PredictionModel = /** @class */ (function () {
    function PredictionModel(rawPrediction) {
        this.Time = rawPrediction.GeneratedTimeUtc;
        this.TimeMoment = moment(this.Time);
        this.Symbol = rawPrediction.Symbol.Permtick;
        this.Direction = rawPrediction.Direction;
    }
    return PredictionModel;
}());
//# sourceMappingURL=PredictionModel.js.map