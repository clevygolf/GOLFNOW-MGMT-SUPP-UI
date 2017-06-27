function datePickerViewModel() {
    var self = this;

    self.date;
    self.opened = false;
    self.format = 'dd-MMMM-yyyy';
    self.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    self.today = function () {
        self.date = new Date();
    };

    self.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() == 0 || date.getDay() == 6));
    };

    self.initDate = self.date;
    self.today();

    self.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        self.opened = true;
    };
}