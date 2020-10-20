module UsersHelper
    def job_title_icon
        if @user.profile.job_title == "Cat"
            "<i class = 'fa fa-cat'></i>".html_safe
        elsif @user.profile.job_title == "Dog"
            "<i class = 'fa fa-dog'></i>".html_safe
                
        end
        
    end
end
