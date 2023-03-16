# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_16_005347) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "carts", force: :cascade do |t|
    t.bigint "users_id", null: false
    t.bigint "products_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["products_id"], name: "index_carts_on_products_id"
    t.index ["users_id"], name: "index_carts_on_users_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", force: :cascade do |t|
    t.string "url"
    t.bigint "products_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["products_id"], name: "index_images_on_products_id"
  end

  create_table "product_categories", force: :cascade do |t|
    t.bigint "products_id"
    t.bigint "categories_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["categories_id"], name: "index_product_categories_on_categories_id"
    t.index ["products_id"], name: "index_product_categories_on_products_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "users_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["users_id"], name: "index_products_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "carts", "products", column: "products_id"
  add_foreign_key "carts", "users", column: "users_id"
  add_foreign_key "images", "products", column: "products_id"
  add_foreign_key "product_categories", "categories", column: "categories_id"
  add_foreign_key "product_categories", "products", column: "products_id"
  add_foreign_key "products", "users", column: "users_id"
end
