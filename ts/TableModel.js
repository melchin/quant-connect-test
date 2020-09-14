///<reference path="PredictionModel.ts" />
///<reference path="RowModel.ts" />

// Use Moments built in difference operator to sort by time.
const getSort = (sortBy) => (row1, row2) => {
  const date1 = moment(row1.Time);
  const date2 = moment(row2.Time);
  switch (sortBy) {
    case "time-asc": {
      return date1 - date2;
    }
    case "time-desc": {
      return date2 - date1;
    }
    default: {
      return date1;
    }
  }
};

var TableModel = /** @class */ (function () {
  function TableModel() {
    this._predictions = [];
    this.staticData = {};
    this.RowModels = ko.observableArray([]);
    this.VisibleRows = ko.observableArray([]);
    this.Page = ko.observable(1);
    this.Pages = ko.observable();
    this.SortBy = ko.observable("none");
    this.PageSize = Number.MAX_VALUE;
  }

  TableModel.prototype.GetRows = function (startIndex, length) {
    // Unique key for caching
    const key = `${startIndex}-${length}-${this.SortBy()}`;
    const maybeCachedData = this.staticData[key];
    if (maybeCachedData) {
      return maybeCachedData;
    }
    const nextRows = [];
    for (let index = startIndex; index < length; index++) {
      nextRows.push(this.RowModels()[index]);
    }

    this.staticData[key] = nextRows;
    return nextRows;
  };

  TableModel.prototype.AddPrediction = function (rawPrediction) {
    var prediction = new PredictionModel(rawPrediction);
    this._predictions.push(prediction);
    // Only create new RowModels once per prediction
    this.RowModels.push(new RowModel(prediction));
  };

  TableModel.prototype.SetSorting = function (sort) {
    // To save memory, clear data cache if sort order changes.
    this.staticData = {};
    this.SortBy(sort);
    this.RowModels.sort(getSort(this.SortBy()));
    this.SetPage(1);
  };

  TableModel.prototype.SetPageSize = function (pageSize) {
    // To save memory, clear data cache if page size changes.
    this.staticData = {};
    this.PageSize = pageSize;
    this.Pages(Math.ceil(this._predictions.length / this.PageSize));
  };

  TableModel.prototype.SetPage = function (page) {
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
  };
  return TableModel;
})();
