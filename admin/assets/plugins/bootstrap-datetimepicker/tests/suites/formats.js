module('Formats', {
    setup: function(){
        this.input = $('<input type="text">').appendTo('#qunit-fixture');
        this.date = UTCDate(2021, 2, 15, 0, 0, 0, 0); // March 15, 2021
    },
    teardown: function(){
        this.input.data('datetimepicker').picker.remove();
    }
});

test('d: Day of month, no leading zero.', function(){
    this.input
        .val('2021-03-05')
        .datetimepicker({format: 'yyyy-mm-d'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[2], '5');
});

test('dd: Day of month, leading zero.', function(){
    this.input
        .val('2021-03-5')
        .datetimepicker({format: 'yyyy-mm-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[2], '05');
});

test('m: Month, no leading zero.', function(){
    this.input
        .val('2021-03-05')
        .datetimepicker({format: 'yyyy-m-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[1], '3');
});

test('mm: Month, leading zero.', function(){
    this.input
        .val('2021-3-5')
        .datetimepicker({format: 'yyyy-mm-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[1], '03');
});

test('M: Month shortname.', function(){
    this.input
        .val('2021-Mar-05')
        .datetimepicker({format: 'yyyy-M-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[1], 'Mar');
});

test('MM: Month full name.', function(){
    this.input
        .val('2021-March-5')
        .datetimepicker({format: 'yyyy-MM-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[1], 'March');
});

test('yy: Year, two-digit.', function(){
    this.input
        .val('2021-03-05')
        .datetimepicker({format: 'yy-mm-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[0], '12');
});

test('yyyy: Year, four-digit.', function(){
    this.input
        .val('2021-03-5')
        .datetimepicker({format: 'yyyy-mm-dd'})
        .datetimepicker('setValue');
    equal(this.input.val().split('-')[0], '2021');
});

test('H: 12 hour when language has meridiems', function(){
    this.input
        .val('2021-March-5 16:00:00')
        .datetimepicker({format: 'yyyy-mm-dd H:ii p'})
        .datetimepicker('setValue');
    ok(this.input.val().match(/4:00 pm/));
});

test('H: 24 hour when language has no meridiems', function(){

    $.fn.datetimepicker.dates['pt-BR'] = {
      days: ["Domingo", "Segunda", "Ter??a", "Quarta", "Quinta", "Sexta", "S??bado", "Domingo"],
      daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S??b", "Dom"],
      daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
      months: ["Janeiro", "Fevereiro", "Mar??o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: "Hoje",
      suffix: [],
      meridiem: []
    };

    this.input
        .val('2021-March-5 16:00:00')
        .datetimepicker({format: 'yyyy-mm-dd H:ii p', language: 'pt-BR'})
        .datetimepicker('setValue');
    ok(this.input.val().match(/16:00/));
});


test('dd-mm-yyyy: Regression: Prevent potential month overflow in small-to-large formats (Mar 31, 2021 -> Mar 01, 2021)', function(){
    this.input
        .val('31-03-2021')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '31-03-2021');
});

test('dd-mm-yyyy: Leap day', function(){
    this.input
        .val('29-02-2021')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '29-02-2021');
});

test('yyyy-mm-dd: Alternative format', function(){
    this.input
        .val('2021-02-12')
        .datetimepicker({format: 'yyyy-mm-dd'})
        .datetimepicker('setValue');
    equal(this.input.val(), '2021-02-12');
});

test('yyyy-MM-dd: Regression: Infinite loop when numbers used for month', function(){
    this.input
        .val('2021-02-12')
        .datetimepicker({format: 'yyyy-MM-dd'})
        .datetimepicker('setValue');
    equal(this.input.val(), '2021-February-12');
});

test('+1d: Tomorrow', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('+1d')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '16-03-2021');
}));

test('-1d: Yesterday', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('-1d')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '14-03-2021');
}));

test('+1w: Next week', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('+1w')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '22-03-2021');
}));

test('-1w: Last week', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('-1w')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '08-03-2021');
}));

test('+1m: Next month', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('+1m')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '15-04-2021');
}));

test('-1m: Last month', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('-1m')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '15-02-2021');
}));

test('+1y: Next year', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('+1y')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '15-03-2013');
}));

test('-1y: Last year', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('-1y')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '15-03-2011');
}));

test('-1y +2m: Multiformat', patch_date(function(Date){
    Date.now = UTCDate(2021, 2, 15);
    this.input
        .val('-1y +2m')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '15-05-2011');
}));

test('Regression: End-of-month bug', patch_date(function(Date){
    Date.now = UTCDate(2021, 4, 31);
    this.input
        .val('29-02-2021')
        .datetimepicker({format: 'dd-mm-yyyy'})
        .datetimepicker('setValue');
    equal(this.input.val(), '29-02-2021');
}));

test('Invalid formats are force-parsed into a valid date on tab', patch_date(function(Date){
    Date.now = UTCDate(2021, 4, 31);
    this.input
        .val('44-44-4444')
        .datetimepicker({format: 'yyyy-MM-dd'})
        .focus();

    this.input.trigger({
        type: 'keydown',
        keyCode: 9
    });

    equal(this.input.val(), '56-September-30');
}));
