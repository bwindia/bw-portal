export const filterFormData = (formData: FormData) => {
    const formFields = Object.fromEntries(formData)
    delete formFields['$ACTION_REF_2']
    delete formFields['$ACTION_2:0']
    delete formFields['$ACTION_2:1']
    delete formFields['$ACTION_KEY']
    return formFields
}