# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow local development origins
    origins_list = [
      'http://localhost:5173',
      'http://localhost:3001',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3001'
    ]
    # Add Railway frontend URL if configured
    if ENV['FRONTEND_URL'].present?
      origins_list << ENV['FRONTEND_URL']
    end
    # Allow all Railway subdomains in production
    if ENV['RAILWAY_ENVIRONMENT'].present?
      origins_list << /\Ahttps:\/\/.*\.up\.railway\.app\z/
    end
    
    origins(*origins_list)

    resource '*',
      headers: :any,
      methods: [:get, :post, :options, :head],
      credentials: true
  end
end
