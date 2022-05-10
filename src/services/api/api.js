

const getEvent = async function (page_number) {
    const response = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?sort=random&size=100&page=" + page_number + "&apikey=kVnQuVpoBqstFdn0E2ecQYUZHrFvPK4E")
    console.log(response.status)
    if (response.status == 200) {
        const data = (await response.json())._embedded.events
        data.map(element => {
            element["genre"] = element.classifications ? element.classifications[0].segment.name : "Undefined";
        })
        console.log(data)
        return data
    } else {

        new Error(response.statusText)
    }

}

export { getEvent }
