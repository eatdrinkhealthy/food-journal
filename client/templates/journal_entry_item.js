Template.journalEntry_item.helpers({
    formattedDate: function () {
        return moment(this.entryDate).format('MM-DD-YYYY');
    }
});
