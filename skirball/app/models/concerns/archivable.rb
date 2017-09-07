require 'active_support/concern'

module Concerns::Archivable
  extend ActiveSupport::Concern

  included do
    attr_accessible :archived
    scope :archived, -> { where(archived: true) }
    scope :live, -> { where(archived: false) }
  end

  def archived?
    archived
  end
end
