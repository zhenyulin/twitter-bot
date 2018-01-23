# twitter-bot
twitter bot generates tweet imitating sources based on Markov Chain

## Development
* clone the repo to local
* `yarn` to install depedencies
* get relevant credentials to fill up a `.env` file based on `.env.template`
* `yarn dev` to start the dev server, hot reload available

## Deployment
* setup [apex/up](https://github.com/apex/up)
* run `up`

## TODO
* build model with case sensitive word as the key
* model builder UI to input twitter name
* create url for built model to generate tweet
* post to twitter integration

## Enhancement
* clean up quotes in modelling

## Comparison
* setup metrics
* A/B test with model built with RNNs

### Demo
[Demo](https://oqmzfh2y61.execute-api.eu-west-1.amazonaws.com/development/)

### Inspiration
[Inspiration](https://hackernoon.com/create-a-twitter-politician-bot-with-markov-chains-node-js-and-stdlib-14df8cc1c68a)
