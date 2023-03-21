class UsersController < ApplicationController
    skip_before_action :authorize, only: [:show, :create]

    def me
        user = @current_user
        render json: user
    end

    def show
        user = find_user
        render json: user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
