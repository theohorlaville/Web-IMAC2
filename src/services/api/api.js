

const getEvent = async function (test) {
    const response = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?sort=random&size=50&page=" + test + "&apikey=kVnQuVpoBqstFdn0E2ecQYUZHrFvPK4E")
    console.log(response.status)
    if (response.status == 200) {
        const data = (await response.json())._embedded.events
        return data
    } else {

        new Error(response.statusText)
    }

}

export { getEvent }
