Template.journalEntrySubmit.helpers({
    currentValidDate: function () {
        // TODO: provide validation (unique new date)
        return moment().format('MM-DD-YYYY');
    }
});

Template.journalEntrySubmit.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        format: 'mm/dd/yyyy',
        datesDisabled: ['10/05/2015']   // TODO: assign existing entry dates
    });
};