class Course < ApplicationRecord
    has_and_belongs_to_many :users

    after_save :broadcast_save
    after_destroy :broadcast_delete

    def is_admin? user_id
        admins.include? user_id.to_s
    end

    def broadcast_save
        ActionCable.server.broadcast 'courses', status: 'saved',
        id: id,
        name: name,
        html: render_task
    end

    def broadcast_delete
        ActionCable.server.broadcast 'courses', status: 'deleted', id: id
    end
    
    private
    def render_task
        ApplicationController.render(partial: 'courses/course', locals: { course: self })
    end
    
end
