const request = require("postman-request");

const KEY = "b21962e623e279ac8567ca1417dd3caf";

const weather = (city, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${KEY}&query=${city}`;

  //   we need to specify 'response'  as a second argument (although we don't use it), to get access to 'body' argument.
  //   If we don't specify it, that is, if we have only two arguments in request callback function 'request({}, (error, response)', than the 'body' will be a parameter on response object. Then, later in a code we'll have to write, e.g.: response.body.error instead of body.error
  request({ url: url, json: true }, (error, response, body) => {
    // for general errors
    if (error) {
      // we may not specify the second parameter, since a function will in any case return 'error' here
      callback("Unable to connect to weather service", undefined);
      // if we have errors specified in response from weatherstack.com
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const weatherDescription = weather_descriptions[0];
      //since we call our callback function with an (error, ) as its first argument "callback(error, data)", we need to return 'undefined' as a value for 'error', if there is no error
      callback(
        undefined,
        `${weatherDescription}. It's currently ${
          temperature === 1 || temperature === -1
            ? temperature + " degree"
            : temperature + " degrees"
        } out and it feels like ${feelslike}.`
      );
    }
  });
};

module.exports = weather;
