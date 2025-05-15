import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Candidate } from "../entity/Candidate";
import { Lecturer } from "../entity/Lecturer";
// import bcrypt from "bcrypt";

export class UserController {
  /**
   * Creates a new User in the database
   * @param request - Express request object containing User details in body
   * @param response - Express response object
   * @returns JSON response containing the created User or error message
   */
  async save(request: Request, response: Response) {
    const { firstName, lastName, email, password,role } = request.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const userRepository = AppDataSource.getRepository(User);
      const candidateRepository = AppDataSource.getRepository(Candidate);
      const lecturerRepository = AppDataSource.getRepository(Lecturer);

      // const existingUser = await userRepository.findOne({ where: { email } });
      // console.log("Existing email",email )
      // console.log("Existing user",existingUser )
    // if (existingUser) {
    //   return response.status(409).json({ message: "Email already exists" });
    // }
      const user = userRepository.create({
        firstName,
        lastName,
        email,
        password,
        role
      });
      const savedUser = await userRepository.save(user);

      if (role === "Candidate") {
        const candidate = candidateRepository.create({
          firstName,
          lastName,
          email,
          password,
          role
        });
        await candidateRepository.save(candidate);
      } else if (role === "Lecturer") {
        const lecturer = lecturerRepository.create({
          firstName,
          lastName,
          email,
          password,
          role
        });
        await lecturerRepository.save(lecturer);
      } else {
        return response.status(400).json({ message: "Invalid role provided" });
      }
      return response.status(201).json(savedUser);
    } catch (error) {
      if (error === 'ER_DUP_ENTRY') {
        return response.status(409).json({ message: 'Email already exists' });
      }
      console.log("'Something went wrong'") 
      return response.status(500).json();
      

      
    }
  }

// login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // You can add token generation here if needed
      return res.status(200).json(user);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Login failed" });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    try {

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("error getting user:", error);
      return res.status(500).json({ message: "Internal werror" });
    }
  }
  
  async getAllUsers(req: Request, res: Response) {
    try {

      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No User not found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      console.error("error getting users:", error);
      return res.status(500).json({ message: "Internal werror" });
    }
  }


}
