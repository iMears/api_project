get '/auth/:facebook/callback' do
  info = request.env['omniauth.auth']['info']
  email = info['email']
  @user = User.find_by_email(email)
  unless @user
    @user = User.create!(first_name: info['first_name'],
                         last_name: info['last_name'],
                         city: 'San Jose',
                         state: 'CA',
                         password_hash: 'X',
                         phone_number: '999-999-9999',
                         email: info['email'])
  end
  session_set_current_user @user
  redirect to "/users/#{@user.email}"
end

get '/' do
  erb :index
end

get '/users/new' do
  erb :'user/signup'
end

post '/users' do
  @user = User.new(params[:input])

  if @user.save
    redirect to "/users/#{@user.email}"
  else
    session[:errors] = @user.errors.full_messages
    erb :'user/signup'
  end
end

get '/users/:email' do
  @user = User.find_by(email: params[:email])
  response = RestClient.get "http://api.openweathermap.org/data/2.5/weather?q=#{@user.city.gsub(' ', '_')},#{@user.state}&units=imperial"
  parsed_data = JSON.parse(response)
  @weather_html = ''
  parsed_data['main'].each do |w|
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
    :body => @yoda.body,
  })
  @yoda.body
end

post '/stocks' do
  if params[:symbol] != ''
    data = YahooFinance.quotes(["#{params[:symbol]}"], [:last_trade_price,
                                                        :days_range,
                                                        :high_52_weeks,
                                                        :low_52_weeks])
    output = ''
    output << "<tr><td>Last Trade Price:</td><td>$#{data[0].last_trade_price}</td></tr>"
    output << "<tr><td>Days Range:</td><td>$#{data[0].days_range}</td></tr>"
    output << "<tr><td>High 52 Week:</td><td>$#{data[0].high_52_weeks}</td></tr>"
    output << "<tr><td>Low 52 week:</td><td>$#{data[0].low_52_weeks}</td></tr>"
    output
  end
end

post '/spellcheck' do
  spellcheck = params[:spellcheck].gsub(' ', '+')
  response = HTTParty.get "https://montanaflynn-spellcheck.p.mashape.com/check/?text=#{spellcheck}",
  headers:{
    "X-Mashape-Key" => "ewubvbYeAwmshbnQGBHMB8OcydLQp1ybYB9jsne960YNhIHF86",
    "Accept" => "application/json"
  }
  response.to_json
end

get '/games/super_starfish' do
  erb :"games/super_starfish", layout: false
end

get '/games/superSubmarine' do
  erb :"games/super_submarine", layout: false
end