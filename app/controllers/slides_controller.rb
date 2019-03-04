class SlidesController < ApplicationController
  before_action :set_slide, only: [:show, :update, :destroy]

  # GET /slides
  def index
    @slides = Slide.all

    render json: @slides
  end

  # GET /slides/1
  def show
    render json: @slide
  end

  # POST /slides
  def create
    course = Course.find(slide_params[:course])
    @slide = Slide.new(name: slide_params[:name], expires: slide_params[:expires], file: slide_params[:file], public: true, course: course)

    if @slide.save
      render json: @slide, status: :created, location: @slide
    else
      render json: @slide.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /slides/1
  def update
    if @slide.update(slide_params)
      render json: @slide
    else
      render json: @slide.errors, status: :unprocessable_entity
    end
  end

  # DELETE /slides/1
  def destroy
    @slide.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_slide
      @slide = Slide.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def slide_params
      params.fetch(:slide, {})
    end
end
