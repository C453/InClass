require 'test_helper'

class QuizQuestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @quiz_question = quiz_questions(:one)
  end

  test "should get index" do
    get quiz_questions_url, as: :json
    assert_response :success
  end

  test "should create quiz_question" do
    assert_difference('QuizQuestion.count') do
      post quiz_questions_url, params: { quiz_question: { answers: @quiz_question.answers, correct: @quiz_question.correct, text: @quiz_question.text } }, as: :json
    end

    assert_response 201
  end

  test "should show quiz_question" do
    get quiz_question_url(@quiz_question), as: :json
    assert_response :success
  end

  test "should update quiz_question" do
    patch quiz_question_url(@quiz_question), params: { quiz_question: { answers: @quiz_question.answers, correct: @quiz_question.correct, text: @quiz_question.text } }, as: :json
    assert_response 200
  end

  test "should destroy quiz_question" do
    assert_difference('QuizQuestion.count', -1) do
      delete quiz_question_url(@quiz_question), as: :json
    end

    assert_response 204
  end
end
