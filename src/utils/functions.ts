export const filterFormData = (formData: FormData) => {
    const entries = Array.from(formData.entries())
    const filteredEntries = entries.filter(([key]) => !key.startsWith('$ACTION_'))
    return Object.fromEntries(filteredEntries)
}