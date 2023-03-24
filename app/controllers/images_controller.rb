class ImagesController < ApplicationController
  skip_before_action :authorize, only: [:create, :destroy]

  def create
    image = Image.create!(image_params)
    render json: image, status: :created
  end

  def destroy
    image = find_image
    image.destroy
    head :no_content
  end

  private

  def find_image
    Image.find(params[:id])
  end

  def image_params
    params.permit(:url, :product_id)
  end
end
