require 'test_helper'

class SlidesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @slide = slides(:one)
  end

  test "should get index" do
    get slides_url, as: :json
    assert_response :success
  end

  test "should create slide" do
    assert_difference('Slide.count') do
      post slides_url, params: { slide: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show slide" do
    get slide_url(@slide), as: :json
    assert_response :success
  end

  test "should update slide" do
    patch slide_url(@slide), params: { slide: {  } }, as: :json
    assert_response 200
  end

  test "should destroy slide" do
    assert_difference('Slide.count', -1) do
      delete slide_url(@slide), as: :json
    end

    assert_response 204
  end
end
