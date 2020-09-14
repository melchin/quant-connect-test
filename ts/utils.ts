var Utils = (function () {
  function getSort(sortBy) {
    return (row1, row2) => {
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
  }
  return {
    getSort,
  };
})();
