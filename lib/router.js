Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () { return Meteor.subscribe('journalEntries'); }
});

Router.route('/', {name: 'journalEntriesList'});