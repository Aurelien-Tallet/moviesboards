class Crud {
    static get = async (URL) => {
        try {
            const response = await fetch(URL)
            const data = await response.json()
            return data
        } catch (err) {
            return err
        }
    }
    static delete = (id) => {
        fetch('http://localhost:4000/movies/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json()).catch((err) => console.log(err))
            .then(res => console.log(res))
    }
}
export default Crud