class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :products_total

  has_many :products
  has_one :cart
end
