import User from "@app/core/models/user.model"
import { ToDTOMapper } from "../interfaces/mapper.interface"
import UserDTO from "@app/core/dtos/user.dto"



export class UserToDTOMapper implements ToDTOMapper<User, UserDTO>{

  toDTO(domain: User): UserDTO {
    const { firstName, lastName, nationality, 
            gender, prefix, phoneNumber: cel, 
            email, birthDate } = domain;
    return {
        firstName, lastName, nationality, gender, email,
        phoneNumber: { prefix, cel },
        birthDate: birthDate.toISOString().split('T')[0]
    }
  }

}