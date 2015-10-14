Template.journalEntrySubmit.helpers({
    newValidDate: function () {
        // TODO: provide validation (unique new date)
        return moment().format('M/D/YY');
    }
});

Template.journalEntrySubmit.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: ['10/05/2015']   // TODO: assign existing entry dates
    });
};

Template.journalEntrySubmit.events({
    'click .glyphicon': function(e) {
        // NOTE, (per the docs) this functionality should work simply by adding
        // input-group-addon class to the span around the glyph, but wasn't working
        // ...so hard coded it.
        e.preventDefault();
        $('#entry-datepicker').datepicker('show');
    }
});