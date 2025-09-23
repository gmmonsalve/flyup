export interface Mapper<Domain, DTO>{
    toDomain(dto: DTO): Domain;
    toDTO(domain: Domain): DTO;
}

export interface ToDomainMapper<Domain, DTO> {
    toDomain(dto: DTO): Domain;
}

export interface ToDTOMapper<Domain, DTO>{
    toDTO(domain: Domain): DTO;
}