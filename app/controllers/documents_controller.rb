class DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /documents
  def index
    params.require(:course)
    course = Course.find(params[:course])
    admin = course.admins.include? current_user.id.to_s

    @documents = []

    if admin
      Document.where(course_id: params[:course]).each do |doc|
        @documents << doc.get_file
      end
    else
      Document.where(course_id: params[:course], public: true).each do |doc|
        @documents << doc.get_file
      end
    end
    
    render json: @documents
  end

  # GET /documents/1
  def show
    render json: @document
  end

  # POST /documents
  def create
    course = Course.find(document_params[:course])
    @document = Document.new(name: document_params[:name], expires: document_params[:expires], file: document_params[:file], public: true, course: course)

    if @document.save
      ActionCable.server.broadcast "course:#{@document.course_id}_channel", status: 'document',
      file: @document.get_file
      render json: @document, status: :created, location: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /documents/1
  def update
    if @document.update(document_params)
      render json: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  # DELETE /documents/1
  def destroy
    @document.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def document_params
      params.permit(:name, :expires, :file, :public, :course)
    end
end
