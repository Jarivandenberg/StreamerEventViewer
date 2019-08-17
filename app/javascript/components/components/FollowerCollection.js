import React from "react"
import { Row, Card, Col } from 'antd'

export default class FollowerCollection extends React.Component {
  render() {
    const { followers } = this.props

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} type="flex" justify="start">
          { // Slice the followers array to only show the 10 latest followers.
            // Right now he skips the first Follower in the array.
            followers.slice(Math.max(followers.length - 10, 0)).map((follower, index) => (
              <Col key={index} span={2} flex="auto">
                <Card bordered={false}>
                  {follower.from_name}
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    )
  }
}
