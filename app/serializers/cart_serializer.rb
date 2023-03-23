class CartSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :product_id

  belongs_to :user
  belongs_to :product
end
