Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () { return Meteor.subscribe('journalEntries'); }
});
// Handle data not found, for routes
Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});
// Deviating from the Discover Meteor book (Chapter 5 - Routing) somewhat here,
// per Iron Router docs. Iron Router describes handling a route with 'no data
// found' using a plug in, instead of an onBeforeAction hook.

Router.route('/', {name: 'journalEntriesList'});

Router.route('/entries/:_id', {
    name: 'journalEntryPage',
    data: function () {
        //var entry = JournalEntries.findOne(this.params._id);
        //console.log('id found:', entry._id);
        return JournalEntries.findOne(this.params._id);
    }
});
