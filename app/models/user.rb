class User < ApplicationRecord
    has_secure_password

    has_many :products, dependent: :destroy
    has_one :cart
end
