class ProductsController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        products = Product.all
        render json: products
    end

    def create
        product = @current_user.products.create!(product_params)
        render json: product, status: :created
    end

    private

    def product_params
        params.permit(:name)
    end
end
