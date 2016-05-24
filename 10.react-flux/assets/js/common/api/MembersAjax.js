'use strict';

let $ = require('jquery');
const CONSTANTS = require('../CONSTANTS');
let BaseAjax = require('./BaseAjax');

class MembersAjax extends BaseAjax {

  constructor() {
    super();
  }

  setUrl(args) {

    /**
     * APIのリクエストURLを作る
     * @param  {object} args
     * @param  {number} args.postId
     * @param  {string} args.type
     */

    switch(args.type) {
      case 'get':
        this.url = CONSTANTS.API_URL.MEMBER;
        break;
      case 'post':
      case 'put':
      case 'del': // delete
    }
  }

  setParams(params) {
    /**
     * APIのリクエストパラメータを作る
     * @param  {object} params
     */
    this.params = params;
  }

  get() {
    return super.get();
  }

  post() {
    return super.post();
  }

  put() {
    return super.put();
  }

  del() {
    return super.del();
  }
}

module.exports = MembersAjax;
