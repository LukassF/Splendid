export default function profile(value){
    let result = ''

    JSON.parse(window.localStorage.getItem('usersArray')).forEach(item => {
        if(item.username === window.localStorage.getItem('currentUsername')){
            result = item[value]
        }
    })

    return result
}