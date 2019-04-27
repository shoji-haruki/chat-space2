$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var image = (message.image != null) ? `<img src="${message.image}">` : ""

    var html = `<div class="content__message__main__box" data-message-id="${message.id}">
  <div class="content__message__main__box__top">
    <p class="content__message__main__box__top__talker">
      ${message.user_name}
    </p>
    <p class="content__message__main__box__top__date">
      ${message.created_at}
    </p>
  </div>
  <p class="content__message__main__box__text">
      <p class="lower-message__content">
        ${message.content}
      </p>
      ${image}
  </p>
</div>
`
    return html;
  }


  function message_list(){
    if($('.content__message__main__box')[0]){
      var message_id = $('.content__message__main__box:last').data('message-id');
    } else {
      var message_id = 0
    }
    var url = location.href;
    if (message_id != 0) {
      $.ajax({
        url: url,
        type: "GET",
        data: {
          message: { id: message_id }
        },
        dataType: 'json',
      })

      .done(function(datas){
        if (datas.length != 0) {
        $.each(datas, function(i, data){
          var html = buildHTML(data)
          $('.content__message__main').append(html)
        });
        $('.content__message__main').animate({scrollTop: $('.content__message__main')[0].scrollHeight}, 'fast');
        }
      })

      .fail(function(){
        alert('自動更新に失敗しました');
      });
    };
  };

  var url = location.href;
  function urlcheck(url) {
    if (url.match(/.*\/groups\/\d+\/messages.*/)) {
        return true;
    } else {
        return false;
    }
  }
  if(urlcheck(url)) {
    setInterval(message_list, 5 * 1000);
  }


  $('#message_form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      if (data.length != 0) {
        var html = buildHTML(data);
        $('.content__message__main').append(html)
        $("#message_form")[0].reset();
        $('.content__message__main').animate({scrollTop: $('.content__message__main')[0].scrollHeight}, 'fast');
      }else{
        alert('メッセージを入力して下さい');
      }
    })

    .fail(function(){
      alert('メッセージを入力して下さい');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
    });
  })
})

