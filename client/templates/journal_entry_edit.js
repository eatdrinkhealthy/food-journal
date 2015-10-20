Template.journalEntryEdit.helpers({
    formattedDate: function () {
        return moment(this.entryDate).format('M/D/YY');
    }
});

Template.journalEntryEdit.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        todayHighlight: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntryEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var entry = JournalEntries.findOne(this._id);
        entry.set({
            entryDate: $('#entry-datepicker').datepicker('getDate'),
            caption: $(e.target).find('[name=caption]').val()
        });

        entry.save(function (error, id) {
            // TODO: id doesn't seem correct here. a '1' was passed back, I think
            // maybe the number of some items saved. but should have been an id.
            // So instead, moved the router.go outside of this callback until
            // I inquire about the id value.
            if (error) {
                alert('edit save error:' +  error.reason);
            }
        });
        Router.go('journalEntryPage', {_id: entry._id});
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this journal entry?")) {
            var entry = JournalEntries.findOne(this._id);
            entry.remove();
            Router.go('journalEntriesList');
        }
    }
});