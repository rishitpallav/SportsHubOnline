class Ticket {
  constructor(id, event, section, price, status) {
    this.id = id;
    this.event = event;
    this.section = section;
    this.price = price;
    this.status = status;
  }
}

module.exports = Ticket;
