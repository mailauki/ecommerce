class User < ApplicationRecord
    has_secure_password

    has_many :products, dependent: :destroy
    has_many :carts, dependent: :destroy

    def products_total
        self.products.length
    end

    def cart_total
        self.carts.sum { |cart_product| cart_product.quantity }
    end

    def cart_price_total
        self.carts.sum { |cart_product| cart_product.product.price * cart_product.quantity }.round(2)
    end
end
