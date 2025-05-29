import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Candidate } from "../entity/Candidate";
import { Lecturer } from "../entity/Lecturer";
import bcrypt from "bcrypt";

export class UserController {
    private userRepository = AppDataSource.getRepository(User);
    
    /**
    * Retrieves all users from the database
    * @param req - Express request object
    * @param res - Express response object
    * @returns JSON array of all profiles
    */
    async all(request: Request, response: Response) {
        const users = await this.userRepository.find();
        return response.json(users);
    }

    /**
     * Retrieves a single user by their ID
     * @param request - Express request object containing the user ID in params
     * @param response - Express response object
     * @returns JSON response containing the user if found, or 404 error if not found
    */   
    async one(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.json(user);
    }

    /**
    * Creates a new user in the database
    * @param request - Express request object containing user details in body
    * @param response - Express response object
    * @returns JSON response containing the created user or error message
    */
    async save(request: Request, response: Response) {
        const { firstName, lastName, email, password, role } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const user = Object.assign(new User(), {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
        });
        const savedUser = await this.userRepository.save(user);
        console.log("Saved user : ",savedUser)
            if (role === "candidate") {
                const candidateRepository = AppDataSource.getRepository(Candidate);

                const candidate = candidateRepository.create({ user: savedUser });
                const savedCandidate=await candidateRepository.save(candidate);  
                console.log(savedCandidate)
                }
                else if (role === "lecturer") {
                const lecturerRepository = AppDataSource.getRepository(Lecturer);

                const lecturer = lecturerRepository.create({user:savedUser});
                const savedLecturer=await lecturerRepository.save(lecturer);
                console.log("saved lecturer is ",savedLecturer)
                }
            else {
                    return response.status(400).json({ message: "Invalid role provided" });
            }

        
        return response.status(201).json(savedUser);
        } catch (error) {
            console.error("Error saving user:", error);
            return response.status(500).json({ message: "Failed to create user" });
        }
   }

    // login
    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        const user = await this.userRepository.findOne({
            where: { email },
        });
   
        if (!user) {
            return response.status(404).json({ message: "Credentials are wrong" });
        }
        console.log("USER: ", user);
        const isPasswordValid = await bcrypt.compare(password, user.password);
         
        if (!isPasswordValid) {
            return response.status(401).json({ message: "Credentials are wrong" });
        }

        return response.json(user);
    }

    async logout(request: Request, response: Response) {
        console.log("Logout request received");
        response.status(200).json({ user: null, message: "User logged out" });
    };

//   async getUserByEmail(req: Request, res: Response) {
//     const { email } = req.params;
//     try {

//       const userRepository = AppDataSource.getRepository(User);
//       const user = await userRepository.findOne({ where: { email } });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       return res.status(200).json(user);
//     } catch (error) {
//       console.error("error getting user:", error);
//       return res.status(500).json({ message: "Internal werror" });
//     }
//   }
  
    // async getAllUsers(req: Request, res: Response) {
    //     try {
    //         const userRepository = AppDataSource.getRepository(User);
    //         const users = await userRepository.find();
    //         if (!users || users.length === 0) {
    //             return res.status(404).json({ message: "No User not found" });
    //         }
    //         return res.status(200).json(users);
    //     } catch (error) {
    //         console.error("error getting users:", error);
    //         return res.status(500).json({ message: "Internal werror" });
    //     }
    // }

    /**
     * Deletes a user from the database by their ID
     * @param request - Express request object containing the user ID in params
     * @param response - Express response object
     * @returns JSON response with success message or 404 error if user not found
     */
    async remove(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const userToRemove = await this.userRepository.findOne({
            where: { id },
        });

        if (!userToRemove) {
            return response.status(404).json({ message: "User not found" });
        }

        await this.userRepository.remove(userToRemove);
        return response.json({ message: "User removed successfully" });
    }

    /**
     * Updates an existing user's information
     * @param request - Express request object containing user ID in params and updated details in body
     * @param response - Express response object
     * @returns JSON response containing the updated user or error message
     */
    
    async update(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        // const { firstName, lastName, email, password, role } = request.body;
        const { avatarUrl } = request.body;
        let userToUpdate = await this.userRepository.findOne({
            where: { id },
        });

        if (!userToUpdate) {
            return response.status(404).json({ message: "User not found" });
        }

        userToUpdate = Object.assign(userToUpdate, {
            // firstName,
            // lastName,
            // email,
            // password,
            // role
            avatarUrl
        });

        try {
            const updatedUser = await this.userRepository.save(userToUpdate);
            return response.json(updatedUser);
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Error updating user", error });
        }
    }
}
