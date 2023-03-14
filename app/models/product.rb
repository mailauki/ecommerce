class Product < ApplicationRecord
    belongs_to :user

    has_many :product_category
    has_many :categories, through: :product_categories
end
