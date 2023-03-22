class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :products_total, :cart_total, :cart_price_total

  has_many :products
  has_many :carts
  has_many :cart_products, through: :carts, source: :products
end
