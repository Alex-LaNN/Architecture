import { view } from "./common.js";

var pathNameUrl = $(location).attr('pathname').split('/');
var pathUrl = (pathNameUrl[1] == 'admin') ? '/admin' : '';

/* ------------- The result of the search in autocomplete list / Результат поиска в списке автозаполнения      --------------*/
var callbackQueryMiniItemsSearch = function(res, text) {
    $('.loader').show();
    if (res.data.total.amount > 0) {
        var books = res.data.books;
        view.addMiniItemsSearch(pathUrl, books, text);
    } else {
        view.addMiniItemsSearch(pathUrl, [{
            id: 'no-cover',
            title: 'По запросу "' + text + '" ничего не найдено :(',
            author: 'Миллионы натренированных обезьян облазили всю библиотеку и не нашли ничего подходящего, что могло бы соответствовать Вашему запросу.'
        }]);
    }
    setTimeout(function() {
        $('.loader').hide();
    }, 200);
};

/*-------------------The message on the search result / Сообщение о результате поиска -----------------------*/
var msgResultSearchText = function(text, number_found) {
    $('.text_found').text(text);
    var titles = ['совпадение', 'совпадения', 'совпадений'];
    var cases = [2, 0, 1, 1, 1, 2];
    var coincidence = titles[(number_found % 100 > 4 && number_found % 100 < 20) ? 2 :
        cases[(number_found % 10 < 5) ? number_found % 10 : 5]];

    $('.number_found').text(number_found + " " + coincidence);
};

/* ----------------------- Search result on the page / Результат поиска на странице ------------------------*/
var callbackQueryItemsSearch = function(res, text) {
    view.addBooksItems(res.data.books);
    $('.breadcrumb .active').text('поиск');
    msgResultSearchText(text, res.data.books.length);
};

/* ------------------- Get the query in database searching / Получить запрос при поиске по базе данных -------------------*/
var requestBooksSearch = function(callback) {
    var text = htmlspecialchars($('#search').val());
    if (text.length > 0) {
      text = text.replace(/(^\s+|\s+$)/g, "");
      var textEncode = encodeURIComponent(text); // shielding request / запрос на экранирование

      doAjaxQuery(
        "GET",
        "" + pathUrl + "/api/v1/books?search=" + textEncode + "",
        null,
        function (res) {
          callback(res, text);
        }
      );
    } else {
        $('#list').html('').hide();
    }
};

/* ------------------------------- Hide auto search / Скрыть автопоиск -------------------------*/
$('body').click(function(event) {
    if ($(event.target).attr('id') !== 'search' && $(event.target).attr('id') !== 'list') {
        $('#list').hide(200);
    }
});

/* ---------- Live search if the search did not introduced n time / Живой поиск, если поиск не был введен n раз ----------- */
$('#search').keydown(function(event) {
    var text = $(this).val();
    if (event.keyCode === 13) {
        event.preventDefault();
        if (text.length > 0) {
            var encodeText = encodeURIComponent($('#search').val());
            if (pathUrl == '/admin') {
                requestBooksSearch(function(res) {
                    view.addBooksList(res);
                    msgResultSearchText(text, res.data.books.length);
                    $('.found').show();
                    $('#list').hide(200);
                });
            } else {
                var url = 'http://' + window.location.host + pathUrl + '/search?search=' + encodeText + '';
                window.location = url;
            }
        }
    }
    if (text.length > 0) {
        if (!(event.keyCode >= 33 && event.keyCode <= 40) &&
            !(event.keyCode >= 16 && event.keyCode <= 20) &&
            (event.keyCode !== 27) &&
            (event.keyCode !== 13)) {
            var task = setTimeout(function() {
                requestBooksSearch(callbackQueryMiniItemsSearch);
            }, 500);
            if (pathUrl == '/admin') {
                $('#eAutoComplete_itemMore').find('a').on('click', function(event) {
                    event.preventDefault();
                    alert('yes');

                });
            }
        }

        $('#search').keydown(function(event) {
            if (!(event.keyCode >= 33 && event.keyCode <= 40) &&
                !(event.keyCode >= 16 && event.keyCode <= 20)) {
                clearTimeout(task);
            }
        });
    } else {
        $('#list').hide();
    }
});


$(document).ready(function() {
    (function() {
        if (pathNameUrl[1] == 'search' || pathNameUrl[2] == 'search') {
            var search_text = $(location).attr('search').split('=');
            search_text = decodeURIComponent((search_text[1] == null) ? ' ' : search_text[1]);
            $('#search').val(htmlspecialchars(search_text));
            text = search_text.replace(/(^\s+|\s+$)/g, '');
            var textEncode = encodeURIComponent(text); // shielding request
            if (pathNameUrl[1] == 'search') {
                doAjaxQuery('GET', '' + pathUrl + '/api/v1/books?search=' + textEncode + '', null,
                    function(res) {
                        callbackQueryItemsSearch(res, text);
                    });
            } else if (pathNameUrl[1] == 'admin' && pathNameUrl[2] == 'search') {
                requestBooksSearch(function(res) {
                    view.addBooksList(res);
                    msgResultSearchText(text, res.data.books.length);
                    $('.found').show();
                    $('#list').hide(200);
                });
            }
        }
    }());
});

function htmlspecialchars(html) {
  html = html.replace(/&/g, "&amp;");
  html = html.replace(/</g, "&lt;");
  html = html.replace(/>/g, "&gt;");
  html = html.replace(/"/g, "&quot;");
  return html;
}

var global = {
  items_limit_on_page_load: 24,
  number_of_items_onscroll: 6,
  filter: "new",
};