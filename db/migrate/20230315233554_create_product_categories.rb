class CreateProductCategories < ActiveRecord::Migration[7.0]
  def change
    create_join_table :products, :categories
  end
end
