/**
 * FullCalendar plugin initialization (Schedule)
 * @requires https://github.com/fullcalendar/fullcalendar
 */


// Calendar initialisation
const calendars = document.querySelectorAll('.calendar')
forEach(calendars, (index, value) => {
    let userOptions
    if (value.dataset.calendarOptions != undefined)
        userOptions = JSON.parse(value.dataset.calendarOptions)
    let options = {
        themeSystem: 'bootstrap5',
        ...userOptions,
    }

    /* eslint-disable no-undef */
    const calendarInstance = new FullCalendar.Calendar(value, options)
    /* eslint-enable no-undef */
    calendarInstance.render()
})
