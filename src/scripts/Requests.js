import { getRequests, saveCompletion, sendRequest } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"


// function takes request as argument, then lists out as HTML description from data object
// below description is added delete button with an ID of the request.id
const RequestHTML = (request) => {
    const plumbers = getPlumbers()
    return `
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
    </select>
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`
    }





// function to buid requests list
export const Requests = () => {
    // get requests state
    const requests = getRequests()
    // build html list using map to iterate through requests and pass in the request HTML function as argument
    // interpolate requests map inside of <ul> tags to make list, and join all mapped strings together
    // line 35 
    let html = `
    <ul>
    ${
                requests.map(RequestHTML).join("")
            }
        </ul>
        `
    

    return html
}


const mainContainer = document.querySelector("#container")

// click listener for delete button calls deleteRequest
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        let today = new Date().toLocaleDateString()
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: requestId,
                plumberId: plumberId,
                date_created: today
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)