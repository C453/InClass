require 'test_helper'

class YeahQuestionControllerTest < ActionDispatch::IntegrationTest
  test "should get yeah" do
    get yeah_question_yeah_url
    assert_response :success
  end

end
