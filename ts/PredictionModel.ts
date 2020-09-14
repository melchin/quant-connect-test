class PredictionModel {

    public Time: string;
    public TimeMoment;
    public Symbol: string;
    public Direction: string;

    public constructor(rawPrediction) {
        this.Time = rawPrediction.GeneratedTimeUtc;
        this.TimeMoment = moment(this.Time);
        this.Symbol = rawPrediction.Symbol.Permtick;
        this.Direction = rawPrediction.Direction;
    }
}