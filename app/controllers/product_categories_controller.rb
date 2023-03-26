class ProductCategoriesController < ApplicationController
  skip_before_action :authorize, only: [:create, :destroy]

  def create
    product_category = ProductCategory.create!(product_categories_params)
    render json: product_category, status: :created
  end

  def destroy
    product_category = find_product_category
    product_category.destroy
    head :no_content
  end

  private

  def find_product_category
    ProductCategory.find(params[:id])
  end

  def product_categories_params
    params.permit(:category_id, :product_id)
  end
end
