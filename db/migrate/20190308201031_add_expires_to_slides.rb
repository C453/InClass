class AddExpiresToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :expires, :date
  end
end
