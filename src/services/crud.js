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
        fetch('http://192.168.1.58:3000/movies/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json()).catch((err) => console.log(err))
            .then(res => console.log(res))
    }
    static post = async (data) => {
        const movie = JSON.stringify(data)
        console.log(data)
        return await fetch('http://192.168.1.58:3000/movies/', {
            method: 'POST',
            body: movie,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
    static put = (id, data) => {
        delete data.id
        const movie = JSON.stringify(data)
        fetch('http://192.168.1.58:3000/movies/' + id, {
            method: 'PUT',
            body: movie,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json()).catch((err) => console.log(err))
            .then(res => console.log(res))
    }
}
export default Crud