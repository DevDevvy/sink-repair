
const completions = {
    completions: []
}

const applicationState = {
    requests: []
}

const plumberList = {
    plumbers: []
}

const mainContainer = document.querySelector("#container")

// ------HTTP GET request---------
const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

// -------export requests state---------
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbers) => {
                // Store the plumbers list in variable
                plumberList.plumbers = plumbers
            }
        )
}


// -------export plumbers---------
export const getPlumbers = () => {
    return plumberList.plumbers.map(plumber => ({...plumber}))
}



// ------tell API you want to create something new by using POST
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
        
    }
    // dispatch custom event after POST is completed
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// function initiates fetch request for DELETE (must have primary key as argument)
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
        
    }}

    export const fetchCompletions = () => {
        return fetch(`${API}/completions`)
            .then(response => response.json())
            .then(
                (serviceRequests) => {
                    // Store the external state in application state
                    completions.completions = serviceRequests
                }
            )
    }