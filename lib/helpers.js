dateDatePickerFormat = function (currDate) {
    return moment(currDate).format('M/D/YY');
};

dateListFormat = function (currDate) {
    return moment(currDate).format('MM-DD-YYYY');
};