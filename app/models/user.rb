class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, :omniauth_providers => [:twitch]

  # Create a user with a fake password so we can save all the data coming from Twitch that we need.
  def self.from_omniauth(auth)
    where(uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.username = auth.info.nickname
      user.refresh_token = auth.credentials.refresh_token
      user.token = auth.credentials.token
    end
  end
end
