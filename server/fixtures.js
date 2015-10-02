if (JournalEntries.find().count() === 0) {
    var je1 = new JournalEntry();
    je1.set('_id', '2015-09-23');
    je1.set('title', 'good day.');
    je1.save();

    var je2 = new JournalEntry();
    je2.set({
        _id: '2015-09-21',
        title: 'not a very good day.'
    });
    je2.save();

    var je3 = new JournalEntry();
    je3.set({
        _id: '2015-09-22',
        title: 'getting started again.'
    });
    je3.save();

    var je4 = new JournalEntry();
    je4.set({
        _id: '2015-08-20',
        title: 'beginning cleanse.'
    });
    je4.save();

    var je5 = new JournalEntry();
    je5.set({
        _id: '2015-08-11',
        title: 'standard diet.'
    });
    je5.save();
}
