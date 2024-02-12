// function to update an array in state
export function addToStateArray(stateFunction, dataToAdd) {
    stateFunction((existingData) => [
        ...existingData,
        dataToAdd
    ])
}

// function to get username from a given id'
export function getUsername(users, id) {
    // check if a user exists with the givem id
    if (users.find(user => user.hasOwnProperty(id))) {
        // return the user's username
        return users.find(user => user.hasOwnProperty(id))[id]    
    }

    // return false if a user with the specified id does not exist
    return false
}