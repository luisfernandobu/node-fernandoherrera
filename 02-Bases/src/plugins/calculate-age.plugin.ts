export const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const today = new Date();   
    const monthDifference = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
