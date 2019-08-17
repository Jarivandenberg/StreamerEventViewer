# Twitch Streamer Event Listener

DEMO: [LIVE website]()

## Technologies used:

- [RoR website](https://rubyonrails.org/) : Backend Framework
- [React website](https://reactjs.org/) : Frontend framework
- [Ant Design](https://ant.design/docs/react) : Frontend styling
- [Yarn](https://yarnpkg.com/lang/en/) : Dependency manager
- 3rd Party API: [Twitch](https://dev.twitch.tv/docs/)
- [GitHub website](https://github.com/Jarivandenberg/StreamerEventViewer) Source code
- [LIVE website]() Deployment done with Heroku.

## Project description

Once you have logged in through the Twitch api you are able to search for you favorite streamer, after searching you will be able to see an Iframe containing the stream and chat.

Below the Iframe you will see live updates on the last followers of the streamer. If you follow the streamer yourself you will see your name on the screen! This is done through websockets.
After searching for your favorite streamer the application has opened a channel. Now everytime there is a new follower the API of Twitch will send a POST to the application. My application then handles that POST and will show the follower on screen.

## Hosting on AWS

![StreamerAppOnAWS](https://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_web_01.pdf)

For hosting on AWS we would need to set up some things. I will be explaining the components one by one.
- EC2 Group -> We will be using this to create a group for our application. This group is a web service that provides resizeable computing capacity.
- AWS Auto Scaling -> We will be using this to determinate if our app needs to scale up or down depending on demand.
- ELB -> The Elastic Load Balancer will handle all the incoming traffic.
- Cloudfront -> Cloudfront will be handling our assets. This way our assets only needs to be compiled once and not on every load of the page.
- Route53 -> Will be used for manaing DNS Records.
- RDS -> This will be used for our database that will save the users using our application.

## Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?
If we are using AWS EC2 Groups with AWS Auto Scaling there should be no issue with this architecture. The AWS Auto Scaling service is able to scale/ downscale an EC2 Group without any issues.
Maybe there is something that I have overseen but so far my knowledge goes it should not be an issue. The only downside to this is that we are heavily reliand on Twitch as a service. But Since Twitch is a big company I have full faith in there service.
