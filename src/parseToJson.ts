export const parseToJson = (content: string) => {
    const removeClassNameRegex = new RegExp('[a-zA-Z0-9]+(?={)', 'g');
    const addQuotationMarkToKeys = new RegExp('(?<=[{\\s])([a-zA-Z0-9]+)=', 'g');
    const addQuotationMarkToValues = new RegExp('(?<=":\\s)([^"\\{\\}\\[\\]]+)(?=[,}])', 'g');
    const getPrimitivesArrays = new RegExp('(?<=":\\s\\[)[^\\{\\}]+(?=\\],)', 'g');
    const removeQuotationMarkOfBooleanValues = new RegExp('"(true|false)"', 'g');

    const contentInJson = content
        .replace(removeClassNameRegex, '')
        .replace(addQuotationMarkToKeys, (match, group1, offset, string) => `"${group1}": `)
        .replace(addQuotationMarkToValues, (match, group1, offset, string) => `"${group1}"`)
        .replace(getPrimitivesArrays, (match, offset, string) => parseArrayOfStrings(match))
        .replace(removeQuotationMarkOfBooleanValues, (match, group1, offset, string) => group1);

    return contentInJson;
};

const parseArrayOfStrings = (value: string = '') => {
    const selectValuesFromPrimitiveArray = new RegExp('([^\\[\\],]+)([\\]\\,]?)', 'g');

    const valueParsed = value.replace(selectValuesFromPrimitiveArray,
        (match, group1, group2, offset, string) => {
            const valueSanitized = group1.trim();

            if (valueSanitized === '') {
                return '';
            }

            return `"${valueSanitized}"${group2}`;
        });

    return valueParsed;
};