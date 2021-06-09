var moment = require("../../moment");


    /**************************************************
      Japanese
     *************************************************/

exports["lang:ja"] = {
    setUp : function (cb) {
        moment.lang('ja');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var tests = '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split("_"), i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
        test.done();
    },

    "format" : function (test) {
        test.expect(22);

        var a = [
                ['dddd, MMMM Do YYYY, a h:mm:ss',      '日曜日, 2月 14 2010, 午後 3:25:50'],
                ['ddd, Ah',                            '日, 午後3'],
                ['M Mo MM MMMM MMM',                   '2 2 02 2月 2月'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 日曜日 日 日'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '8 8 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '午後 午後'],
                ['[the] DDDo [day of the year]',       'the 45 day of the year'],
                ['L',                                  '2010/02/14'],
                ['LL',                                 '2010年2月14日'],
                ['LLL',                                '2010年2月14日午後3時25分'],
                ['LLLL',                               '2010年2月14日午後3時25分 日曜日'],
                ['l',                                  '2010/2/14'],
                ['ll',                                 '2010年2月14日'],
                ['lll',                                '2010年2月14日午後3時25分'],
                ['llll',                               '2010年2月14日午後3時25分 日']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var expected = '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var expected = '日曜日 日 日_月曜日 月 月_火曜日 火 火_水曜日 水 水_木曜日 木 木_金曜日 金 金_土曜日 土 土'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "数秒",   "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "1分", "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "1分", "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2分",  "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44分", "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "1時間", "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "1時間", "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2時間",  "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5時間",  "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21時間", "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "1日",   "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "1日",   "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2日",   "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "1日",   "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5日",   "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25日",  "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "1ヶ月", "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "1ヶ月", "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "1ヶ月", "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2ヶ月",  "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2ヶ月",  "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3ヶ月",  "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "1ヶ月", "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5ヶ月",  "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11ヶ月", "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "1年",   "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "1年",   "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2年",   "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "1年",   "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5年",   "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), "数秒後",  "prefix");
        test.equal(moment(0).from(30000), "数秒前", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), "数秒前",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);
        test.equal(moment().add({s: 30}).fromNow(), "数秒後", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "5日後", "in 5 days");
        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "今日 午前2時0分",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "今日 午前2時25分",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "今日 午前3時0分",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "明日 午前2時0分",     "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "今日 午前1時0分",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "昨日 午前2時0分",     "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('[来週]dddd LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[来週]dddd LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[来週]dddd LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[前週]dddd LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[前週]dddd LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[前週]dddd LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        test.expect(4);

        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
        test.done();
    },

    // Sunday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2021, 0,  1]).week(), 1, "Jan  1 2021 should be week 1");
        test.equal(moment([2021, 0,  7]).week(), 1, "Jan  7 2021 should be week 1");
        test.equal(moment([2021, 0,  8]).week(), 2, "Jan  8 2021 should be week 2");
        test.equal(moment([2021, 0, 14]).week(), 2, "Jan 14 2021 should be week 2");
        test.equal(moment([2021, 0, 15]).week(), 3, "Jan 15 2021 should be week 3");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.expect(6);

        test.equal(moment([2006, 11, 31]).week(), 1, "Dec 31 2006 should be week 1");
        test.equal(moment([2007,  0,  1]).week(), 1, "Jan  1 2007 should be week 1");
        test.equal(moment([2007,  0,  6]).week(), 1, "Jan  6 2007 should be week 1");
        test.equal(moment([2007,  0,  7]).week(), 2, "Jan  7 2007 should be week 2");
        test.equal(moment([2007,  0, 13]).week(), 2, "Jan 13 2007 should be week 2");
        test.equal(moment([2007,  0, 14]).week(), 3, "Jan 14 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 29]).week(), 52, "Dec 29 2007 should be week 52");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  5]).week(), 1, "Jan  5 2008 should be week 1");
        test.equal(moment([2008,  0,  6]).week(), 2, "Jan  6 2008 should be week 2");
        test.equal(moment([2008,  0, 12]).week(), 2, "Jan 12 2008 should be week 2");
        test.equal(moment([2008,  0, 13]).week(), 3, "Jan 13 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 29]).week(), 1, "Dec 29 2002 should be week 1");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  4]).week(), 1, "Jan  4 2003 should be week 1");
        test.equal(moment([2003,  0,  5]).week(), 2, "Jan  5 2003 should be week 2");
        test.equal(moment([2003,  0, 11]).week(), 2, "Jan 11 2003 should be week 2");
        test.equal(moment([2003,  0, 12]).week(), 3, "Jan 12 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 28]).week(), 1, "Dec 28 2008 should be week 1");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  3]).week(), 1, "Jan  3 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 2, "Jan  4 2009 should be week 2");
        test.equal(moment([2009,  0, 10]).week(), 2, "Jan 10 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 3, "Jan 11 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 27]).week(), 1, "Dec 27 2009 should be week 1");
        test.equal(moment([2010,  0,  1]).week(), 1, "Jan  1 2010 should be week 1");
        test.equal(moment([2010,  0,  2]).week(), 1, "Jan  2 2010 should be week 1");
        test.equal(moment([2010,  0,  3]).week(), 2, "Jan  3 2010 should be week 2");
        test.equal(moment([2010,  0,  9]).week(), 2, "Jan  9 2010 should be week 2");
        test.equal(moment([2010,  0, 10]).week(), 3, "Jan 10 2010 should be week 3");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(5);

        test.equal(moment([2010, 11, 26]).week(), 1, "Dec 26 2010 should be week 1");
        test.equal(moment([2011,  0,  1]).week(), 1, "Jan  1 2011 should be week 1");
        test.equal(moment([2011,  0,  2]).week(), 2, "Jan  2 2011 should be week 2");
        test.equal(moment([2011,  0,  8]).week(), 2, "Jan  8 2011 should be week 2");
        test.equal(moment([2011,  0,  9]).week(), 3, "Jan  9 2011 should be week 3");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(5);

        test.equal(moment([2021, 0,  1]).format('w ww wo'), '1 01 1', "Jan  1 2021 should be week 1");
        test.equal(moment([2021, 0,  7]).format('w ww wo'), '1 01 1', "Jan  7 2021 should be week 1");
        test.equal(moment([2021, 0,  8]).format('w ww wo'), '2 02 2', "Jan  8 2021 should be week 2");
        test.equal(moment([2021, 0, 14]).format('w ww wo'), '2 02 2', "Jan 14 2021 should be week 2");
        test.equal(moment([2021, 0, 15]).format('w ww wo'), '3 03 3', "Jan 15 2021 should be week 3");

        test.done();
    }
};
