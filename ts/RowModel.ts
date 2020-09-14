class RowModel {

    public Time: string;
    public Symbol: string;
    public Direction: string;

    public constructor(prediction: PredictionModel) {
        this.Time = prediction.TimeMoment.format('llll');
        this.Symbol = prediction.Symbol;
        this.Direction = prediction.Direction;
    }
}