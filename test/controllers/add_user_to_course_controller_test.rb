require 'test_helper'

class AddUserToCourseControllerTest < ActionDispatch::IntegrationTest
  test "should get register_course" do
    get add_user_to_course_register_course_url
    assert_response :success
  end

end
