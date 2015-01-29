require 'spec_helper'

describe 'GET /'  do
  it 'gives okay status' do
    get '/'
    expect(last_response.status).to be(200)
  end
end

describe 'POST /users' do
  context 'when given valid perameters' do
    User.destroy_all
    post '/users', {first_name: "max", last_name: "mears", city: "Santa Cruz", state: "CA", email: "email", phone_number: "7757426305", password_hash: "738wii3990f"}
      expect(Gadget.all.size).to be(1)
  end
end