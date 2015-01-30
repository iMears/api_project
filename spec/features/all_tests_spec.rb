require 'spec_helper'

describe 'GET /'  do
  it 'gives okay status' do
    get '/'
    expect(last_response.status).to be(200)
  end
end

describe 'POST /users' do
  let!(:test_user){{input: {first_name: "max", last_name: "mears", city: "Santa Cruz", state: "CA", email: "email@email.com", phone_number: "7757426305", password: "kldsfasdfa"}}}
  let!(:false_test_user){{input: {first_name: "max"}}}

  before :each do
    User.destroy_all
  end

  context 'when given valid perameters' do
    it "creates a new user" do
      post '/users', test_user
      expect(User.count).to eq(1)
    end

    it 'redirects the user to the /user/:email route' do
      post '/users', test_user
      expect(last_response).to be_redirect
    end
  end

  context 'when given invalid perameters' do
    it 'does not create a new user' do
      post '/users', false_test_user
      expect(User.count).to eq(0)
    end
  end

  context 'when the requres does not include a unique name value' do
    it 'does not create a new user' do
      post 'users', test_user
      post 'users', test_user
      expect(User.count).to eq(1)
    end
  end


end
