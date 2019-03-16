$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var image = (message.image != null) ? `<img src="${message.image}">` : ""

    var html = `<div class="content__message__main__box">
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
      var html = buildHTML(data);
      $('.content__message__main').append(html)
      $("#message_form")[0].reset();
    })

    .fail(function(){
      alert('メッセージを入力して下さい');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
    });
    $('.content__message__main').animate({scrollTop: $('.content__message__main')[0].scrollHeight}, 'fast');
  })
})
