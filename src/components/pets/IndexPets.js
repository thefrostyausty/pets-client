import React, { useState, useEffect } from 'react'
import { getAllPets } from '../../api/pets'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indexPetsFailure, indexPetsSuccess } from '../shared/AutoDismissAlert/messages'
// going to declare a style object
// this will be able to collect the cards
// we can use basic CSS but use js syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexPets = (props) => {
    const [pets, setPets] = useState(null)
    const {user, msgAlert} = props

    useEffect(() => {
        getAllPets()
            .then(res => {
                setPets(res.data.pets)
            })
            .then(()=> {
                msgAlert({
                    heading: 'pets found!',
                    message: indexPetsSuccess,
                    variant: 'success',
                })
            })
            .catch(()=> {
                msgAlert({
                    heading: 'No Pets!',
                    message: indexPetsFailure,
                    variant: 'danger',
                })
            })
    }, [])


    // const petCards = pets.map(pet => (
    //     // one method of styling usually reserved for a single 
    //     // we can use inline just like in html
    //     <Card key={pet.id} style={{ width: '30%' }}>
    //         <Card.Header>{pet.fullTitle}</Card.Header>
    //         <Card.Body>
    //             <Card.Text>{pet.name}</Card.Text>
    //         </Card.Body>
    //     </Card>
    // ))


    if (!pets) {
        return <p>loading...</p>
    } else if (pets.length === 0) {
        return <p>no pets yet, go add some</p>
    }

    let petCards

    if (pets.length > 0) {
        // petsJsx = pets.map(pet => (
        //     <li key={pet.id}>
        //         {pet.fullTitle}
        //     </li>
        // ))
        petCards = pets.map(pet => (
            // one method of styling usually reserved for a single 
            // we can use inline just like in html
            <Card key={pet.id} style={{ width: '30%' }}>
                <Card.Header>{pet.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/pets/${pet.id}`}>
                            View: {pet.name}
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the pets</h3>
            <div style={cardContainerLayout}>
                {petCards}
            </div>
        </>
    )
}

export default IndexPets