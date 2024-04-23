class Stadium {
  constructor(
    id,
    name,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    phone,
    latitude,
    longitude,
    sections,
    seatMapUrl
  ) {
    this.id = id;
    this.name = name;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.state = state;
    this.country = country;
    this.phone = phone;
    this.latitude = latitude;
    this.longitude = longitude;
    this.sections = sections;
    this.seatMapUrl = seatMapUrl;
  }

  getStadiumDetails() {
    return {
      id: this.id,
      name: this.name,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      state: this.state,
      country: this.country,
      phone: this.phone,
      latitude: this.latitude,
      longitude: this.longitude,
      sections: this.sections,
      seatMapUrl: this.seatMapUrl,
    };
  }

  printStadiumDetails() {
    console.log("Stadium ID: " + this.id);
    console.log("Stadium Name: " + this.name);
    console.log("Address Line 1: " + this.addressLine1);
    console.log("Address Line 2: " + this.addressLine2);
    console.log("City: " + this.city);
    console.log("State: " + this.state);
    console.log("Country: " + this.country);
    console.log("Phone: " + this.phone);
    console.log("Latitude: " + this.latitude);
    console.log("Longitude: " + this.longitude);
    console.log("Sections: " + this.sections);
    console.log("Seat Map URL: " + this.seatMapUrl);
  }
}

module.exports = Stadium;
