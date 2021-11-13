export const containTitle = (movie, value) => !value.length || movie.title.toLowerCase().includes(value.toLowerCase())

export const containDate = (movie, value) => !value.length || new Date(movie.release_date).getTime() >= new Date(value).getTime()

export const containCategories = (movie, value) => !value.length || movie.categories.map(c => c.toLowerCase()).includes(value.toLowerCase())


export const filterArray = (inputArr) => {
    let found = {};
    let out = inputArr.filter(function (element) {
        return found.hasOwnProperty(element) ? false : (found[element] = true);
    });
    return out;
}