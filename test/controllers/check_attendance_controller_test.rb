require 'test_helper'

class CheckAttendanceControllerTest < ActionDispatch::IntegrationTest
  test "should get check_attendance" do
    get check_attendance_check_attendance_url
    assert_response :success
  end

end
