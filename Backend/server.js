const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { Client } = require("@elastic/elasticsearch");
const OpenAI = require("openai");

const SportEvent = require("./SportEvent");
const Stadium = require("./Stadium");
const Customer = require("./Customer");
const Credentials = require("./Credentials");
const CardInformation = require("./CardInformation");
const Ticket = require("./Ticket");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/*
 *
 *
 *
 *
 *
 *
 *
 * API Keys
 *
 *
 *
 *
 *
 */

const openWeatherMapAPI = "70e49117b80f210af90236e6189abc4a";
const ticketMasterAPI = "PjDo2OxtmjYpBdk3gi7TgXmNhWSXaxQm";
const openAIAPIKey = "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";

// declaring OpenAI funtions
const elasticClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "elasticroot",
  },
});

const openai = new OpenAI({
  apiKey: openAIAPIKey,
});

// Global variables

// REST APIs all here

/*
 *
 *
 * REST API for testing the server
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

app.get("/", async (request, response) => {
  response.status(200).send("OK");
});

app.get("/createCustomers", async (request, response) => {
  let customer = await testCreateCustomers();
  response.status(200).send(customer);
});

app.get("/test", async (request, response) => {
  let responses = await fetch("https://ipapi.co/json/");
  let ipJson = await responses.json();
  let weatherJson = await getWeatherJson(ipJson.latitude, ipJson.longitude);
  let sportEvents = await getSportEvents(ipJson.city, "soccer", 0, 2);
  response.status(200).send(sportEvents);
});

app.get("/passAnObject", async (request, response) => {
  let sportEvent = new SportEvent(
    1,
    "Soccer Match",
    "Soccer",
    "StadiumABC",
    "2022-01-01 12:00:00",
    "2022-01-01 14:00:00",
    20,
    200,
    100
  );
  let stadium = new Stadium(
    1,
    "StadiumABC",
    "123 Main St",
    "Apt 1",
    "New York",
    "NY",
    "USA",
    "123-456-7890",
    40.7128,
    -74.006,
    5,
    "https://www.example.com/seatmap"
  );
  sportEvent.stadium = stadium;
  response.status(200).send(sportEvent.getEventDetails());
});

/*
 *
 *
 *
 *
 *
 *
 *
 * REST APIs for the project
 *
 *
 *
 *
 *
 *
 */

app.post("/weather", async (request, response) => {
  const { ipJson } = request.body;
  const weatherJson = await getWeatherJson(ipJson.latitude, ipJson.longitude);
  response.status(200).send(weatherJson);
});

app.post("/sportEvents", async (request, response) => {
  const { city, sportType, startPage, endPage } = request.body;
  const sportEvents = await getSportEvents(city, sportType, startPage, endPage);
  response.status(200).send(sportEvents);
});

app.post("/stadiumDetails", async (request, response) => {
  const { stadiumId, seatmap } = request.body;
  const stadium = await getStadiumDetails(stadiumId, seatmap);
  response.status(200).send(stadium);
});

app.get("/featuredSports", async (request, response) => {
  // getSportEvents("", "sport", 0, 5).then((sportEvents) => {
  //   response.status(200).send(sportEvents);
  // });
  const sportEvents = await getSportEvents("", "sport", 0, 5);
  console.log(sportEvents);
  response.status(200).send(sportEvents);
});

app.post("/getEventDetails", async (request, response) => {
  const { eventId } = request.body;
  console.log(eventId);
  const sportEvent = await getEventDetails(eventId);
  // console.log(sportEvent);
  response.status(200).send(sportEvent);
});

app.post("/recommendEvents", async (request, response) => {
  const { ipJson } = request.body;
  const weatherData = await getWeatherJson(ipJson.latitude, ipJson.longitude);
  const sportEvents = await getSportEvents(ipJson.city, "sport", 0, 10);
  const recommendedEvents = await getOpenAIRecommendations(
    sportEvents,
    weatherData
  );
  response.status(200).send(recommendedEvents);
});

/*
 *
 *
 *
 *
 * Helper Functions all here
 *
 *
 *
 *
 */

testCreateCustomers = async () => {
  try {
    let customers = [];
    let credentials = new Credentials("rpallav@hawk.iit.edu", "rishit123");
    let cardInformation = new CardInformation(
      "1234567890123456",
      "12/23",
      "123"
    );
    let tickets = new Ticket(1, "Soccer Match", "Section 1", 20, "Available");
    let customer = new Customer(
      "Rishit Pallav",
      credentials,
      "123 Main St",
      "Chicago",
      "IL",
      "USA",
      "60616",
      ["Soccer"],
      [tickets],
      cardInformation
    );
    customers.push(customer);

    credentials = new Credentials("cnemani@hawk.iit.edu", "kiran123");
    cardInformation = new CardInformation("0123456789101112", "12/23", "123");
    tickets = new Ticket(2, "Basketball Game", "Section 2", 30, "Available");
    customer = new Customer(
      "Chaitanya Nemani",
      credentials,
      "456 Main St",
      "Chicago",
      "IL",
      "USA",
      "60616",
      ["Basketball"],
      [tickets],
      cardInformation
    );
    customers.push(customer);

    return customers;
  } catch (error) {
    console.log(error);
  }
};

getWeatherJson = async (latitude, longitude) => {
  const responses = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapAPI}`
  );
  const weatherJson = await responses.json();
  return weatherJson;
};

getSportEvents = async (city, sportType, startPage, endPage) => {
  const responses = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&classificationName=${sportType}&page=${startPage}&size=${endPage}&apikey=${ticketMasterAPI}`
  );
  const ticketMasterResponse = await responses.json();
  let sportEvents = [];

  // console.log("Ticketmaster Response: ", ticketMasterResponse);

  if (!ticketMasterResponse._embedded) {
    return sportEvents;
  }

  for (let event of ticketMasterResponse._embedded.events) {
    let classification = event.classifications
      ? event.classifications[0].genre.name
      : "";
    let venueId = event._embedded.venues ? event._embedded.venues[0].id : "";
    let startDate = event.dates.start ? event.dates.start.localDate : "";
    let startTime = event.dates.start ? event.dates.start.localTime : "";
    let minPriceRange = event.priceRanges ? event.priceRanges[0].min : 0;
    let maxPriceRange = event.priceRanges ? event.priceRanges[0].max : 0;
    let ticketLimit = event.ticketLimit ? event.ticketLimit : 100;
    let image = "";
    for (let eventImage of event.images) {
      if (eventImage.width == "2048") {
        image = eventImage.url;
        break;
      }
    }
    let sportEvent = new SportEvent(
      event.id,
      event.name,
      classification,
      venueId,
      startDate,
      startTime,
      minPriceRange,
      maxPriceRange,
      ticketLimit,
      image
    );

    let seatmap = event.seatmap ? event.seatmap.staticUrl : null;

    sportEvent.stadium = await getStadiumDetails(
      event._embedded.venues[0].id,
      seatmap
    );

    sportEvents.push(sportEvent);
  }

  return sportEvents;
};

getStadiumDetails = async (stadiumId, seatmap) => {
  const responses = await fetch(
    `https://app.ticketmaster.com/discovery/v2/venues/${stadiumId}.json?apikey=${ticketMasterAPI}`
  );
  const stadiumResponse = await responses.json();
  let addressLine1 = stadiumResponse.address
    ? stadiumResponse.address.line1
    : "";
  let addressLine2 = stadiumResponse.address
    ? stadiumResponse.address.line2
    : "";
  let city = stadiumResponse.city ? stadiumResponse.city.name : "";
  let state = stadiumResponse.state ? stadiumResponse.state.name : "";
  let country = stadiumResponse.country ? stadiumResponse.country.name : "";
  let phone = stadiumResponse.boxOfficeInfo
    ? stadiumResponse.boxOfficeInfo.phoneNumberDetail
    : "";
  let latitude = stadiumResponse.location
    ? stadiumResponse.location.latitude
    : 0;
  let longitude = stadiumResponse.location
    ? stadiumResponse.location.longitude
    : 0;

  const stadium = new Stadium(
    stadiumResponse.id,
    stadiumResponse.name,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    phone,
    latitude,
    longitude,
    [],
    seatmap
  );

  return stadium;
};

getEventDetails = async (eventId) => {
  const responses = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${ticketMasterAPI}`
  );
  const eventResponse = await responses.json();
  let classification = eventResponse.classifications
    ? eventResponse.classifications[0].genre.name
    : "";
  let venueId = eventResponse._embedded.venues
    ? eventResponse._embedded.venues[0].id
    : "";
  let startDate = eventResponse.dates.start
    ? eventResponse.dates.start.localDate
    : "";
  let startTime = eventResponse.dates.start
    ? eventResponse.dates.start.localTime
    : "";
  let minPriceRange = eventResponse.priceRanges
    ? eventResponse.priceRanges[0].min
    : 0;
  let maxPriceRange = eventResponse.priceRanges
    ? eventResponse.priceRanges[0].max
    : 0;
  let ticketLimit = eventResponse.ticketLimit ? eventResponse.ticketLimit : 100;
  let image = "";
  for (let eventImage of eventResponse.images) {
    if (eventImage.width == "2048") {
      image = eventImage.url;
      break;
    }
  }
  let sportEvent = new SportEvent(
    eventResponse.id,
    eventResponse.name,
    classification,
    venueId,
    startDate,
    startTime,
    minPriceRange,
    maxPriceRange,
    ticketLimit,
    image
  );

  let seatmap = eventResponse.seatmap ? eventResponse.seatmap.staticUrl : null;

  sportEvent.stadium = await getStadiumDetails(
    eventResponse._embedded.venues[0].id,
    seatmap
  );

  return sportEvent;
};

getOpenAIRecommendations = async (sportEvents, weatherData) => {
  try {
    gptResponse = [];
    let count = 0;
    for (let event of sportEvents) {
      message = [
        {
          role: "system",
          content:
            "You are a weather thoughtful event recommending bot recommending me sport events only saying Yes or No.",
        },
        {
          role: "user",
          content:
            "Would you recommend me this sport event: " +
            event.name +
            " at " +
            event.stadium.name +
            ", " +
            event.stadium.city +
            ", " +
            event.stadium.state +
            " of sport type: " +
            event.type +
            " ? based on the weather: " +
            weatherData.weather[0].main +
            " return the only one word: Yes or No.",
        },
      ];
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: message,
        max_tokens: 30,
        temperature: 0.5,
        top_p: 1,
      });
      if (completion.choices[0].message.content.substring(0, 3) == "Yes") {
        gptResponse.push(event);
        count++;
      }
      if (count == 4) {
        break;
      }
    }

    return gptResponse;
  } catch (error) {
    console.log(error);
  }
};

// Node runs on port 4000. You may want to change here if you want

app.listen("4000", () => {
  console.log("Node app started on port 4000");
});
