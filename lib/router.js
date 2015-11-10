/**
 * Configure Router
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

// Do not do any automatic template name conversion
Router.setTemplateNameConverter(function (str) { return str; });

// Handle data not found, for routes
// Deviating from the Discover Meteor book (Chapter 5 - Routing) somewhat here,
// per Iron Router docs. Iron Router describes handling a route with 'no data
// found' using a plug in, instead of an onBeforeAction hook.
//  NOTE: (discovered side effect) this plugin causes the route to be hit more
//  than once
Router.plugin('dataNotFound', {
    notFoundTemplate: 'notFound',
    only: ['journalEntry_view']
});

var requireLogin = function () {
    if(!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};
Router.onBeforeAction(requireLogin, {except: ['journalEntry_list']});

/**
 * Define Routes
 */
Router.route('/entries/:_id', {
    name: 'journalEntry_view',
    waitOn: function () { return Meteor.subscribe('singleJournalEntry', this.params._id); },
    data: function () { return JournalEntries.findOne(this.params._id); }
});

Router.route('/entries/:_id/edit', {
    name: 'journalEntry_edit',
    waitOn: function () { return Meteor.subscribe('singleJournalEntry', this.params._id); },
    data: function () { return JournalEntries.findOne(this.params._id);  }
});

Router.route('/create', {
    name: 'journalEntry_create',
    waitOn: function () { return Meteor.subscribe('userEntryDateList'); }
});

Router.route('/:limit?', {
    name: 'journalEntry_list',
    controller: 'JournalEntryListController'
});
