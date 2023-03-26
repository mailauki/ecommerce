class UsersController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create]

    def index
        users = User.all
        render json: users
    end

    def me
        user = @current_user
        render json: user, include: ["products", "products.images", "carts", "carts.product", "carts.product.images"]
    end

    def show
        user = find_user
        render json: user, include: ["products", "products.images"]
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = find_user
        user.update!(user_params)
        render json: user
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :avatar)
    end
end
