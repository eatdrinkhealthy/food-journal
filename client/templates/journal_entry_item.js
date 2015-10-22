Template.journalEntry_item.helpers({
    formattedDate: function () {
        return dateListFormat(this.entryDate);
    }
});
