Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () { return Meteor.subscribe('journalEntries'); }
});
// Handle data not found, for routes
// Deviating from the Discover Meteor book (Chapter 5 - Routing) somewhat here,
// per Iron Router docs. Iron Router describes handling a route with 'no data
// found' using a plug in, instead of an onBeforeAction hook.
//  NOTE: (discovered side effect) this plugin causes the route to be hit more
//  than once
Router.plugin('dataNotFound', {
    notFoundTemplate: 'notFound',
    only: ['journalEntryPage']
});

Router.route('/', {name: 'journalEntriesList'});

Router.route('/entries/:slug', {
    name: 'journalEntryPage',
    data: function () { return JournalEntries.findOne({slug: this.params.slug}); }  // TODO: TBD, move findOne to model?
});

Router.route('/submit', {name: 'journalEntrySubmit'});