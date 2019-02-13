require 'test_helper'

class QuizSubmissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @quiz_submission = quiz_submissions(:one)
  end

  test "should get index" do
    get quiz_submissions_url, as: :json
    assert_response :success
  end

  test "should create quiz_submission" do
    assert_difference('QuizSubmission.count') do
      post quiz_submissions_url, params: { quiz_submission: { score: @quiz_submission.score } }, as: :json
    end

    assert_response 201
  end

  test "should show quiz_submission" do
    get quiz_submission_url(@quiz_submission), as: :json
    assert_response :success
  end

  test "should update quiz_submission" do
    patch quiz_submission_url(@quiz_submission), params: { quiz_submission: { score: @quiz_submission.score } }, as: :json
    assert_response 200
  end

  test "should destroy quiz_submission" do
    assert_difference('QuizSubmission.count', -1) do
      delete quiz_submission_url(@quiz_submission), as: :json
    end

    assert_response 204
  end
end
