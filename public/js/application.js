$(document).ready(function() {
  yodaSubmitEvent();
  stockSubmitEvent();
  spellcheckSubmitEvent();
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

  $('#spellcheck-activate-btn').on('click', function(e) {
    e.preventDefault();
    $('#spellcheck-form').toggle("slow");
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
      console.log(response)
      $('#yoda-output').text(response);
      $('#yoda-input').val('');
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
      console.log(response)
      // var parsed_data = JSON.parse(response);
      $('#stock-output').text(response);
      $('#stock-input').val('');
    });
  });
}

function spellcheckSubmitEvent() {
  $('#spellcheck-submit').on('click', function(event) {
    event.preventDefault();
    var data = $('#spellcheck-convert').serialize();
    var request = $.ajax({
      url: '/spellcheck',
      data: data,
      method: 'POST'
    });

    request.done(function(response) {
      var parsed_data = JSON.parse(response);
      console.log(response)
      $('#spellcheck-output').text(parsed_data.suggestion);
      $('#spellcheck-input').val('');
    });
  });
}