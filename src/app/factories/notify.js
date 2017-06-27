'use strict';
app.factory('notify', [function () {

    var notification = {
        info: function (message, caption) { toastr.info(message, caption); },
        success: function (message, caption) { toastr.success(message, caption); },
        warning: function (message, caption) { toastr.warning(message, caption); },
        error: function (message, caption) { toastr.error(message, caption); }
    };

    return notification;
}]);