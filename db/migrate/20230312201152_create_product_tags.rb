class CreateProductTags < ActiveRecord::Migration[7.0]
  def change
    create_table :product_tags do |t|
      t.references :products, index: true, foreign_key: true
      t.references :tags, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
