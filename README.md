# twitter-bot
twitter bot generates tweet imitating sources based on Markov Chain

## Development
* clone the repo to local
* `yarn` to install depedencies
* get relevant credentials to fill up a `.env` file based on `.env.template`
* `yarn dev` to start the dev server, hot reload available
* fill out the twitter accounts you would like to imitate in `src/app`
* visit `localhost:3000/model` to generate the model
* import the generated model in `src/app`
* visit `localhost:3000` to check the generated tweet

## Deployment
* setup [apex/up](https://github.com/apex/up)
* run `up`

## Demo
[Demo](https://oqmzfh2y61.execute-api.eu-west-1.amazonaws.com/development/) using model built based on recent tweets [@realDonaldTrump](https://twitter.com/realDonaldTrump)

## TODO
* modelling
  * A/B test with model built with RNNs (tensorflow.js/brain.js)
  * build model with case sensitive markchov chain model
* app
  * UI to input twitter name to build new model
  * preview and save model in a url endpoint
  * post to twitter integration
