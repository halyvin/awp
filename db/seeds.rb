# -*- encoding : utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Worker.create([
  { name: "Гой А.", email: "halyvin@gmail.com" },
  { name: "Репоух И.", email: "halyvin@gmail.com" },
  { name: "Шупиков Д.", email: "halyvin@gmail.com" },
  { name: "Лихоузов А.", email: "halyvin@gmail.com" }, 
  { name: "Шупиков Д.", email: "halyvin@gmail.com" },
  { name: "Лоенюк А.", email: "halyvin@gmail.com" },
  { name: "Киселев М.", email: "halyvin@gmail.com" },
  { name: "Жихарев П.", email: "halyvin@gmail.com" },
  { name: "Филиппов С.", email: "halyvin@gmail.com" }
])

# mu = User.first

# Request.create([
#   { user: mu, body: "Переобжать линк и свести с ума всех прохожих", address: "ул.Менжинского д.10 кв.195", day: Date.today + 1, time: "с 10 до 14", worker_ids: [1, 2] },
#   { user: mu, body: "Переобжать линк и дать по заставить работать напарника вилами", address: "ул.Менжинского д.10 кв.195", day: Date.today, time: "с 10 до 14", worker_ids: [3, 4] },
#   { user: mu, body: "Переобжать линк и прогулятся по лучшим местам вечернего красноярска", address: "ул.Менжинского д.10 кв.195", day: Date.today, time: "с 10 до 14", worker_ids: [5, 6] },
#   { user: mu, body: "Переобжать линк", address: "ул.Менжинского д.10 кв.195", day: Date.today - 1, time: "с 10 до 14", worker_ids: [7, 8] }
# ])