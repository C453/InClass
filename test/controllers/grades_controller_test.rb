require 'test_helper'

class GradesControllerTest < ActionDispatch::IntegrationTest
  test "should get get_grade" do
    get grades_get_grade_url
    assert_response :success
  end

end
