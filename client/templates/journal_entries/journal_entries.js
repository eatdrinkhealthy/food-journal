var journalEntriesData = [
    {
        url: 'http://localhost:3000',
        date: '2015-09-23',
        title: 'good day.'
    },
    {
        url: 'http://localhost:3000',
        date: '2015-09-22',
        title: 'getting started again.'
    },
    {
        url: 'http://localhost:3000',
        date: '2015-09-21',
        title: 'not a very good day.'
    },
    {
        url: 'http://localhost:3000',
        date: '2015-08-20',
        title: 'beginning cleanse.'
    },
    {
        url: 'http://localhost:3000',
        date: '2015-08-11',
        title: 'standard diet.'
    }
];

Template.journalEntriesList.helpers({
    journalEntries: journalEntriesData
});