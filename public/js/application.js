$(document).ready(function() {
  yodaSubmitEvent();
  stockSubmitEvent();
  bindClickEvents();
});

function bindClickEvents() {
  $('#weather').on('click', function(e) {
    e.preventDefault();
    $('#hidden-weather').toggle("slow");
  });

  $('#yoda-speak-btn').on('click', function(e) {
    e.preventDefault();
    $('#yoda-form').toggle("slow");
  });

  $('#stock-activate-btn').on('click', function(e) {
    e.preventDefault();
    $('#stock-form').toggle("slow");
  });


  $('#game-activate-btn').on('click', function(e) {
    e.preventDefault();
    $('#game-form').toggle("slow");
  });
}

function yodaSubmitEvent() {
  $('#yoda-submit').on('click', function(event) {
    event.preventDefault();
    var data = $('#yoda-convert').serialize();
    var request = $.ajax({
      url: '/yoda',
      data: data,
      method: 'POST'
    });

    request.done(function(response) {
      $('#yoda-output').text(response);
      this.find('#yoda-input').val('');
    });
  });
}

function stockSubmitEvent() {
  $('#stock-submit').on('click', function(event) {
    event.preventDefault();
    var data = $('#stock-convert').serialize();
    var stock_request = $.ajax({
      url: '/stocks',
      data: data,
      method: 'POST'
    });

    stock_request.done(function(response) {
      console.log('hhhhhhererererer')
      $('#stock-output').text(response);
      this.find('#stock-input').val('');
    });
  });
}

// function bindClickEvent(type, className, cb) {
//   $('.class').on('click', '.' + className, function() {
//     var $node = $(this).closest('.class');
//     var content = $node.find('h2').text();
//     var url = '/todos/' + content;
//     $.ajax({ url: url, type: type }).done(cb.bind(this, $node));
//   });
// }