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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_09_034538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendances", force: :cascade do |t|
    t.date "date"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
    t.boolean "open"
    t.decimal "latitude"
    t.decimal "longitude"
    t.index ["course_id"], name: "index_attendances_on_course_id"
  end

  create_table "attendances_users", id: false, force: :cascade do |t|
    t.bigint "attendance_id", null: false
    t.bigint "user_id", null: false
    t.index ["attendance_id", "user_id"], name: "index_attendances_users_on_attendance_id_and_user_id"
    t.index ["user_id", "attendance_id"], name: "index_attendances_users_on_user_id_and_attendance_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.date "expires"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "admins", default: [], array: true
  end

  create_table "courses_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "course_id", null: false
    t.index ["course_id", "user_id"], name: "index_courses_users_on_course_id_and_user_id"
    t.index ["user_id", "course_id"], name: "index_courses_users_on_user_id_and_course_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "name"
    t.date "expires"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "file_file_name"
    t.string "file_content_type"
    t.bigint "file_file_size"
    t.datetime "file_updated_at"
    t.bigint "course_id"
    t.boolean "public"
    t.index ["course_id"], name: "index_documents_on_course_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "user_id"
    t.text "question"
    t.integer "yeah_count"
    t.bigint "course_id"
    t.boolean "answered"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "yeahs", default: [], array: true
    t.index ["course_id"], name: "index_questions_on_course_id"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "quiz_questions", force: :cascade do |t|
    t.string "text"
    t.string "answers", default: [], array: true
    t.integer "correct"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "quiz_id"
    t.index ["quiz_id"], name: "index_quiz_questions_on_quiz_id"
  end

  create_table "quiz_submissions", force: :cascade do |t|
    t.integer "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "course_id"
    t.bigint "quiz_id"
    t.bigint "user_id"
    t.index ["course_id"], name: "index_quiz_submissions_on_course_id"
    t.index ["quiz_id"], name: "index_quiz_submissions_on_quiz_id"
    t.index ["user_id"], name: "index_quiz_submissions_on_user_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "course_id"
    t.index ["course_id"], name: "index_quizzes_on_course_id"
  end

  create_table "slides", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.date "expires"
    t.string "file_file_name"
    t.bigint "file_file_size"
    t.string "file_content_type"
    t.boolean "public"
    t.integer "course_id"
    t.string "file_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "attendances", "courses"
  add_foreign_key "documents", "courses"
  add_foreign_key "questions", "courses"
  add_foreign_key "questions", "users"
  add_foreign_key "quiz_questions", "quizzes"
  add_foreign_key "quiz_submissions", "courses"
  add_foreign_key "quiz_submissions", "quizzes"
  add_foreign_key "quiz_submissions", "users"
  add_foreign_key "quizzes", "courses"
end
