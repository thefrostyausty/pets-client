import apiUrl from "../apiConfig";
import axios from "axios";

// index function
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// show function
export const getOnePet = (petId) => {
    return axios (`${apiUrl}/pets/${petId}`)
}

// POST -> create function
export const createPet = (user, newPet) => {
    return axios({
        url:`${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {pet: newPet}
    })
}

// patch -> update function
export const updatePet = (user, updatedPet) => {
    console.log('user', user)
    console.log('updatedpet', updatedPet)
    return axios({
        url:`${apiUrl}/pets/${updatedPet.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {pet: updatedPet}
    })
}

// delete - remove function
export const removePet = (user, petId) => {
    return axios({
        url:`${apiUrl}/pets/${petId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
       
    })
}