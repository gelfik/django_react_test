export const dayText = (count) => {
    switch (count) {
        case 0:
            return 'вс'
        case 1:
            return 'пн'
        case 2:
            return 'вт'
        case 3:
            return 'ср'
        case 4:
            return 'чт'
        case 5:
            return 'пт'
        case 6:
            return 'сб'
        default:
            return ''
    }
}

export const mounthText = (count) => {
    switch (count) {
        case 0:
            return 'января'
        case 1:
            return 'февраля'
        case 2:
            return 'марта'
        case 3:
            return 'апреля'
        case 4:
            return 'мая'
        case 5:
            return 'июня'
        case 6:
            return 'июля'
        case 7:
            return 'августа'
        case 8:
            return 'сентября'
        case 9:
            return 'октября'
        case 10:
            return 'ноября'
        case 11:
            return 'декабря'
        default:
            return ''
    }
}