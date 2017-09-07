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

ActiveRecord::Schema.define(:version => 20140826063617) do

  create_table "account_courses", :force => true do |t|
    t.integer  "course_id"
    t.integer  "purchase_id"
    t.integer  "account_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "quantity",             :default => 1
    t.text     "additional_attendees"
  end

  create_table "account_donations", :force => true do |t|
    t.integer  "donation_id"
    t.integer  "purchase_id"
    t.integer  "account_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "account_events", :force => true do |t|
    t.integer  "event_id"
    t.integer  "purchase_id"
    t.integer  "account_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "quantity",             :default => 1
    t.text     "additional_attendees"
  end

  create_table "accounts", :force => true do |t|
    t.string   "password_digest"
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "active_admin_comments", :force => true do |t|
    t.string   "resource_id",   :null => false
    t.string   "resource_type", :null => false
    t.integer  "author_id"
    t.string   "author_type"
    t.text     "body"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "namespace"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], :name => "index_active_admin_comments_on_author_type_and_author_id"
  add_index "active_admin_comments", ["namespace"], :name => "index_active_admin_comments_on_namespace"
  add_index "active_admin_comments", ["resource_type", "resource_id"], :name => "index_admin_notes_on_resource_type_and_resource_id"

  create_table "admin_users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "admin_users", ["email"], :name => "index_admin_users_on_email", :unique => true
  add_index "admin_users", ["reset_password_token"], :name => "index_admin_users_on_reset_password_token", :unique => true

  create_table "attendances", :force => true do |t|
    t.integer  "account_id"
    t.integer  "course_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "purchase_id"
  end

  create_table "carts", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "coupon_id"
  end

  create_table "catalogs", :force => true do |t|
    t.string   "link"
    t.text     "embed_code"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "title"
    t.string   "pdf_file_name"
    t.string   "pdf_content_type"
    t.integer  "pdf_file_size"
    t.datetime "pdf_updated_at"
  end

  create_table "coupons", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "rule"
    t.decimal  "amount"
    t.string   "title"
  end

  create_table "course_subjects", :force => true do |t|
    t.integer  "course_id"
    t.integer  "subject_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "course_teachers", :force => true do |t|
    t.integer  "course_id"
    t.integer  "teacher_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "courses", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "teacher_id"
    t.integer  "semester_id"
    t.string   "state"
    t.datetime "created_at",                                    :null => false
    t.datetime "updated_at",                                    :null => false
    t.string   "subtitle"
    t.string   "day_of_week"
    t.string   "start_time"
    t.integer  "location_id"
    t.string   "slug"
    t.string   "end_time"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.date     "start_date"
    t.date     "end_date"
    t.boolean  "archived",                   :default => false
    t.string   "custom_dates"
    t.boolean  "ignore_discount",            :default => false
    t.decimal  "temple_member_discount_fee", :default => 0.0
    t.decimal  "standard_course_fee",        :default => 0.0
  end

  create_table "donations", :force => true do |t|
    t.integer  "account_id"
    t.decimal  "amount"
    t.integer  "cart_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "event_items", :force => true do |t|
    t.integer  "event_id"
    t.integer  "cart_id"
    t.integer  "quantity",   :default => 1
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "events", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.string   "time"
    t.integer  "location_id"
    t.decimal  "price"
    t.string   "slug"
    t.date     "date"
    t.boolean  "archived",    :default => false
    t.text     "preview"
  end

  create_table "line_items", :force => true do |t|
    t.integer  "cart_id"
    t.integer  "course_id"
    t.integer  "quantity",   :default => 1
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.integer  "fee_type"
  end

  create_table "locations", :force => true do |t|
    t.string   "title"
    t.string   "address"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "news_items", :force => true do |t|
    t.string   "title"
    t.string   "url"
    t.text     "description"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.string   "slug"
    t.boolean  "archived",    :default => false
    t.text     "preview"
  end

  create_table "pages", :force => true do |t|
    t.string   "title"
    t.string   "slug"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "podcasts", :force => true do |t|
    t.string   "title"
    t.text     "notes"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.string   "slug"
    t.string   "duration"
    t.datetime "published_on"
    t.string   "keywords"
    t.string   "subtitle"
    t.string   "guid"
    t.string   "itunes_url"
  end

  create_table "purchases", :force => true do |t|
    t.integer  "account_id"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "reference"
    t.text     "receipt"
    t.decimal  "total"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "address"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "phone"
    t.string   "email"
    t.string   "contact_preference"
    t.text     "additional_attendees"
  end

  create_table "receipts", :force => true do |t|
    t.string   "title"
    t.integer  "amount"
    t.text     "description"
    t.integer  "purchase_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "semesters", :force => true do |t|
    t.string   "name"
    t.date     "starts_at"
    t.date     "ends_at"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.date     "early_bird_ends_at"
    t.string   "slug"
    t.boolean  "archived",           :default => false
  end

  create_table "slides", :force => true do |t|
    t.string   "title"
    t.string   "link"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.integer  "sort_order"
  end

  create_table "students", :force => true do |t|
    t.string   "name"
    t.string   "quote"
    t.string   "attribution"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "subjects", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "suggested_donations", :force => true do |t|
    t.string   "title"
    t.decimal  "amount"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "teachers", :force => true do |t|
    t.string   "name"
    t.text     "biography"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.text     "testimonial"
    t.string   "testimonial_source"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "slug"
    t.boolean  "archived",           :default => false
  end

  create_table "testimonials", :force => true do |t|
    t.integer  "teacher_id"
    t.integer  "account_id"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "videos", :force => true do |t|
    t.text     "embed_code"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "title"
    t.string   "slug"
  end

end
