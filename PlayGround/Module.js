let nameSymbol = Symbol.for("name");

export let user = {
    [nameSymbol] : "harry"
}


// console.log(user[nameSymbol]);