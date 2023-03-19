class CreateProductCategories < ActiveRecord::Migration[7.0]
  def change
    # create_table :product_categories do |t|
    #   t.references :products, index: true, foreign_key: true
    #   t.references :categories, index: true, foreign_key: true

    #   t.timestamps null: false
    # end
    create_join_table :products, :categories
  end
end
