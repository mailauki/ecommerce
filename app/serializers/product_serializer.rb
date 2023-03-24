class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description

  belongs_to :user

  has_many :images
  has_many :carts
end
