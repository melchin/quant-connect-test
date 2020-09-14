var Utils = (function () {
    function getSort(sortBy) {
        return function (row1, row2) {
            var date1 = moment(row1.Time);
            var date2 = moment(row2.Time);
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
        getSort: getSort,
    };
})();
//# sourceMappingURL=utils.js.map