console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET', // sql SELECT
      url: '/books',
      success: function(response) {
        console.log('response', response);
        $('#bookShelf').empty();
        for (var i = 0; i < response.length; i++) {
          $('tbody').append('<tr><td> ' + response[i].title + ' </td><td> ' + response[i].author + ' </td><td>  ' + response[i].edition + ' </td><td> ' + response[i].publisher + ' </td> </tr>')
        }
      }
    });
  }

  $('#newBookButton').on('click', function(){
    var newBookObject = {};
    newBookObject.title = $('#newBookTitle').val();
    newBookObject.author = $('#newBookAuthor').val();
    newBookObject.edition = $('#newBookEdition').val();
    newBookObject.publisher = $('#newBookPublisher').val();
    console.log(newBookObject);
    $.ajax({
      type: 'POST', // sql INSERT
      url: '/books/new',
      data: newBookObject,
      success: function(response){
        console.log(response);
        getBookData();
      }
    });
  });
});
