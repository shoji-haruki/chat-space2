$(function() {

var user_list = $("#user-search-result");

function appendUser(user) {
 var html = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${ user.user_name }</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.user_id }" data-user-name="${ user.user_name }">追加</a>
</div>`
  user_list.append(html);
}

function appendErrMsgToHTML(msg) {
  var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
  user_list.append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    if( input.length != 0 ) {

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }else {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    }else{
      $("#user-search-result").empty();
    }
  });

  var group_member = $(".chat-group-user__name");
function append(name, id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${ id }'>
  <p class='chat-group-user__name'>${ name }</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ id }" data-user-name="${ name }">削除</a>
</div>`
  group_member.append(html);
}

  $('#user-search-result').on('click', '.user-search-add', function(){
  $(this).parent().empty();
  var name = $(this).attr("data-user-name");
  var id = $(this).attr("data-user-id");
  append(name, id);
  });

  $('.chat-group-user__name').on('click', '.user-search-remove', function(){
  var user = {user_id: $(this).attr('data-user-id'), user_name: $(this).attr('data-user-name')};
  $(this).parent().empty();
  appendUser(user)
  });
});
