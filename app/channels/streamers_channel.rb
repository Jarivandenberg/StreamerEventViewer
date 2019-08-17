class StreamersChannel < ApplicationCable::Channel
  def subscribed
    # Subscribe for 10 days to a Streamers events.
    # Use Ngrok on local for testing. Change Callback to Heroku when publishing live
    # Using Faraday to subscribe to Twitch her webhook
    url = 'https://api.twitch.tv/helix/webhooks/hub'
    body = {
      'hub.mode': 'subscribe',
      'hub.callback': "http://46621703.ngrok.io/api/events",
      'hub.topic': "https://api.twitch.tv/helix/users/follows?first=1&to_id=#{params[:streamerId]}",
      'hub.lease_seconds': 120,
    }.to_json
    resp = Faraday.post(url, body, 'Content-Type' => 'application/json', 'Client-ID' => 'xdemuvcrk5sa2akqef3daut8i3te4n')
    stream_from streamer_channel
  end

  def unsubscribed
  end

  private

  def streamer_channel
    "streamers_channel_#{params[:streamerId]}"
  end
end
