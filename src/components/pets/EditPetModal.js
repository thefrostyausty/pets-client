import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import PetForm from "../shared/PetForm";

const EditPetModal = (props) => {
    const { user, show, handleClose, updatePet } = props
    const [pet, setPet] = useState(props.pet)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            const name = e.target.name
            let value = e.target.value
            console.log('this is e.target.type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if (name === "adoptable" && e.target.checked) {
                value = true
            } else if (name === "adoptable" && !e.target.checked) {
                value = false
            }
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }
            const updatedValue = { [name]: value }


            console.log('prevPet', prevPet)
            console.log('updatedValue', updatedValue)

            return { ...prevPet, ...updatedValue }
        })
    }

    const handleSubmit = (e) => {
        e === event
        e.preventDefault()
        updatePet(user, pet)
        // if create is successful we shoudl navigate to the show page
            .then(res => {console.log(res.data.pet)})
            // then we send a success message
            .catch(error => console.log(error))
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/pets/${res.data.pet.id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Pet Added! Success!',
                    message: createPetSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createPetFailure,
                    variant: 'danger',
                }))
        console.log('thsi is the pet', pet)
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <PetForm
                    pet={pet}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading='Add a New Pet!'
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal