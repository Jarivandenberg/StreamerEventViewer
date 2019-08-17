import React from "react"
import StreamerPage from "./StreamerPage"
import ActionCable from 'actioncable'
import TwitchApi from './services/TwitchApi'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider'
const { Header, Content, Footer } = Layout
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: null,
      followers: [],
      streamerId: null,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // Kind of a hacky way to update the DOM so that if there is a new streamer to clear out the action cable.
    if (this.state.streamerId !== prevState.streamerId) {
      this.acc = null
      this.forceUpdate()
    }
  }

  setTwitchChannel = channel => {
    // Set the channel to the filled in Streamer name of the user.
    // Reset the followers array.
    // Call the Twitch api to retrieve the ID of the streamer based upon channel name.
    this.setState({
      channel: channel,
      followers: []
    }, TwitchApi.getIdOfStreamer(this, channel))
  }

  handleNewFollower = response => {
    // Callback for handling new Follower objects.
    this.setState(state => {
      const followers = [...state.followers, response.data]

      return {
        followers,
      }
    })
  }


  render() {
    return (
      <Layout className="layout">
        <Header>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: '79vh' }}>
            <Router>
              <ActionCableProvider cable={cable}>
                <Route exact path="/" render={(props) => <StreamerPage {...props} userId={this.props.userId} setTwitchChannel={this.setTwitchChannel} channel={this.state.channel} followers={this.state.followers} />} />
                {
                  // This needs to be handled different. We don't want the ActionCableConsumer to change but whenever you update the State it will re-render
                  // this.acc || will make sure that the ActionCableConsumer will stay alive.
                  this.state.streamerId ? this.acc || (this.acc = <ActionCableConsumer channel={{ channel: 'StreamersChannel', streamerId: this.state.streamerId }} onReceived={this.handleNewFollower} />) : null
                }
              </ActionCableProvider>
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Streaming service ©2019 Created by Jari van den Berg</Footer>
      </Layout>
    )
  }
}
