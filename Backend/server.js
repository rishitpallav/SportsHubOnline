const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { Client } = require("@elastic/elasticsearch");
const OpenAI = require("openai");
const client = require("./elasticsearch/client");
const QRCode = require("qrcode");

const SportEvent = require("./SportEvent");
const Stadium = require("./Stadium");
const Customer = require("./Customer");
const Credentials = require("./Credentials");
const CardInformation = require("./CardInformation");
const Ticket = require("./Ticket");

const app = express();
// This configuration disables the 'Access-Control-Allow-Origin' header, which is the wildcard.
const corsOptions = {
  origin: function (origin, callback) {
    // To only allow requests from your specific React app, you can uncomment the following line:
    // if (origin === 'http://localhost:3000') {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Origin not allowed by CORS'));
    // }
    //
    // However, the above configuration is specific to your development environment.
    // If you want to allow requests from any origin, you may use the following line:
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
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
const ticketMasterAPI = "DxQQS7OAGLc5WdofeZykpBPRt7LABUPy";
const openAIAPIKey = "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";

const allSportEventSeatMap = new Map();
allSportEventSeatMap.set(
  "Basketball",
  "https://maps.ticketmaster.com/maps/geometry/3/event/0400606DE3F42486/staticImage?type=png&systemId=HOST"
);
allSportEventSeatMap.set(
  "Soccer",
  "https://maps.ticketmaster.com/maps/geometry/3/event/1C00603FA86D3B72/staticImage?type=png&systemId=HOST"
);
allSportEventSeatMap.set(
  "Football",
  "https://maps.ticketmaster.com/maps/geometry/3/event/06005D79B38B3BDB/staticImage?type=png&systemId=HOST"
);
allSportEventSeatMap.set(
  "Baseball",
  "https://mapsapi.tmol.io/maps/geometry/3/event/1E005F54A7B21CBF/staticImage?systemId=HOST&sectionLevel=true&app=PRD2663_EDP_NA&sectionColor=727272&avertaFonts=true"
);
allSportEventSeatMap.set(
  "Hockey",
  "https://mapsapi.tmol.io/maps/geometry/3/event/01006073B35531F2/staticImage?systemId=HOST&sectionLevel=true&app=PRD2663_EDP_NA&sectionColor=727272&avertaFonts=true"
);

// declaring OpenAI funtions
// const elasticClient = new Client({
//   node: "http://localhost:9200",
//   auth: {
//     username: "elastic",
//     password: "elasticroot",
//   },
// });

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
app.get("/getDatacustomers", async (req, res) => {
  const body = await client.search({
    index: "customers",
    query: {
      match_all: {},
    },
    from: 0,
    size: 1000,
  });
  const data = body.hits.hits.map((hit) => hit._source);
  //console.log(data);
  res.json(data);
});

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

app.post("/getStadiumAdditionalInfo", async (request, response) => {
  const { stadium, type } = request.body;
  const stadiumInfo = await getStadiumAdditionalInfo(stadium, type);
  response.status(200).send(stadiumInfo);
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
  // console.log(sportEvents);
  response.status(200).send(sportEvents);
});

app.post("/getEventDetails", async (request, response) => {
  const { eventId } = request.body;
  // console.log(eventId);
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

app.post("/searchEvents", async (request, response) => {
  const { searchQuery } = request.body;
  const sportEvents = await searchEvents(searchQuery);
  response.status(200).send(sportEvents);
});

app.post("/registerCustomer", async (request, response) => {
  const {
    name,
    email,
    password,
    addressLine,
    city,
    state,
    country,
    postalCode,
    preferences,
  } = request.body;
  const credentials = new Credentials(email, password);
  const cardInformation = new CardInformation("", "", "");
  const tickets = [];
  const customer = new Customer(
    name,
    credentials,
    addressLine,
    city,
    state,
    country,
    postalCode,
    preferences,
    tickets,
    cardInformation
  );
  const body = await registerCustomer(customer);
  response.status(200).send(body);
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const body = await client.search({
    index: "customers",
    query: {
      match: {
        "credentials.email": email,
      },
    },
  });
  const data = body.hits.hits.map((hit) => hit._source);
  if (data.length == 0) {
    response.status(404).send("User not found");
  }
  const customer = data[0];
  if (customer.credentials.password === password) {
    response.status(200).send(customer);
  } else {
    response.status(401).send("Invalid password");
  }
});

app.post("/purchaseTicket", async (request, response) => {
  const { email, event, section, price, ticketId, numTickets } = request.body;
  const customerBody = await client.search({
    index: "customers",
    query: {
      match: {
        "credentials.email": email,
      },
    },
  });
  const customerData = customerBody.hits.hits.map((hit) => hit._source);
  // console.log(customerData);
  if (customerData.length == 0) {
    response.status(404).send("Customer not found");
  }
  const customer = customerData[0];
  customer.tickets.push({
    id: ticketId,
    eventId: event.id,
    eventName: event.name,
    eventDate: event.startDate,
    eventImage: event.image,
    section: section,
    price: price,
    numTickets: numTickets,
    status: "Purchased",
  });
  // console.log(customer.tickets);
  const body = await client.updateByQuery({
    index: "customers",
    query: {
      bool: {
        must: [
          { match: { "credentials.email": email } },
          { match: { "credentials.password": customer.credentials.password } },
        ],
      },
    },
    script: {
      source: "ctx._source.tickets = params.tickets",
      params: {
        tickets: customer.tickets,
      },
    },
  });

  sendPurchaseConfirmation(
    ticketId,
    customer,
    event,
    section,
    price,
    numTickets
  );
  console.log("payment info recieved");
  response.status(200).send(body);
});

app.post("/getPurchases", async (request, response) => {
  const { email } = request.body;
  const body = await client.search({
    index: "customers",
    query: {
      match: {
        "credentials.email": email,
      },
    },
  });
  const data = body.hits.hits.map((hit) => hit._source);
  if (data.length == 0) {
    response.status(404).send("User not found");
  }
  const customer = data[0];
  response.status(200).send(customer.tickets);
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
    let tickets = new Ticket(
      1,
      "Soccer Match",
      "Section 1",
      200,
      1,
      "Available"
    );
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
    tickets = new Ticket(
      2,
      "Basketball Game",
      "Section 2",
      300,
      5,
      "Available"
    );
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

  sportEvent.stadium = await getStadiumAdditionalInfo(
    sportEvent.stadium,
    sportEvent.type
  );

  return sportEvent;
};

getStadiumAdditionalInfo = async (stadium, type) => {
  let sections = [];
  let id = stadium.id;
  let name = stadium.name;
  let seatmap = stadium.seatMapUrl;

  const body = await client.search({
    index: "stadiums",
    query: {
      match: {
        id: stadium.id,
      },
    },
  });
  const data = body.hits.hits.map((hit) => hit._source);
  console.log(data[0]);
  console.log("Completed search");
  if (data.length == 0) {
    sectionsResponse = await getOpenAIStadiumSections(name);
    console.log(sectionsResponse);
    sections = JSON.parse(sectionsResponse);
    if (
      "https://content.resale.ticketmaster.com" ==
      stadium.seatMapUrl.substring(0, 39)
    ) {
      seatmap = allSportEventSeatMap.get(type);
    } else {
      seatmap = stadium.seatMapUrl;
    }
    // insert into elastic search
    await client.index({
      index: "stadiums",
      body: {
        id: id,
        name: name,
        seatMapUrl: seatmap,
        sections: sections,
      },
    });
  } else {
    sections = data[0].sections;
    seatmap = data[0].seatMapUrl;
  }

  console.log("Sections: ", sections, "Seatmap: ", seatmap, "Name: ", name);

  stadium.sections = sections;
  stadium.seatMapUrl = seatmap;
  return stadium;
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

getOpenAIStadiumSections = async (stadiumName) => {
  try {
    let message = [
      {
        role: "system",
        content:
          "You are a Stadium Seating Sections returning bot. I will be giving you a stadium name and you should return an array with the all the Sections present in the stadium. Do not just return levels, return with numbers.",
      },
      {
        role: "user",
        content: stadiumName,
      },
    ];
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: message,
      max_tokens: 10000,
      temperature: 0.5,
      top_p: 1,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};

searchEvents = async (searchQuery) => {
  const responses = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&apikey=${ticketMasterAPI}`
  );
  const ticketMasterResponse = await responses.json();
  let sportEvents = [];

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

registerCustomer = async (customer) => {
  try {
    const body = await client.index({
      index: "customers",
      body: customer,
    });
    return body;
  } catch (error) {
    console.log(error);
  }
};

async function getQRCode(data) {
  try {
    let qrCode = await QRCode.toDataURL(data);
    return qrCode;
  } catch (error) {
    console.log(error);
  }
}

sendPurchaseConfirmation = async (
  ticketId,
  customer,
  event,
  section,
  price,
  numTickets
) => {
  try {
    let qrCode = await getQRCode(
      `TicketId: ${ticketId}, Event: ${event.name}, Section: ${section}, Price: $${price}, Number of Tickets: ${numTickets}`
    );
    let eventImage = event.image;
    let message = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation Email</title>
  <style>
    body {
      font-family: 'Open Sans', sans-serif; /* Use Open Sans font */
      margin: 0;
      padding: 0;
      background-color: #f8f8f8; /* Lighter background color */
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #38a3a5; /* Use a more vibrant green */
      color: #fff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .content {
      padding: 20px;
    }
    .ticket-info {
      margin-bottom: 20px;
    }
    .ticket-info h2 {
      margin-top: 0;
      color: #38a3a5; /* Match header color */
      font-size: 24px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .ticket-details {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .ticket-details td, .ticket-details th {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    .ticket-details th {
      background-color: #38a3a5;
      color: #fff;
      text-transform: uppercase;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #a0a0a0;
    }
    .footer p {
      font-size: 14px;
    }
    .qr-code {
      text-align: center;
      margin-top: 20px;
    }
    .event-image {
      display: block;
      margin: 20px auto;
      max-width: 100%;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase!</h1>
    </div>
    <div class="content">
      <p>Hello ${customer.name}!,</p>
      <p>You have successfully purchased ${numTickets} tickets for the event <strong>${event.name}</strong>.</p>
      <div class="ticket-info">
        <h2>Ticket Details:</h2>
        <table class="ticket-details">
          <thead>
            <tr>
              <th>Section</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${section}</td>
              <td>$${price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Thank you for your purchase!</p>
      <img src="${eventImage}" alt="Event Image" class="event-image" width=200 height=200>
    </div>
    <div class="footer">
      <p>&copy; 2024 Sports Hub Online</p>
    </div>
  </div>
</body>
</html>
    `;

    let qrCodeImageBuffer = Buffer.from(qrCode.split(",")[1], "base64");
    let attachments = [
      {
        filename: "ticket_qr_code.png",
        content: qrCodeImageBuffer,
        contentType: "image/png",
      },
    ];

    await sendEmail(
      customer.credentials.email,
      "Ticket Purchase Confirmation",
      message,
      attachments
    );
  } catch (error) {
    console.log(error);
  }
};

sendEmail = async (email, subject, message, attachments) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rishitpallav6@gmail.com",
        pass: "obpabqxlladiihgk",
      },
    });

    let mailOptions = {
      from: "rishitpallav6@gmail.com",
      to: email,
      subject: subject,
      html: message,
      attachments: attachments,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Node runs on port 4000. You may want to change here if you want

app.listen("4000", () => {
  console.log("Node app started on port 4000");
});
