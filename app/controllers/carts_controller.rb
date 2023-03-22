class CartsController < ApplicationController
  skip_before_action :authorize, only: [:index, :destroy]

    def index
        carts = Cart.all
        render json: carts
    end

    def create
        cart = @current_user.carts.create!(cart_params)
        render json: cart, status: :created
    end

    def destroy
        cart = find_cart
        cart.destroy
        head :no_content
    end

    private

    def find_cart
        Cart.find(params[:id])
    end

    def cart_params
        params.permit(:user_id, :product_id)
    end
end
