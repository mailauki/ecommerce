class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name

  # has_many :product_categories
  # has_many :products, through: :product_categories
end
