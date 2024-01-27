
$(".btnBookID").click(function (event) {
  // Извлечение значения ID книги из URL-адреса страницы.
  var pathname = $(location).attr("pathname");
  var bookIdPosition = pathname.lastIndexOf("/") + 1;
  // Отправка запроса на сервер для получения статуса "Книга свободна...".
  $.ajax({
    url: "/book/" + pathname.substr(bookIdPosition),
    method: "PATCH",
    dataType: "json",
    data: { id: pathname.substr(bookIdPosition) },
    // Обработчик успешного ответа.
    success: function (data) {
      alert(
        "Книга свободна и ты можешь прийти за ней." +
          " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
          " Лучше предварительно прозвонить и предупредить нас, чтоб " +
          " не попасть в неловкую ситуацию. Тел. 099 196 24 69"
      );
    },
    // Обработка ошибки ответа.
    error: (jqXHR, exception) => {
      alert(`Server error, status: ${jqXHR.responseText}`);
    },
  });
});
