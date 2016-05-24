let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');

let RegistMember = require('../../components/pc/registMember');
let RegistMemberStore = require('../../stores/RegistMemberStore');
let RegistMemberActions = require('../../actions/RegistMemberActions');
let MembersAjax = require('../../common/api/MembersAjax');

const CONSTANTS = require('../../common/CONSTANTS');

require('../../common/_mock');

// member register page
module.exports = () => {
  'use strict';

  if (!$('#member-register').length) {
    return;
  }

  let membersAjax = new MembersAjax();

  membersAjax.setUrl({type : 'get'});
  membersAjax.get()
    .done(function(data) {

      ReactDOM.render(
        <RegistMember data={data} />,
        document.getElementById('regist-member-app')
      );

      RegistMemberActions.registAll(data);
    })
    .fail(function(data) {
      RegistMemberActions.errors(data);
    });
};
