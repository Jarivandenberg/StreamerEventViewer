class TwitchApi {
  getIdOfStreamer(component, channel) {
    fetch(`https://api.twitch.tv/helix/users?login=${channel}`, { headers: { 'Client-ID': 'xdemuvcrk5sa2akqef3daut8i3te4n' } })
      .then(response => response.json())
      .then(response => {
        component.setState({
          streamerId: response.data[0].id
        })
      })
      .catch(error => {
      })
  }
}

export default new TwitchApi()
