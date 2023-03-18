class CategoriesController < ApplicationController
    skip_before_action :authorize, only: [:index, :destroy]

    def index
        categories = Category.all
        render json: categories
    end

    def create
        category = Category.create!(category_params)
        render json: category, status: :created
    end

    def destroy
        category = find_category
        category.destroy
        head :no_content
    end

    private

    def find_category
        Category.find(params[:id])
    end

    def category_params
        params.permit(:name)
    end
end
