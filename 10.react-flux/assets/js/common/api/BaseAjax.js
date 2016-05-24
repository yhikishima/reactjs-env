'use strict';

let $ = require('jquery');
const CONSTANTS = require('../CONSTANTS');
let defer = $.Deferred();

class BaseAjax {

  constructor() {
    $.ajaxSetup({
      dataType: 'json',
      success: defer.resolve,
      error: defer.reject
      // beforeSend: changeToLoading,
      // complete: finishLoading
    });
  }

  get() {
    $.ajax({
      url: this.url,
      type: 'get',
      data: this.params
    });
    return defer.promise();
  }

  post() {
    $.ajax({
      url: this.url,
      type: 'post',
      data: this.params
    });
    return defer.promise();
  }

  put() {
    $.ajax({
      url: this.url,
      type: 'put',
      data: this.params
    });
    return defer.promise();
  }

  del() {
    $.ajax({
      url: this.url,
      type: 'delete',
      data: this.params
    });
    return defer.promise();
  }

  fetch() {
    $.ajax({
      url: this.url,
      type: 'get',
      data: this.params
    });
    return defer.promise();
  }
}

module.exports = BaseAjax;
