class Product < ApplicationRecord
    belongs_to :user

    has_many :product_categories
    has_many :categories, through: :product_categories
    has_many :images, dependent: :destroy
    has_many :carts, dependent: :destroy

    validates :name, presence: true, uniqueness: true
end
