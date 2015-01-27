post '/users' do
  user = User.create(params[:input])
  redirect "/users/#{user.email}"
end

get '/users' do
  erb :index
end