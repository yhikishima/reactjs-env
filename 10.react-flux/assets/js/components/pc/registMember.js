'use strict';

let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');
let RegistMemberActions = require('../../actions/RegistMemberActions');
let RegistMemberStores = require('../../stores/RegistMemberStore');

export default class RegistMember extends React.Component {

  constructor(props) {
    super(props);

    this.state = props.data;


    // RegistMemberActions.fetchAllMember();

    // createClass内でthisが使用できないので、各メソッドをbindさせてあげる
    this.registAllMember = this.registAllMember.bind(this);
    this.registMember = this.registMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.componentWillMount  = this.componentWillMount.bind(this);
    this.editMember = this.editMember.bind(this);
    this.editMemberComplete = this.editMemberComplete.bind(this);
  }

  handleChange() {
    let memberList = RegistMemberStores.getAll();
    this.setState(memberList);
  }

  // renderingの直前
  componentWillMount () {
    RegistMemberStores.addChangeListener(this.handleChange);
  }

  registAllMember() {
    RegistMemberActions.registAll(this.state);
  }

  changeInput(e) {
    e.preventDefault();
    let target = e.target;
    let $target = $(target);
    let listIndex = Number($target.data('editIndex'));
    let tmpState = this.state;

    switch ($target.data('inputClass')) {
      case 'inputName':
        tmpState.list[listIndex].registName = target.value;
        break;
      case 'inputTel':
        tmpState.list[listIndex].registTel = target.value;
        break;
      case 'inputEmail':
        tmpState.list[listIndex].registEmail = target.value;
        break;
    }
    this.setState(tmpState);
  }

  editMember(e) {
    e.preventDefault();

    let $target = $(e.target);

    let listIndex = Number($target.data('editIndex'));
    let tmpState = this.state;
    let editFlg = tmpState.list[listIndex]['editFlg'];
    if (editFlg) {
      tmpState.list[listIndex]['editFlg'] = false;
    } else {
      tmpState.list[listIndex]['editFlg'] = true;
    }

    this.setState(tmpState);
  }

  editMemberComplete(e) {
    e.preventDefault();

    let $target = $(e.target);
    let listIndex = Number($target.data('editIndex'));

    RegistMemberActions.regist(this.state.list[listIndex]);
  }

  registMember(e) {
    e.preventDefault();

    let member = {
      id: null,
      registName: null,
      registTel: null,
      registEmail: null
    };

    // reactのDOMを取得
    member.registName = ReactDOM.findDOMNode(this.refs.registName).value.trim();
    member.registTel = ReactDOM.findDOMNode(this.refs.registTel).value.trim();
    member.registEmail = ReactDOM.findDOMNode(this.refs.registEmail).value.trim();

    RegistMemberActions.regist(member);

    // reactのinputをリセット
    ReactDOM.findDOMNode(this.refs.registName).value = "";
    ReactDOM.findDOMNode(this.refs.registTel).value = "";
    ReactDOM.findDOMNode(this.refs.registEmail).value = "";
  }

  render() {
    let usersList = this.state.list.map((key, i) => {
      return (
        <tr>
          <td>{key.id}</td>
          <td>
            <span className={(key.editFlg)? 'util-hide': ''}>{key.registName}</span>
            <input type="text" value={key.registName} className={(!key.editFlg)? 'util-hide': ''} ref="editName" data-input-class="inputName" onChange={this.changeInput}  data-edit-index={i} />
          </td>
          <td>
            <span className={(key.editFlg)? 'util-hide': ''}>{key.registTel}</span>
            <input type="text" value={key.registTel} className={(!key.editFlg)? 'util-hide': ''} ref="editTel"  onChange={this.changeInput}  data-input-class="inputTel"  data-edit-index={i} />
          </td>
          <td>
            <span className={(key.editFlg)? 'util-hide': ''}>{key.registEmail}</span>
            <input type="text" value={key.registEmail} className={(!key.editFlg)? 'util-hide': ''} ref="editEmail" onChange={this.changeInput}  data-input-class="inputEmail" data-edit-index={i} />
          </td>
          <td><button onClick={this.editMember} data-edit-index={i}>編集する</button></td>
          <td><button onClick={this.editMemberComplete} data-edit-index={i} className={(!key.editFlg)? 'util-hide': ''}>確定する</button></td>
        </tr>
      );
    });

    return (
      <div className="regist-member-contents">
        <h3 className="contents-title">会員一覧</h3>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>名前</th>
              <th>電話番号</th>
              <th>email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList}
          </tbody>
        </table>

        <h3 className="contents-title">登録する</h3>
        <form action="">
          <dl>
            <dt>名前</dt>
            <dd>
              <input type="text"
                     className="regist-name"
                     ref="registName"
               />
            </dd>
            <dt>tel</dt>
            <dd>
              <input type="text"
                     className="regist-tel"
                     ref="registTel"
               />
            </dd>
            <dt>email</dt>
            <dd>
              <input type="text"
                     className="regist-email"
                     ref="registEmail"
               />
            </dd>
          </dl>
          <button onClick={this.registMember}>登録する</button>
        </form>
      </div>
    );
  }
}
