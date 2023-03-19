class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    # add_foreign_key :products, :users, column: :user_id
  end
end
