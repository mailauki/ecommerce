class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :products_total, :cart_total, :cart_price_total

  has_many :products, dependent: :destroy
  has_many :carts
end
