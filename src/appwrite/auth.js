import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call another method to log in the user after successful creation
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      // Handle errors more specifically
      if (error.code === 400) {
        // Bad request - likely validation issue
        throw new Error('Invalid input data. Please check the email or password format.');
      } else if (error.code === 409) {
        // Conflict - user with the email already exists
        throw new Error('An account with this email already exists.');
      } else if (error.code === 500) {
        // Server error
        throw new Error('Internal server error. Please try again later.');
      } else {
        // Unknown error
        throw new Error(`An error occurred: ${error.message}`);
      }
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {}
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
  
}

const authService = new AuthService();
export default authService;
