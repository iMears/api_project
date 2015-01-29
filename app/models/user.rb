class User < ActiveRecord::Base
  include BCrypt
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :password_hash, presence: true
  validates :phone_number, presence: true
  validates :email, uniqueness: true, presence: true

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end
end