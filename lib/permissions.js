ownsDocument = function (userId, doc) {
    return doc && doc.ownerId === userId;
}