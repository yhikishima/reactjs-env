let RegistMemberDispatcher = require('../dispatcher/RegistMemberDispatcher');
let EventEmitter = require('events').EventEmitter;
let RegistMemberConstants = require('../constants/RegistMemberConstants');
let assign = require('object-assign');

let CHANGE_EVENT = 'change';

let _registMembers = [];

// 登録する
function create(member) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.

  if (member.id || member.id === 0) {
    _registMembers['list'].forEach((val, i) => {
      if (val.id === Number(member.id)) {
        _registMembers['list'][i].registName = member.registName,
        _registMembers['list'][i].registTel = member.registTel,
        _registMembers['list'][i].registEmail = member.registEmail
        _registMembers['list'][i].editFlg = false;
      }
    });
  } else {
    member.id = _registMembers['list'].length;
    _registMembers['list'].push(member);
  }
}

// 一覧をまとめて登録する
function createAll(state) {
  _registMembers = state;
}

let RegistMemberStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (let id in _editSections) {
      if (!_editSections[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _registMembers;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
RegistMemberDispatcher.register(function(action) {
  console.log(action);

  switch(action.actionType) {
    case RegistMemberConstants.REGISTMEMBER_REGIST:
      if (action.member) {
        create(action.member);
        RegistMemberStore.emitChange();
      }
      break;

    case RegistMemberConstants.REGISTMEMBER_REGIST_ALL:
      if (action.state) {
        createAll(action.state);
        RegistMemberStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = RegistMemberStore;
