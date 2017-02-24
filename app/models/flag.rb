class Flag < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  belongs_to :flag_type

  scope :active, -> {where.not(status: 'resolved')}
  scope :resolved, -> {where(status: 'resolved')}
end
