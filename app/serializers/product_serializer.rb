class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description

  belongs_to :user
end
