class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :products_total, :cart_total, :cart_price_total, :cart_products

  has_many :products, dependent: :destroy
  has_many :carts
  
  has_many :carts_products, through: :carts, source: :product
end
