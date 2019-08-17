class Api::EventsController < ApplicationController
  # ignore token authentication to allow for cross site calls
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    # verify subscription.
    render body: params["hub.challenge"]
  end

  def create
    # handle notification from Twitch.
    perform_alert(params)
    head :ok
  end

  private

  def perform_alert(params)
    # Since a streamer has a specific channel and I want them all to retrieve the broadcast I will send the broadcast to the streamers id provided by Twitch.
    # Twitch is sending us information within an data array. I extract that data and send it as an object to my streamers channel.
    ActionCable.server.broadcast(
      "streamers_channel_#{streamer_params[:data][0][:to_id]}",
      data: streamer_params[:data][0]
    )
  end

  def streamer_params
    # Permit all the paramaters coming in from Twitch.
    request.parameters
  end
end
