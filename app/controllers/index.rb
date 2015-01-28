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
  @yoda = Unirest.get("https://yoda.p.mashape.com/yoda?sentence=#{sentense}",
  headers:{
    "X-Mashape-Key" => ENV['YODA_API_KEY'],
    "Accept" => "text/plain"
  })

  account_sid = ENV['ACCOUNT_SID']
  auth_token = ENV['AUTH_TOKEN']
  @client = Twilio::REST::Client.new(account_sid, auth_token)
  @client.account.messages.create({
    :from => '+14103178088',
    :to => '7757426305',
    :body => params[:sentense],
  })

  @yoda.body
end

post '/stocks' do
  data = YahooFinance.quotes(["#{params[:symbol]}"], [:last_trade_price, :days_range, :high_52_weeks, :low_52_weeks])
  output = []
  output << "Last Trade Price: #{data[0].last_trade_price}\n"
  output << "Days Range: #{data[0].days_range}\n"
  output << "High 52 Week #{data[0].high_52_weeks}\n"
  output << "Low 52 week #{data[0].low_52_weeks}\n"
  output
end

get '/games/super_starfish' do
  erb :"games/super_starfish", layout: false
end

get '/games/superSubmarine' do
  erb :"games/super_submarine", layout: false
end