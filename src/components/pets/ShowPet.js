import React, { useState, useEffect } from "react";
import { getOnePet, updatePet, removePet } from '../../api/pets'
import { useParams } from "react-router-dom";
import { Spinner, Container, Card, Button } from "react-bootstrap";
import { showPetsFailure, showPetsSuccess } from "../shared/AutoDismissAlert/messages";
import EditPetModal from "./EditPetModal";
const ShowPet = (props) => {

    const [pet, setPet] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    console.log('params in ShowPet', id)
    // empty dependency array 
    useEffect(() =>{
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .then(()=> {
                msgAlert({
                    heading: 'pets found!',
                    message: showPetsSuccess,
                    variant: 'success',
                })
            })
            .catch(()=> {
                msgAlert({
                    heading: 'No Pets!',
                    message: showPetsFailure,
                    variant: 'danger',
                })
            })
            .catch(console.error)
    }, [id])

    if (!pet) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="info">
                    <span className="visually-hidden">
                        Loading....
                    </span>
                </Spinner>
            </Container>
        )
    }
    return (
        <>
         <Container className="fluid">
            <Card>
                <Card.Header>{pet.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Age: {pet.age}</small><br/>
                        <small>Type: {pet.type}</small><br/>
                        <small>
                            Adoptable: {pet.adoptable ? 'True' : 'No'}
                        </small>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">Edit Pet</Button>
                    <Button className="m-2" variant="danger">Delete Pet</Button>
                </Card.Footer>
            </Card>
        </Container>
        <EditPetModal 
            pet={pet}
            show={modalOpen}
            user={user}
            msgAlert={msgAlert}
            updatePet={updatePet}
            handleClose={(() => setModalOpen(false))}
        />
        </>
       
    )
}

export default ShowPet