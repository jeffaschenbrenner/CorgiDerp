class FlagType < ActiveRecord::Base
  has_many :flags
  validates :name, presence: true
end
