
$(".btnBookID").click(function (event) {
  // Retrieving the book ID value from the page URL.
  var pathname = $(location).attr("pathname");
  var bookIdPosition = pathname.lastIndexOf("/") + 1;
  // Sending a request to the server to obtain status "Книга свободна...".
  $.ajax({
    url: "/book/" + pathname.substr(bookIdPosition),
    method: "PATCH",
    dataType: "json",
    data: { id: pathname.substr(bookIdPosition) },
    // Successful response handler.
    success: function (data) {
      alert(
        "Книга свободна и ты можешь прийти за ней." +
        " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
        " Лучше предварительно прозвонить и предупредить нас, чтоб " +
        " не попасть в неловкую ситуацию. Тел. 099 196 24 69"
      );
    },
    error: (jqXHR, exception) => {
      alert(`Server error, status: ${jqXHR.responseText}`);
    },
  });
});
