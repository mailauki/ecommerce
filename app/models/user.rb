class User < ApplicationRecord
    has_secure_password

    has_many :products, dependent: :destroy
    has_many :carts, dependent: :destroy

    has_many :carts_products, through: :carts, source: :product

    def products_total
        self.products.length
    end

    def cart_total
        # self.cart_products.length
        self.carts.sum { |cart_product| self.carts_products.length * cart_product.quantity }
    end

    def cart_products
        self.carts.map { |cart_product| {:id => cart_product.id, :quantity => cart_product.quantity, :product => self.carts_products.find { |product| product.id === cart_product.product_id }} }
    end

    def cart_price_total
        self.carts.sum { |cart_product| self.carts_products.find { |product| product.id === cart_product.product_id }.price * cart_product.quantity }.round(2)
    end
end
