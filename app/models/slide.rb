class Slide < ApplicationRecord
    has_attached_file :file
    belongs_to :course
    do_not_validate_attachment_file_type :file

    def get_file
        slides = {}
        file[:name] = self.name
        file[:expires] = self.expires
        file[:url] = self.file.url
        file[:public] = self.public
        file[:course] = self.course.id
        return file
    end
end
