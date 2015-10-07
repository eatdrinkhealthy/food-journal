Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () { return Meteor.subscribe('journalEntries'); }
});
Router.plugin('dataNotFound', {
    notFoundTemplate: 'notFound',
    only: ['journalEntryPage']
});

Router.route('/', {name: 'journalEntriesList'});

Router.route('/entries/:_id', {
    name: 'journalEntryPage',
    data: function () {
        if (Meteor.isClient) console.log('search id:', this.params._id);
        var jEntry = JournalEntries.findOne(this.params._id);
        if (Meteor.isClient) console.log('found:', jEntry ? jEntry._id : 'undefined');
        return jEntry;
        //return JournalEntries.findOne(this.params._id);
    }
});

// Handle data not found, for routes
//Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});
// Deviating from the Discover Meteor book (Chapter 5 - Routing) somewhat here,
// per Iron Router docs. Iron Router describes handling a route with 'no data
// found' using a plug in, instead of an onBeforeAction hook.
//Router.onBeforeAction('dataNotFound');
