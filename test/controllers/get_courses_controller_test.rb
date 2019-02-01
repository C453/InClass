require 'test_helper'

class GetCoursesControllerTest < ActionDispatch::IntegrationTest
  test "should get get_courses" do
    get get_courses_get_courses_url
    assert_response :success
  end

end
