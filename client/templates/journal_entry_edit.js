Template.journalEntry_edit.helpers({
    formattedDate: function () {
        return moment(this.entryDate).format('M/D/YY');
    }
});

Template.journalEntry_edit.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        todayHighlight: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntry_edit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentEntryId = this._id;

        var entry = JournalEntries.findOne(currentEntryId);
        entry.set({
            entryDate: $('#entry-datepicker').datepicker('getDate'),
            caption: $(e.target).find('[name=caption]').val()
        });

        entry.save(function (error) {
            if (error) {
                alert('edit save error:' +  error.reason);
            } else {
                Router.go('journalEntry_view', {_id: currentEntryId});
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this journal entry?")) {
            var entry = JournalEntries.findOne(this._id);
            entry.remove();
            Router.go('journalEntry_list');
        }
    }
});