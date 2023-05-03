module.exports = {
    sortBy: function (array, key, direction) {
        direction = direction || 'asc';
        return array.sort(function (a, b) {
            if (direction === 'desc') {
                return (b[key] > a[key]) ? 1 : ((a[key] > b[key]) ? -1 : 0);
            } else {
                return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
            }
        });
    }
};
