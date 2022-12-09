document.getElementById("submit").onclick = ()=> {
    const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    const phone = document.getElementById("phone").value
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const advice = document.getElementById('advice').value

    if(phone.match(regex)) {
        console.log("validated phone")
    }

    console.log(name, phone, description, advice)
}