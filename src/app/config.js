'use strict';
app.factory('config', function () {
    var cfg = {};
    cfg.clientId = 'support';

    var sub = window.location.href.split('.')[0];
    var tokens = sub.split('-');
    var env = '';

    if (tokens.length > 1) {
        env = tokens[0] + '-';

        cfg.baseUrl = env + 'manageapi.golfnowcentral.com/';
    }
    else {
        cfg.baseUrl = location.protocol + '//' + env + 'manageapi.golfnowcentral.com/';
    }

    cfg.url = cfg.baseUrl + "support/";
    cfg.commonUrl = cfg.baseUrl + 'common/';

    return cfg;
});