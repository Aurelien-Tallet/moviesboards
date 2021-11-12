class Crud {
    static get = async (URL) => {
        try {
            const response = await fetch(URL)
            if (response.status === 404) return false
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err)
            return new Error('Not Found')
        }
    }
    static delete = (id) => {
        fetch('http://localhost:4000/movies/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json()).catch((err) => console.log(err))
            .then(res => console.log(res))
    }
    static post = (data) => {
        const movie = JSON.stringify(data)
        console.log(data)
        fetch('http://localhost:4000/movies/', {
            method: 'POST',
            body: movie,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}
export default Crud