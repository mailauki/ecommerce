class ProductsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        products = Product.all
        render json: products
    end

    def show
        product = find_product
        render json: product, include: ["user", "images", "categories", "product_categories", "product_categories.category"]
    end

    def create
        product = @current_user.products.create!(product_params)
        render json: product, status: :created
    end

    def update
        product = find_product
        product.update!(product_params)
        render json: product
    end

    private

    def find_product
        Product.find(params[:id])
    end

    def product_params
        params.permit(:name, :price, :description, :user_id)
    end
end
