/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 107 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `pages` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `authors` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `views` int DEFAULT '0',
  `clicks` int DEFAULT '0',
  `deleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 73 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: connections
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `connections` (
  `bookId` int NOT NULL,
  `authorId` int NOT NULL,
  PRIMARY KEY (`bookId`, `authorId`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `book_authors` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_authors
# ------------------------------------------------------------

INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (10, 'Scott Chacon');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (21, 'Алан Болье');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (50, 'Александр Сераков');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (28, 'Андрей Богуславский');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (25, 'Анирад Коул');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (102, 'апапапап');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (47, 'Белов А.');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (22, 'Брайан У. Керниган');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (33, 'Брюс Эккель');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (6, 'Герберт Шилдт');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (41, 'Гэри Маклин Холл');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (58, 'Джей Макгаврен');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (42, 'Джеймс Р. Грофф');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (18, 'Дженнифер Роббинс');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (46, 'Джереми Блум');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (9, 'Джереми Тинли');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (45, 'Джон Вудкок');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (17, 'Джош Лоспинозо');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (7, 'Джошуа Дэвис');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (30, 'Дон Гриффитс');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (26, 'Дрешер Даниэль');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (59, 'Дрю Нейл');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (40, 'Дэвид Флэнаган');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (11, 'Дэниел Джей Барретт');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (27, 'Имран Башир');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (104, 'йцйцй');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (35, 'Клиффорд Штайн');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (2, 'Лоренс Ларс Свекис');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (43, 'Люк Веллинг');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (31, 'М. Вильямс');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (5, 'Майк МакГрат');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (3, 'Майке ван Путтен');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (1, 'Марк Лутц');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (29, 'Марк Саммерфильд');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (57, 'Мартин Фаулер');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (34, 'Михайлов Владимир Викторович');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (16, 'Николай Прохоренок');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (13, 'Пакстон Джон');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (60, 'Персиваль Г.');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (53, 'Пол Дэйтел');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (56, 'Прамодкумар Дж. Садаладж');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (15, 'Резиг Джон');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (4, 'Роб Персиваль');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (19, 'Роберт де Грааф');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (54, 'Роберт Мартин');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (23, 'Род Стивенс');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (36, 'Рональд Ривест');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (44, 'Сергей Мастицкий');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (49, 'Сет Гринберг');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (8, 'Сильвия Ботрос');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (48, 'Сэмюэл Грингард');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (51, 'Тим Кедлек');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (38, 'Томас Кормен');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (32, 'Уэс Маккинни');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (14, 'Фергюсон Расс');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (52, 'Харви Дейтел');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (24, 'Хенрик Бринк');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (39, 'Хорхе Паласиос');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (105, 'цуцу');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (37, 'Чарльз Лейзерсон');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (101, 'ывывыв');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (55, 'Энтони Грей');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (20, 'Энтоны Молинаро');
INSERT INTO
  `book_authors` (`id`, `name`)
VALUES
  (12, 'Эрик Чоу');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    1,
    'Python для начинающих',
    2023,
    300,
    'Книга для начинающих, в которой подробно рассказывается о языке программирования Python.',
    'Марк Лутц',
    'Python для начинающих',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    2,
    'JavaScript с нуля до профи',
    2022,
    250,
    'Книга для начинающих, в которой подробно рассказывается о языке программирования JavaScript.',
    'Лоренс Ларс Свекис, Майке ван Путтен, Роб Персиваль',
    'JavaScript с нуля до профи',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    3,
    'Java программирование для начинающих',
    2021,
    350,
    'Книга для начинающих, в которой подробно рассказывается о языке программирования Java.',
    'Майк МакГрат',
    'Java программирование для начинающих',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    4,
    'C++ базовый курс',
    2020,
    400,
    'Книга для начинающих, в которой подробно рассказывается о языке программирования C++.',
    'Герберт Шилдт',
    'C++ базовый курс',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    5,
    'HTML и CSS. Разработка и дизайн веб-сайтов',
    2019,
    200,
    'Эта книга – самый простой и интересный способ изучить HTML и CSS. Независимо от стоящей перед вами задачи : спроектировать и разработать веб-сайт с нуля.',
    'Джошуа Дэвис',
    'HTML и CSS. Разработка и дизайн веб-сайтов',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    6,
    'MySQL по максимуму',
    2018,
    150,
    'Книга для начинающих, в которой подробно рассказывается о языке запросов SQL.',
    'Джереми Тинли, Сильвия Ботрос',
    'MySQL по максимуму',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    7,
    'Pro Git',
    2017,
    100,
    'Книга для начинающих, в которой подробно рассказывается о системе контроля версий Git.',
    'Scott Chacon',
    'Pro Git',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    8,
    'Linux. Командная строка. Лучшие практики',
    2016,
    250,
    'Если вы системный администратор, разработчик программного обеспечения, SRE-инженер или пользователь Linux, книга поможет вам работать быстрее, элегантнее и эффективнее.',
    'Дэниел Джей Барретт',
    'Linux. Командная строка. Лучшие практики',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    9,
    'Python для сетевых инженеров Автоматизация сети, программирование и DevOps.',
    2023,
    800,
    'Книга для профессионалов, в которой подробно рассказывается о языке программирования Python.',
    'Эрик Чоу',
    'Python для сетевых инженеров Автоматизация сети, программирование и DevOps.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    10,
    'JavaScript для профессионалов',
    2016,
    240,
    'Книга для профессионалов, в которой подробно рассказывается о языке программирования JavaScript.',
    'Резиг Джон , Фергюсон Расс, Пакстон Джон',
    'JavaScript для профессионалов',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    11,
    'Основы Java',
    2017,
    704,
    'Книга для профессионалов, в которой подробно рассказывается о языке программирования Java.',
    'Николай Прохоренок',
    'Основы Java',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    12,
    'C++ для профи. Молниеносный старт.',
    2021,
    816,
    'Книга адресована программистам среднего и продвинутого уровней, вы продеретесь сквозь тернии к самому ядру С++..',
    'Джош Лоспинозо',
    'C++ для профи. Молниеносный старт.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    13,
    'Веб-дизайн для начинающих. HTML, CSS, JavaScript и веб-графики.',
    2021,
    956,
    'Книга поможет освоить веб-дизайн без опыта. На практических примерах показано, как создать простой сайт и постепенно его усовершенствовать.',
    'Дженнифер Роббинс',
    'Веб-дизайн для начинающих. HTML, CSS, JavaScript и веб-графики.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    14,
    'SQL. Коллекция рецептов.',
    2022,
    592,
    'Рассмотрены готовые рецепты для решения практических задач при работе с СУБД Oracle, DB2, SQL Server, MySQL и PostgreSQL.',
    'Энтоны Молинаро, Роберт де Грааф',
    'SQL. Коллекция рецептов.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    15,
    'Изучаем SQL. Генерация, выборка и обработка данных.',
    2022,
    402,
    'Данная книга отличается широким охватом как тем (от азов SQL до таких сложных вопросов, как аналитические функции и работа с большими базами данных), так и конкретных баз данных (MySQL, Oracle Database, SQL Server).',
    'Алан Болье',
    'Изучаем SQL. Генерация, выборка и обработка данных.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    16,
    'Язык программирования \"GO\".',
    2022,
    432,
    'Книга  поможет вам познакомиться с языком Go поближе, узнать о его предназначении и преимуществах, и о том, как писать программы на этом языке (причем это будут программы не начинающего а профессионального программиста — эффективные и идеоматичные).',
    'Брайан У. Керниган',
    'Язык программирования GO',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    17,
    'Алгоритмы. Теория и практическое применение',
    2016,
    544,
    'Данная книга — своеобразное руководство, изложенное простым языком. Разбирается масса важнейших классических алгоритмов; рассказывается, в каких случаях и какие из них необходимо применить.',
    'Род Стивенс',
    'Алгоритмы. Теория и практическое применение',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    18,
    'Машинное обучение',
    2017,
    336,
    'Эта книга рассчитана на тех, кто хочет решать самые разные задачи с помощью машинного обучения.',
    'Хенрик Бринк',
    'Машинное обучение',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    19,
    'Искусственный интеллект и компьютерное зрение.',
    2023,
    624,
    'Практические примеры из этой книги научат вас создавать приложения глубокого обучения для облачных, мобильных и краевых (edge) систем.',
    'Анирад Коул',
    'Искусственный интеллект и компьютерное зрение.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    20,
    'Основы блокчейна.',
    2020,
    300,
    'Книга подробно рассматривает технические концепции технологии блокчейн, такие как пиринговые и распределенные системы, структуры данных, транзакции, криптография и хэш-значения, целостность систем и достижение консенсуса в распределенной среде.',
    'Дрешер Даниэль',
    'Основы блокчейна.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    21,
    'Блокчейн. Архитектура, криптовалюты, инструменты разработки, смарт-контракты',
    2019,
    538,
    'В книге рассмотрены теоретические и практические аспекты технологии блокчейн. Вы познакомитесь с распределенными системами, криптографией и принципами безопасного хранения данных.',
    'Имран Башир',
    'Блокчейн. Архитектура, криптовалюты, инструменты разработки, смарт-контракты',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    22,
    'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА',
    2003,
    351,
    'Лекции и практикум по программированию на Си++',
    'Андрей Богуславский',
    'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    23,
    'Программирование на языке Go!',
    2010,
    290,
    'Лекции и практикум по программированию на Go!',
    'Марк Саммерфильд',
    'Программирование на языке Go!',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    24,
    'Head First. Программирование для Android на Kotlin.',
    2022,
    912,
    'Книга поможет узнаеть как структурировать приложение, создавать гибкие и интерактивные пользовательские интерфейсы, сохранять информацию в базе данных и использовать новейшие возможности Android Jetpack и Jetpack Compose.',
    'Дон Гриффитс',
    'Head First. Программирование для Android на Kotlin.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    25,
    'Толковый словарь сетевых терминов и аббревиатур',
    2007,
    410,
    'Толковый словарь сетевых терминов и аббревиатур',
    'М. Вильямс',
    'Толковый словарь сетевых терминов и аббревиатур',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    26,
    'Python for Data Analysis',
    2011,
    327,
    'Python for Data Analysis and so on',
    'Уэс Маккинни',
    'Python for Data Analysis',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    27,
    'Thinking in Java (4th Edition)',
    2000,
    378,
    'Лекции и практикум по программированию на Java',
    'Брюс Эккель',
    'Thinking in Java (4th Edition)',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    28,
    'Универсальный самоучитель Android для планшетов и смартфонов.',
    2018,
    800,
    'Эта книга станет вашим лучшим учителем для познания всех прелестей современных мобильных устройств на основе популярной системы Android.',
    ' Михайлов Владимир Викторович',
    'Универсальный самоучитель Android для планшетов и смартфонов.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    29,
    'Introduction to Algorithms',
    2017,
    900,
    'Книга, в которой подробно рассказывается об алгоритмах.',
    'Томас Кормен, Чарльз Лейзерсон, Рональд Ривест, Клиффорд Штайн',
    'Introduction to Algorithms',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    30,
    'Unity 5.x. Программирование искусственного интеллекта в играх.',
    2023,
    272,
    'Игровой движок Unity 5 включает в себя множество инструментов, помогающих разработчикам создавать потрясающие игры, снабженные мощным искусственным интеллектом.',
    'Хорхе Паласиос',
    'Unity 5.x. Программирование искусственного интеллекта в играх.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    31,
    'JavaScript Pocket Reference',
    2023,
    500,
    'Книга содержит краткое справочное руководство по языку JavaScript',
    'Дэвид Флэнаган',
    'JavaScript Pocket Reference',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    32,
    'Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles',
    2022,
    400,
    'Книга охватывает важнейшие принципы проектирования классов и интерфейсов, а также популярные паттерны проектирования и SOLID-принципы, помогая разработчикам создавать устойчивый и легко поддерживаемый код.',
    'Гэри Маклин Холл',
    'Adaptive Code',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    33,
    'SQL: The Complete Reference',
    2023,
    700,
    'Книга, в которой подробно рассказывается об архитектуре программного обеспечения.',
    'Джеймс Р. Грофф',
    'SQL The Complete Reference',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    34,
    'PHP and MySQL Web Development',
    2022,
    600,
    'Руководство по созданию веб-приложений с использованием PHP и MySQL.',
    'Люк Веллинг',
    'PHP and MySQL Web Development',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    35,
    'Статистический анализ и визуализация данных с помощью R',
    2013,
    338,
    'Учебное пособие по статистическому анализу данных с использованием языка R.',
    'Сергей Мастицкий',
    'Статистический анализ и визуализация данных с помощью R',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    36,
    'Computer Coding for Kid',
    2021,
    500,
    'Книга предназначена для детей от 7 до 12 лет и рассказывает про основы компьютерного программирования.',
    'Джон Вудкок',
    'Computer Coding for Kid',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    37,
    'Exploring Arduino: Tools and Techniques for Engineering Wizardry',
    2020,
    400,
    'Книга представляет собой популярное руководство по созданию различных проектов с использованием платформы Arduino.',
    'Джереми Блум',
    'Exploring Arduino Tools and Techniques for Engineering Wizardry',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    38,
    'Программирование микроконтроллеров для начинающих и не только.',
    2014,
    364,
    'Книга предназначена для широкого круга читателей, стремящихся освоить основы программирования современных микроконтроллеров, создавать полезные электронные устройства и роботы.',
    'Белов А.',
    'Программирование микроконтроллеров для начинающих и не только.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    39,
    'The Internet of Things',
    2019,
    700,
    'Книга рассказывает о том, что такое Интернет вещей, как он работает и как он влияет на нашу жизнь.',
    'Сэмюэл Грингард',
    'The Internet of Things',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    40,
    'Sketching User Experiences: The Workbook.',
    2018,
    800,
    'Книга не просто учит рисовать, а предлагает практические упражнения и техники, позволяющие эффективно визуализировать и обдумывать идеи, связанные с интерфейсами и взаимодействием с ними.',
    'Сет Гринберг',
    'Sketching User Experiences The Workbook.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    41,
    'InDesign CS6.',
    2017,
    900,
    'Руководство по использованию программы Adobe InDesign CS6, которая является профессиональным настольным издательским приложением',
    'Александр Сераков',
    'InDesign CS6.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    42,
    'Адаптивный дизайн. Делаем сайты для любых устройств.',
    2015,
    293,
    'Книга рассказывает о том, как создавать веб-сайты, которые будут выглядеть и работать хорошо на любых устройствах, от настольных компьютеров и ноутбуков до смартфонов и планшетов.',
    'Тим Кедлек',
    'Адаптивный дизайн. Делаем сайты для любых устройств.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    43,
    'Android для разработчиков.',
    2019,
    315,
    'Разработка для Android устройств.',
    'Пол Дэйтел, Харви Дейтел',
    'Android для разработчиков.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    44,
    'Clean Code: A Handbook of Agile Software Craftsmanship.',
    2016,
    1000,
    'Книга посвящена принципам и практикам написания высококачественного кода.',
    'Роберт Мартин',
    'Clean Code A Handbook of Agile Software Craftsmanship.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    45,
    'Swift Pocket Reference: Programming for iOS and OS X.',
    2023,
    800,
    'Книга-справочник по языку программирования Swift, ориентированный на разработчиков приложений для iOS и OS X. Она предназначена для тех, кто уже знаком с основами Swift и нуждается в быстром и удобном способе найти информацию по конкретным темам.',
    'Энтони Грей',
    'Swift Pocket Reference Programming for iOS and OS X.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    46,
    'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence.',
    2022,
    750,
    'Книга  посвящена теме NoSQL-баз данных и их применении в современном мире разработки программного обеспечения.',
    'Мартин Фаулер, Прамодкумар Дж. Садаладж',
    'NoSQL Distilled A Brief Guide to the Emerging World of Polyglot Persistence.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    47,
    'Head First Ruby.',
    2021,
    600,
    'Руководство по изучению языка программирования Ruby. Она написана в стиле \"Head First\" - это означает, что она использует визуальные элементы и интерактивные упражнения для обучения.',
    'Джей Макгаврен',
    'Head First Ruby.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    48,
    'Practical Vim.',
    2020,
    500,
    'Руководство по использованию текстового редактора Vim. Она написана опытным пользователем Vim и автором нескольких книг по Vim.',
    'Дрю Нейл',
    'Practical Vim.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    49,
    'Python. Разработка на основе тестирования.',
    2018,
    622,
    'Книга демонстрирует преимущества методологии разработки на основе тестирования (TDD) с использованием языка Python.',
    'Персиваль Г.',
    'Python. Разработка на основе тестирования.',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    71,
    '1',
    2024,
    2024,
    'апиыкпывп',
    'ывывыв, апапапап',
    '1706860796468_ddo5zrh',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `year`,
    `pages`,
    `description`,
    `authors`,
    `image`,
    `views`,
    `clicks`,
    `deleted`
  )
VALUES
  (
    72,
    '2',
    2024,
    2024,
    'ыаыпмывапыап',
    'йцйцй, цуцу',
    '1706860846909_xrmlu86',
    0,
    0,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: connections
# ------------------------------------------------------------

INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (1, 1);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (2, 2);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (2, 3);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (2, 4);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (3, 5);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (4, 6);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (5, 7);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (6, 8);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (6, 9);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (7, 10);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (8, 11);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (9, 12);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (10, 13);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (10, 14);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (10, 15);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (11, 16);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (12, 17);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (13, 18);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (14, 19);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (14, 20);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (15, 21);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (16, 22);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (17, 23);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (18, 24);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (19, 25);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (20, 26);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (21, 27);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (22, 28);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (23, 29);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (24, 30);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (25, 31);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (26, 32);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (27, 33);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (28, 34);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (29, 35);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (29, 36);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (29, 37);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (29, 38);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (30, 39);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (31, 40);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (32, 41);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (33, 42);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (34, 43);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (35, 44);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (36, 45);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (37, 46);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (38, 47);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (39, 48);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (40, 49);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (41, 50);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (42, 51);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (43, 52);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (43, 53);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (44, 54);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (45, 55);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (46, 56);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (46, 57);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (47, 58);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (48, 59);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (49, 60);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (71, 101);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (71, 102);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (72, 104);
INSERT INTO
  `connections` (`bookId`, `authorId`)
VALUES
  (72, 105);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
