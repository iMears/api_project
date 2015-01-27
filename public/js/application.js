$(document).ready(function() {
  bindSubmitEvent();
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
}

function bindSubmitEvent() {
  $('#yoda-submit').on('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var data = $this.serialize();
    console.log("$this is " + $this);
    console.log("$this.serialize() is " + data);
    var key = "W5392mrRbOmshPj4Ks371v6EauPrp1Zy0PPjsn8jLWQD9iIQmr";
    var request = $.ajax({
      url: 'https://yoda.p.mashape.com/yoda',
      data: data,
      headers: { 'X-Mashape-Key': key },
      method: 'GET'
    });

    request.done(function(response) {
      addYodaString(JSON.parse(response));
      $this.find('#yoda-string').val('');
    });

    request.fail(function(response) {
      console.log("it failed!");
      $('#yoda-string').text(response);
      $this.find('#yoda-input').val('');
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