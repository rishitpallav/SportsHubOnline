class SportEvent {
  constructor(
    id,
    name,
    type,
    stadium,
    startDate,
    startTime,
    minPriceRange,
    maxPriceRange,
    ticketLimit,
    image
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    (this.stadium = stadium), (this.startDate = startDate);
    this.startTime = startTime;
    this.minPriceRange = minPriceRange;
    this.maxPriceRange = maxPriceRange;
    this.ticketLimit = ticketLimit;
    this.image = image;
  }

  getEventDetails() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      stadium: this.stadium,
      startDate: this.startDate,
      startTime: this.startTime,
      minPriceRange: this.minPriceRange,
      maxPriceRange: this.maxPriceRange,
      ticketLimit: this.ticketLimit,
      image: this.image,
    };
  }

  printEventDetails() {
    console.log("Event ID: " + this.id);
    console.log("Event Name: " + this.name);
    console.log("Event Type: " + this.type);
    console.log("Stadium: " + this.stadium);
    console.log("Start Date: " + this.startDate);
    console.log("Start Time: " + this.startTime);
    console.log("Min Price Range: " + this.minPriceRange);
    console.log("Max Price Range: " + this.maxPriceRange);
    console.log("Ticket Limit: " + this.ticketLimit);
    console.log("Image: " + this.image);
  }
}

module.exports = SportEvent;
