# get '/auth/:facebook/callback' do
#   erb :login
# end

# get '/auth/:facebook' do
#   @user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
#   self.current_user = @user
#   puts(OmniAuth.config.logger)
#   redirect_to '/'
# end

get '/' do
  erb :index
end

get '/users/new' do
  erb :'user/signup'
end

post '/users' do
  user = User.create(params[:input])
  email = user.email
  redirect to "/users/#{email}"
end

get '/users/:email' do
  @user = User.find_by(email: params[:email])
  response = RestClient.get "http://api.openweathermap.org/data/2.5/weather?q=#{@user.city.gsub(' ', '_')},#{@user.state}&units=imperial"
  json_hash = JSON.parse(response)
  @weather_html = ''
  json_hash['main'].each do |w|
    title_tag = w[0]
    info_item = w[1]
    @weather_html << "<tr><td>#{title_tag.capitalize.gsub('_', ' ')}</td><td>#{info_item}</td></tr>"
  end
  erb :"user/profile_page"
end


post '/yoda' do
  sentense = params[:sentense].gsub(' ', '+')
  p sentense
  @yoda = Unirest.get("https://yoda.p.mashape.com/yoda?sentence=#{sentense}",
  headers:{
    "X-Mashape-Key" => "ewubvbYeAwmshbnQGBHMB8OcydLQp1ybYB9jsne960YNhIHF86",
    "Accept" => "text/plain"
  })
  p @yoda.body
end
