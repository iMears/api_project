post '/users' do
  @user = User.new(params[:input])
  if @user.save
    session_set_current_user @user
    redirect session_redirect_target
  else
    erb :'/user/signup'
  end
end

get '/' do
  if session_current_user_id
    redirect "/users/#{current_user_email}"
  else
    erb :index
  end
end

post '/session' do
  if session_authenticate(params[:input][:email], params[:input][:password])
    redirect session_redirect_target
  else
    @session_error = 'Invalid Username or Password'
    erb :index
  end
end

get '/session/logout' do
  session_logout_and_redirect
end