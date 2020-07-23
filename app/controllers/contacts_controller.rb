class ContactsController < ApplicationController
    
    #GET request to /contact-us
    #Show new contact form 
def new
    @contact = Contact.new
end

    #POST request /contacts
def create
    #Assign form fields to Contact object
    @contact = Contact.new(contact_params)
    #Save Contact to db
    if @contact.save
        name = params[:contact][:name]
        email = params[:contact][:email]
        body = params[:contact][:comments]
        #Plug variables to email and send
        ContactMailer.contact_email(name,email,body).deliver
        #Give success method and go to new action
        flash[:success] = "Message sent"
       redirect_to new_contact_path
    else
        #Error handling
        flash[:danger] = @contact.errors.full_messages.join(", ")
       redirect_to new_contact_path
    end
end

private
    # Strong params required to collect data from from.
    # Rails security requirement
  def contact_params
     params.require(:contact).permit(:name, :email, :comments)
  end  
end