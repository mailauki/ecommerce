class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  # has_many :products
  # has_one :cart
end
