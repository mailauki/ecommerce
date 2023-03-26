class ProductCategorySerializer < ActiveModel::Serializer
  attributes :id
  
  belongs_to :product
  belongs_to :category
end
