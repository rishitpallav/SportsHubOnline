class Ticket {
  constructor(id, event, section, price, numTickets, status) {
    this.id = id;
    this.event = event;
    this.section = section;
    this.price = price;
    this.numTickets = numTickets;
    this.status = status;
  }
}

module.exports = Ticket;
