class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description

  belongs_to :user

  has_many :product_categories
  has_many :categories, through: :product_categories
  has_many :images
  has_many :carts
end
