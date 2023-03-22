class User < ApplicationRecord
    has_secure_password

    has_many :products, dependent: :destroy
    has_many :carts
    # has_many :cart_products, through: :carts
    has_many :cart_products, through: :carts, source: :product

    def products_total
        self.products.length
    end

    # def cart_total
    #     self.carts.length
    # end
end
