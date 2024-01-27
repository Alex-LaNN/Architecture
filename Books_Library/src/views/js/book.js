/*------------------ Sending email by clicking on the button ----------------*/
$(".btnBookID").click(function (event) {
  var pathname = $(location).attr("pathname");
  // извлечение значения ID книги из URL-адреса страницы
  var bookIdPosition = pathname.lastIndexOf("/") + 1;
  $.ajax({
    url: "/book/" + pathname.substr(bookIdPosition),
    method: "PATCH",
    dataType: "json",
    data: { id: pathname.substr(bookIdPosition) },
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
