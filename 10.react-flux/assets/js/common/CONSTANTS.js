
module.exports = (() => {
  'use strict';

  // このファイルには定数を書く

  const CONSTANTS = {

    API_URL : {
      POSTS : '/api/posts',
      POST  : '/api/post/:post_id',
      TEST  : '/api/test/:test_id',
      MEMBER: '/api/members'
    }

  };

  return CONSTANTS;

})();
