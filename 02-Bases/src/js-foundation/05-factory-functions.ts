interface BuildMakerPersonOptions {
    getUUID: () => string;
    calculateAge: (birthdate: string) => number;
}

interface PersonOptions {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({ getUUID, calculateAge }: BuildMakerPersonOptions) => {
    return ({ name, birthdate }: PersonOptions) => {
        return {
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: calculateAge(birthdate)
        }
    }
}
