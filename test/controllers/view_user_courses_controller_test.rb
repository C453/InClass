require 'test_helper'

class ViewUserCoursesControllerTest < ActionDispatch::IntegrationTest
  test "should get get_courses" do
    get view_user_courses_get_courses_url
    assert_response :success
  end

end
