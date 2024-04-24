const { Client } = require('@elastic/elasticsearch');


const client = new Client({
  cloud: {
    id: "8a0956ebeb2f415f88ef93d51ce12536:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRmODAwMTcxZjg2ZWI0OTIyYjJlNTI3OThhYWVlODI0NiQ0YjcyZmRhM2MwMTA0NWVmYTcxYWM2ZDc5MjMzZTllNA==",
  },
  auth: {
    apiKey: "VEhsUUVZOEJ4QW9VRElWM0xTUi06ekZsZU01T0xRVk9vX3ZBVTRQZzQxdw=="
  },
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

module.exports = client; 