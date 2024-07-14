

function add_number(num) {
   
    num++
    
    if (num < 100) {
        console.log(num, 'added 1')
        num = add_number(num)
        return num
    } else {
        return num
    }
}
add_number(0)