if (JournalEntries.find().count() === 0) {
    var je1 = new JournalEntry();
    je1.set('title', 'good day.');
    je1.set('date', new Date('2015-09-23'));
    je1.save();

    var je2 = new JournalEntry();
    je2.set({
        title: 'not a very good day.',
        date: new Date('2015-09-21')
    });
    je2.save();

    var je3 = new JournalEntry();
    je3.set({
        title: 'getting started again.',
        date: new Date('2015-09-22')
    });
    je3.save();

    var je4 = new JournalEntry();
    je4.set({
        title: 'beginning cleanse.',
        date: new Date('2015-08-20')
    });
    je4.save();

    var je5 = new JournalEntry();
    je5.set({
        title: 'standard diet.',
        date: new Date('2015-08-11')
    });
    je5.save();
}
