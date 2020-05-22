export const containsANumber = input => {
    return /\d/.test(input);
};

export const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const today = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return today = yyyy + '-' + mm + '-' + dd;
};
