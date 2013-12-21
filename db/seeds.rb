# -*- encoding : utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# Add a observer user
User.create!(name: "Трудяга Работяга", username: "worker", :email => 'worker@aws.com', :password => 'master', :password_confirmation => 'master', observer: true)

Worker.create([
  { name: "Гой А.",      email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Репоух И.",   email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Шупиков Д.",  email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Лихоузов А.", email: "halyvin@gmail.com", phonenum: "+79131937775" }, 
  { name: "Шупиков А.",  email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Лоенюк А.",   email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Киселев М.",  email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Жихарев П.",  email: "halyvin@gmail.com", phonenum: "+79131937775" },
  { name: "Филиппов С.", email: "halyvin@gmail.com", phonenum: "+79131937775" }
])

clients = Client.create([
  { login: "gromboy", address: "Менжинского 10 195" },
  { login: "littlewoo", address: "Менжинского 10 196" },
  { login: "milk", address: "Менжинского 12 197" },
  { login: "booka", address: "Менжинского 15Б 198" },
  { login: "transvestit", address: "Менжинского 10 191" },
  { login: "legopath", address: "Менжинского 6 192" },
  { login: "aragorn", address: "Менжинского 18Г 193" },
  { login: "moisey", address: "Менжинского 6 194" },
  { login: "BrainFu", address: "Менжинского 18Г 115" },
  { login: "bokkarest", address: "Менжинского 10 125" },
  { login: "leomir", address: "Менжинского 14 135" },
  { login: "leonid", address: "Менжинского 12 145" },
  { login: "leon", address: "Менжинского 10 155" },
  { login: "barsuk", address: "Менжинского 10 165" },
  { login: "mish", address: "Менжинского 10 112" },
  { login: "mukla", address: "Менжинского 10 113" },
  { login: "micha", address: "Менжинского 10 113" },
  { login: "ranaways", address: "Менжинского 10 100" },
  { login: "buugii", address: "Менжинского 10 19" },
  { login: "murkaloid", address: "Историческия 12 195" },
  { login: "nikaloid", address: "Историческия 1 196" },
  { login: "tigra", address: "Историческия 120 197" },
  { login: "tigt1", address: "Историческия 11 198" },
  { login: "lovermaker", address: "Историческия 12 191" },
  { login: "rmanova", address: "Историческия 2 192" },
  { login: "romaniva2", address: "Историческия 2 193" },
  { login: "telek", address: "Историческия 2 194" },
  { login: "buffi", address: "Историческия 120 115" },
  { login: "ridix", address: "Историческия 45 125" },
  { login: "pedofkalaz", address: "Историческия 45 135" },
  { login: "transilvania", address: "Историческия 11 145" },
  { login: "mailll", address: "Историческия 12 155" },
  { login: "murkinoid", address: "Историческия 12 165" },
  { login: "mishas", address: "Историческия 12 112" },
  { login: "murzik", address: "Историческия 12 113" },
  { login: "sister", address: "Историческия 12 113" },
  { login: "twister", address: "Историческия 12 100" },
  { login: "miglston", address: "Историческия 12 19" },
  { login: "kgromboy", address: "Киренского 10 195" },
  { login: "klittlewoo", address: "Киренского 10 196" },
  { login: "kmilk", address: "Киренского 12 197" },
  { login: "bookakka", address: "Киренского 15Б 198" },
  { login: "trans", address: "Киренского 10 191" },
  { login: "legop", address: "Киренского 6 192" },
  { login: "arag", address: "Киренского 18Г 193" },
  { login: "moiseyka", address: "Киренского 6 194" },
  { login: "griff", address: "Киренского 18Г 115" },
  { login: "ridverg", address: "Киренского 10 125" },
  { login: "nasolo", address: "Киренского 14 135" },
  { login: "solomoon", address: "Киренского 12 145" },
  { login: "sailormoon", address: "Киренского 10 155" },
  { login: "barsukkk", address: "Киренского 10 165" },
  { login: "mishkaza", address: "Киренского 10 112" },
  { login: "muklaru", address: "Киренского 10 113" },
  { login: "michalen", address: "Киренского 10 113" },
  { login: "rana", address: "Киренского 10 100" },
  { login: "buurinur", address: "Киренского 10 19" },
  { login: "murkalo", address: "Копылова 12 195" },
  { login: "nikaloidkp", address: "Копылова 1 196" },
  { login: "tigra22", address: "Копылова 120 197" },
  { login: "tigt111", address: "Копылова 11 198" },
  { login: "lover", address: "Копылова 12 191" },
  { login: "rmanov", address: "Копылова 2 192" },
  { login: "romaniv2", address: "Копылова 2 193" },
  { login: "teleksan", address: "Копылова 2 194" },
  { login: "buffidog", address: "Копылова 120 115" },
  { login: "xxxridixxxx", address: "Копылова 45 125" },
  { login: "pedfk", address: "Копылова 45 135" },
  { login: "silvania", address: "Копылова 11 145" },
  { login: "tailll", address: "Копылова 12 155" },
  { login: "kinoid", address: "Копылова 12 165" },
  { login: "shas", address: "Копылова 12 112" },
  { login: "zik", address: "Копылова 12 113" },
  { login: "ster", address: "Копылова 12 113" },
  { login: "twisterrr11", address: "Копылова 12 100" },
  { login: "miglston32", address: "Копылова 12 19" }
])

mu = User.first

Request.create([
  { user: mu, client: clients[23], closed: true, day: Date.parse("2011-06-18"), time: "c 18 до 21", worker_ids: [3, 4], body: "подключение ограничено", close_reason: "удалили вирус с компьютера пользователя" },
  { user: mu, client: clients[39], closed: true, day: Date.parse("2011-06-18"), time: "c 18 до 21", worker_ids: [4, 5], body: "подключить роутер", close_reason: "Настроили и подключили роутер" },
  { user: mu, client: clients[41], closed: true, day: Date.parse("2012-06-18"), time: "c 10 до 14", worker_ids: [6, 7], body: "медленный интернет", close_reason: "Объяснили, как работает интернет. Интернет в порядке. Клиенту показалось" },
  { user: mu, client: clients[20], closed: true, day: Date.parse("2012-12-12"), time: "c 14 до 18", worker_ids: [2, 3], body: "кошка перегрызла шнур", close_reason: "восстановили кабель" },
  { user: mu, client: clients[0], closed: true, day: Date.parse("2013-02-18"), time: "c 14 до 18", worker_ids: [1, 2], body: "нет сетового соединения", close_reason: "произвели монтаж кабельного окончания" },
  { user: mu, client: clients[43], closed: true, day: Date.parse("2014-01-12"), time: "c 18 до 21", worker_ids: [8, 9], body: "Из кабеля течет вода", close_reason: "протянули новый кабель" }
])