const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        phone: String
        profilePicture: String
        jobStatus: String
        bloodGroup: String
        isAdmin: Boolean
        createdAt: String!
    }

    type Donation {
        _id: ID!
        donor: User!
        type: String!
        amount: Float!
        isRecurring: Boolean
        date: String!
    }

    type MarriageProfile {
        _id: ID!
        user: User
        age: Int
        height: String
        weight: String
        maritalStatus: String
        familyBackground: String
        isActive: Boolean
    }

    type Alert {
        _id: ID!
        title: String!
        description: String!
        category: String!
        date: String!
    }

    type SOSRequest {
        _id: ID!
        requester: User!
        type: String!
        description: String
        location: String
        status: String!
        date: String!
    }

    type StudentCorner {
        _id: ID!
        user: User!
        title: String!
        description: String
        resourceLink: String
        date: String!
    }

    type Notification {
        _id: ID!
        user: User!
        message: String!
        isRead: Boolean!
        createdAt: String!
    }

    type FamilyTree {
        _id: ID!
        user: User!
        familyMembers: [FamilyMember!]!
        createdAt: String!
    }

    type FamilyMember {
        name: String!
        relation: String!
        age: Int
        contact: String
    }

    type AdminActivity {
        _id: ID!
        admin: User!
        action: String!
        target: String
        timestamp: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        phone: String
    }

    input DonationInput {
        donorId: ID!
        type: String!
        amount: Float!
        isRecurring: Boolean
    }

    input MarriageProfileInput {
        user: ID!
        age: Int
        height: String
        weight: String
        maritalStatus: String
        familyBackground: String
    }

    input AlertInput {
        title: String!
        description: String!
        category: String!
    }

    input SOSRequestInput {
        requesterId: ID!
        type: String!
        description: String
        location: String
    }

    input StudentCornerInput {
        userId: ID!
        title: String!
        description: String
        resourceLink: String
    }

    input FamilyMemberInput {
        name: String!
        relation: String!
        age: Int
        contact: String
    }

    input FamilyTreeInput {
        userId: ID!
        familyMembers: [FamilyMemberInput!]!
    }

    type RootQuery {
        getUser(id: ID!): User
        getDonation(id: ID!): Donation
        getMarriageProfiles: [MarriageProfile!]!
        getAlerts: [Alert!]!
        getSOSRequests: [SOSRequest!]!
        getNotifications(userId: ID!): [Notification!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User!
        createDonation(donationInput: DonationInput): Donation!
        createMarriageProfile(input: MarriageProfileInput): MarriageProfile!
        createAlert(input: AlertInput): Alert!
        createSOSRequest(input: SOSRequestInput): SOSRequest!
        createStudentCorner(input: StudentCornerInput): StudentCorner!
        createFamilyTree(input: FamilyTreeInput): FamilyTree!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
