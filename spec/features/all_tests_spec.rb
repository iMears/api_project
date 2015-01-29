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
    post
  end
end