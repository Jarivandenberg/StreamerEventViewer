import React from "react"
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import FollowerCollection from './components/FollowerCollection'
import { Input } from 'antd'

const { Search } = Input

export default class StreamerPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Search
          placeholder="Search for your favorite streamer!"
          enterButton="Search"
          size="large"
          onSearch={value => this.props.setTwitchChannel(value)}
        />
        {this.props.channel && <ReactTwitchEmbedVideo channel={this.props.channel} width={"100%"} height={"700"} />}
        {this.props.followers.length > 0 && <FollowerCollection followers={this.props.followers} />}
      </React.Fragment>
    )
  }
}
