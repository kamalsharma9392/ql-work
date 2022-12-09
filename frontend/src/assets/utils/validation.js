export const validateEmail = (email) => {
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return emailRegex.test(email.toLowerCase());
};

export const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(password);
};

export const setError = (errors,error) => {
    const found = errors.length>0?errors.some(el=>el.name===error.name):false;
    if(found){
        errors = errors.map(item=>{
            if(item.name===error.name)
                item.message = error.message
            return item;
        })
    }else{
        errors.push(error)
    }
    console.log('setError final',errors)
    return errors;
};