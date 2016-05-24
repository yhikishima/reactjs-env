let $ = require('jquery');

let RegistMemberConstants = require('../constants/RegistMemberConstants');
let RegistMemberDispatcher = require('../dispatcher/RegistMemberDispatcher');

const CONSTANTS = require('../common/CONSTANTS');

require('../common/_mock');

let RegistMemberActions = {
  regist: function(member) {
    RegistMemberDispatcher.dispatch({
      actionType: RegistMemberConstants.REGISTMEMBER_REGIST,
      member: member
    });
  },

  registAll: function(state) {
    RegistMemberDispatcher.dispatch({
      actionType: RegistMemberConstants.REGISTMEMBER_REGIST_ALL,
      state: state
    });
  },

  errors: function(data) {
    switch (data.status) {
      case 400:
        alert("400ですよっと。");
        break;
      case 401:
        alert("401ですよっと。");
        break;
    }
  }
}

module.exports = RegistMemberActions;
