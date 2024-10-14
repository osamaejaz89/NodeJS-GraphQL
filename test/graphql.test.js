const request = require("supertest"); // For HTTP requests
const app = require("../app"); // Your Express app that initializes Apollo Server

describe("GraphQL API Tests", () => {
  // Sample test for the 'createUser' mutation
  it("should create a new user", async () => {
    const mutation = `
      mutation {
        createUser(userInput: { name: "John Doe", email: "john@example.com", password: "123456" }) {
          _id
          name
          email
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query: mutation });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.createUser.name).toBe("John Doe");
    expect(response.body.data.createUser.email).toBe("john@example.com");
  });

  // Sample test for the 'login' query
  it("should login the user and return an auth token", async () => {
    const query = `
      query {
        login(email: "john@example.com", password: "123456") {
          token
          userId
        }
      }
    `;

    const response = await request(app).post("/graphql").send({ query });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.login).toHaveProperty("token");
  });

  // Test for fetching donations
  it("should fetch a list of donations", async () => {
    const query = `
      query {
        getDonations {
          _id
          type
          amount
          status
        }
      }
    `;

    const response = await request(app).post("/graphql").send({ query });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.getDonations).toBeInstanceOf(Array);
  });

  // Mutation test for creating a donation
  it("should create a new donation", async () => {
    const mutation = `
      mutation {
        createDonation(donationInput: { donor: "userId123", type: "Zakat", amount: 5000, message: "Monthly contribution" }) {
          _id
          type
          amount
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query: mutation });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.createDonation.type).toBe("Zakat");
    expect(response.body.data.createDonation.amount).toBe(5000);
  });

  // Test for creating an SOS request
  it("should create a new SOS request", async () => {
    const mutation = `
      mutation {
        createSOSRequest(input: { requesterId: "userId123", type: "Medical", description: "Urgent help needed", location: "Lahore" }) {
          _id
          type
          status
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query: mutation });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.createSOSRequest.type).toBe("Medical");
    expect(response.body.data.createSOSRequest.status).toBe("Pending");
  });
});
