'use strict';

let $ = require('jquery');
let $mockjax = require('jquery-mockjax');
const CONSTANTS = require('./CONSTANTS');

module.exports = (() => {

  $mockjax($, window); // mockjaxに$を渡して動くようにしている。この記述がないと動かない

  // 検証用
  $.mockjax({
    url: CONSTANTS.API_URL.POST.replace(':post_id', 999),
    type: 'get',
    responseText: {
      id: 1,
      number: 1,
      scope: 'web業界',
      company_name: 'hogehoge株式会社'
    }
  });

  $.mockjax({
    url: CONSTANTS.API_URL.TEST.replace(':test_id', 999),
    type: 'get',
    responseText: {
      creator_name: 'Abec',
      test_data: '問題たちとか設問たちとか、、、',
      updated_at: 'web業界',
      webtest_id: 999,
      webtest_name: 'テストのテスト'
    }
  });


  // 検証用
  $.mockjax({
    url: CONSTANTS.API_URL.MEMBER,
    type: 'get',
    status: 200,
    responseText: {
      list : [
        {
          id: 0,
          registName : "hoge",
          registTel  : "0001",
          registEmail  : "hoge@gmail.com",
          editFlg: false
        },
        {
          id: 1,
          registName : "hoge2",
          registTel  : "0002",
          registEmail  : "hoge2@gmail.com",
          editFlg: false
        },
        {
          id: 2,
          registName : "hoge3",
          registTel  : "0002",
          registEmail  : "hoge2@gmail.com",
          editFlg: false
        }
      ]
    }
  });


})();
