# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131005194345) do

  create_table "requests", :force => true do |t|
    t.integer  "user_id",                         :null => false
    t.boolean  "closed",       :default => false, :null => false
    t.string   "body"
    t.string   "address"
    t.date     "day"
    t.string   "time"
    t.string   "close_reason"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
  end

  add_index "requests", ["closed"], :name => "index_requests_on_closed"
  add_index "requests", ["day"], :name => "index_requests_on_day"
  add_index "requests", ["user_id"], :name => "index_requests_on_user_id"

  create_table "requests_workers", :force => true do |t|
    t.integer "request_id"
    t.integer "worker_id"
  end

  add_index "requests_workers", ["request_id"], :name => "index_requests_workers_on_request_id"
  add_index "requests_workers", ["worker_id"], :name => "index_requests_workers_on_worker_id"

  create_table "users", :force => true do |t|
    t.string   "username",            :default => "", :null => false
    t.string   "email",               :default => "", :null => false
    t.string   "encrypted_password",  :default => "", :null => false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.boolean  "set_sms"
    t.boolean  "set_email"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

  create_table "workers", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
