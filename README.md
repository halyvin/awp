awp
===

TODO for launch:

- change config.mailer_sender in config/initializers/devise.rb

JSON API
--------

**GET /requests/{ID заявки}.json**

Получение данных о заявке. Пример возвращаемого значения:

    {
      "id":1,
      "user":"admin",
      "day":"2013-10-07",
      "time":"с 10 до 14",
      "body":"Переобжать линк и свести с ума всех прохожих",
      "address":"ул.Менжинского д.10 кв.195",
      "workers":[["Толик",1],["Ванька",2]]
    }

Если заяки с таким ID надено не будет - вернется 404 ошибка.

ID заявки можно взять из аттрибута `data-request-id` тэга `tr` строки таблицы с данными об этой заявке.

**POST /requests.json**

Создание нового запроса. Пример принимаемых данных:

    "request":{
      "day":"2013-10-07",
      "time":"с 10 до 14",
      "body":"Переобжать линк и свести с ума всех прохожих",
      "address":"ул.Менжинского д.10 кв.195",
      "worker_ids":[1,2]
    }

Пример возвращаемого значения в случае успеха:

    { id: 5 }

В случае ошибки вернется страница с кодом ошибки 422 и данными вроде:

    {
      "user":["не может быть пустым"],
      "day":["не может быть пустым"]
    }

**PUT /requests/{ID заявки}.json**

Обновление данных о заявке. Пример принимаемых данных:

    "request":{
      "id":1,
      "day":"2013-10-07",
      "time":"с 10 до 14",
      "body":"Переобжать линк и свести с ума всех прохожих",
      "address":"ул.Менжинского д.10 кв.195",
      "worker_ids":[1,2]
    }

Любой из параметров можно просто пропустить, если его не нужно обновлять. Для отправки запроса метода put достаточно просто передать jquery ajax в опции параметр `method: "put"`.

Возвращает ничего (точнее код 200) в случае успеха и ошибку с кодом 422, когда что-то пошло нет так, и данными вроде:

    {
      "user":["не может быть пустым"],
      "day":["не может быть пустым"]
    }

**DELETE /requests/{ID заявки}.json**

Удаление заявки. Восстановлению не подлежит. Для отправки запроса метода delete достаточно просто передать jquery ajax в опции параметр `method: "delete"`. Возвращает ничего (точнее код 200).

**Закрытие заявки пока еще не готово**

Комментарии
-----------

Не стесняйся говорить о каких-то моментах, которые нужно доделать.
Я многие вещи не делаю, ибо не знаю, стоит ли на них тратить время.
Например, валидация email.
