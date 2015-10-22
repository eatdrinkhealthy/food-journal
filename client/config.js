accountsUIBootstrap3.logoutCallback = function (error) {
    if (error) console.log("Error:", error);

    Router.go('journalEntry_list');
};