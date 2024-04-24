class Customer {
  constructor(
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
  ) {
    this.name = name;
    this.credentials = credentials;
    this.addressLine = addressLine;
    this.city = city;
    this.state = state;
    this.country = country;
    this.postalCode = postalCode;
    this.preferences = preferences;
    this.tickets = tickets;
    this.cardInformation = cardInformation;
  }

  addTicket(ticket) {
    this.tickets.push(ticket);
  }

  removeTicket(ticket) {
    this.tickets = this.tickets.filter((t) => t.id !== ticket.id);
  }

  addCardInformation(cardInformation) {
    this.cardInformation = cardInformation;
  }

  clearCardInformation() {
    this.cardInformation = null;
  }
}

module.exports = Customer;
