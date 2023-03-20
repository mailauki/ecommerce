class ProductsController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        products = Product.all
        render json: products
    end

    def show
        product = find_product
        render json: product
    end

    def create
        product = @current_user.products.create!(product_params)
        render json: product, status: :created
    end

    private

    def find_product
        Product.find(params[:id])
    end

    def product_params
        params.permit(:name, :description, :user_id)
    end
end
