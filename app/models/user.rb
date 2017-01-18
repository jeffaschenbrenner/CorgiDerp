class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Virtual attribute for authenticating by either username or email
  # This is in addition to a real persisted field like 'username'
  attr_accessor :login
  validates :username, presence: true, length: {maximum: 22}, uniqueness: { case_sensitive: false }, format: { with: /\A[a-zA-Z0-9]*\z/, message: "may only contain letters and numbers." }

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :flags, dependent: :destroy

  acts_as_voter

   def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      where(conditions.to_hash).first
    end
  end
end
