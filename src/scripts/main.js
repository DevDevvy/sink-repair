import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")
// ----fetch data from API and store it in application state, then convert data into HTML representation
const render = () => {
    fetchRequests()
        .then( 
            () => {
                return fetchPlumbers()})
        .then(
            () => {
                return fetchCompletions()})
        .then (
            () => {
                return mainContainer.innerHTML = SinkRepair()
            })
}

render()


// listens for custom event to invoke render() to refresh html with new state
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)