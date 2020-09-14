///<reference path="PredictionModel.ts" />
///<reference path="RowModel.ts" />

const TIME_ASC = "time-asc";
const NONE = "none";
const TIME_DESC = "time-desc";

type SortBy = typeof TIME_ASC | typeof TIME_DESC | typeof NONE;

interface StaticData {
  [key: string]: Array<RowModel>;
}

// Use Moments built in difference operator to sort by time.
const getSort = (sortBy: SortBy) => (
  row1: RowModel,
  row2: RowModel
): number => {
  const date1 = moment(row1.Time);
  const date2 = moment(row2.Time);
  switch (sortBy) {
    case TIME_ASC: {
      return date1 - date2;
    }
    case TIME_DESC: {
      return date2 - date1;
    }
    default: {
      return date1;
    }
  }
};

class TableModel {
  private _predictions: Array<PredictionModel>;
  public staticData: StaticData;
  public RowModels: KnockoutObservableArray<RowModels>;
  public VisibleRows: KnockoutObservableArray<RowModel>;
  public Page: KnockoutObservable<number>;
  public Pages: KnockoutObservable<number>;
  public PageSize: number;
  public SortBy: KnockoutObservable<string>;

  public constructor() {
    this._predictions = [];
    this.staticData = {};
    this.RowModels = ko.observableArray([]);
    this.VisibleRows = ko.observableArray([]);
    this.Page = ko.observable(1);
    this.Pages = ko.observable();
    this.SortBy = ko.observable("none");
    this.PageSize = Number.MAX_VALUE;
  }

  public GetRows(startIndex: number, length: number): Array<RowModel> {
    // Unique key for caching
    const key = `${startIndex}-${length}-${this.SortBy()}`;
    const maybeCachedData = this.staticData[key];
    if (maybeCachedData) {
      return maybeCachedData;
    }
    const nextRows: Array<RowModel> = [];
    for (let index = startIndex; index < length; index++) {
      nextRows.push(this.RowModels()[index]);
    }

    this.staticData[key] = nextRows;
    return nextRows;
  }

  public AddPrediction(rawPrediction) {
    let prediction = new PredictionModel(rawPrediction);
    this._predictions.push(prediction);
    // Only create new RowModels once per prediction
    this.RowModels.push(new RowModel(prediction));
  }

  public SetSorting(sort: string) {
    // To save memory, clear data cache if sort order changes.
    this.staticData = {};
    this.SortBy(sort);
    this.RowModels.sort(getSort(this.SortBy()));
    this.SetPage(1);
    this.SortBy(sort);
  }

  public SetPageSize(pageSize: number) {
    // To save memory, clear data cache if page size changes.
    this.staticData = {};
    this.PageSize = pageSize;
    this.Pages(Math.ceil(this._predictions.length / this.PageSize));
  }

  public SetPage(page) {
    // Starting Index for a specific Page
    const startIndex = (page - 1) * this.PageSize;
    // Ending bound for a specific Page
    const length = Math.min(
      this.PageSize + startIndex, // Index at the end of a full page, OR
      this._predictions.length // The last index given the number of predictions
    );
    // Static Data, so we use GetRows to cache results
    const nextRows = this.GetRows(startIndex, length);
    this.VisibleRows(nextRows);
    this.Page(page);
  }
}
