/**
 * 1. Hello, Object
 * write appropriate code follow procedure
 * - create empty object 'user'
 * - add property key is name, value is John to user Object
 * - add property key is surname, value is Smith to user Object
 * - modify value to Pete which is key is name
 * - delete name property from user Object
 */

function helloObject() {
    const user = {};
    user.name = 'John';
    user.surname = 'Smith';
    user.name = 'Pete';
    delete user.name;
}

/**
 * 2. Check Object is empty
 * write the function isEmpty(obj) which is return true if the object has no properties, return false otherwise.
 */

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }

    return true;
}

/**
 * 3. Sum object properties
 * We have an object storing salaries of our team:
 * let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.

If salaries is empty, then the result must be 0.
 */

function sumProps(obj) {
    let sum = 0;

    for (let key in obj) {
        sum += obj[key];
    }

    return sum;
}

/**
 * 3. Multiply numeric property values by 2
 * Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.
 */

function multProps(obj) {
    for (let key in obj) {
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
    }
}