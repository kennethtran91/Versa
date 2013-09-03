Preact.configure do |config|
  config.code   = 'lhwr92xwlc'           # required
  config.secret = 's7dby5xrdm'  # required

  # Disable in Rails development environments
  # config.disabled = Rails.env.development?

  # Uncomment this this line to customize the data sent with your Person objects.
  # Your custom procedure should return a Hash of attributes
  # config.person_builder = lambda {|user| {:keys => :values}}

  # Defaults to Rails.logger or Logger.new(STDOUT). Set to Logger.new('/dev/null') to disable logging.
  # config.logger = Logger.new('/dev/null')  

  Warden::Manager.after_authentication do |user,auth,opts|
    Preact.log_event(user, "logged-in")
  end
  Warden::Manager.before_logout do |user,auth,opts|
    Preact.log_event(user, "logged-out")
  end
  
end