export const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

export const validatePhone = (phone) => {
    const re = /^(\+7|7|8)?[\s]?\(?[489][0-9]{2}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/;
    return re.test(phone);
}

export const phoneMask = (phone) => {
    const regex = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
    const subst = "+$1 ($2) $3-$4-$5";
    return phone.replace(regex, subst);
}