class User < ApplicationRecord
    has_secure_password

    has_many :products, dependent: :destroy
    has_one :cart

    # def products_total
    #     self.products.length
    # end

    # def cart_total
    #     self.cart.length
    # end
end
