export const parseToJson = (content: string) => {
    const removeClassNameRegex = /[a-zA-Z0-9]+(?={)/g;
    const addQuotationMarkToKeys = /\s?(?<=[{\s])([a-zA-Z0-9]+)=/g;
    const addQuotationMarkToValues = /(?<=":)([^"{}]*)(?=[,}])/g;
    const getPrimitivesArrays = /("\[[^{}[]*\]")/g;
    const removeQuotationMarkOfBooleanValues = /"(true|false)"/g;
    const removeQuotationMarkUnnecessaryInEmptyArrays = /(?<=":)"*\[\]"*,?"?(?=")/g;

    const contentInJson = content
        .replace(removeClassNameRegex, '')
        .replace(addQuotationMarkToKeys, (_, group1) => `"${group1}":`)
        .replace(addQuotationMarkToValues, (_, group1) => `"${group1}"`)
        .replace(getPrimitivesArrays, (_, group1) => parseArrayOfStrings(group1))
        .replace(removeQuotationMarkOfBooleanValues, (_, group1) => group1)
        .replace(removeQuotationMarkUnnecessaryInEmptyArrays, match => removeQuotationMarkUnnecessaryInEmptyArray(match));

    return contentInJson;
};

const parseArrayOfStrings = (value: string = '') => {
    const stringToArray = /"(.*)"/g;
    const selectValuesFromPrimitiveArray = /([^[\],]+)([\],]?)/g;

    const valueParsed = value
        .replace(stringToArray, (_, group1) => group1)
        .replace(selectValuesFromPrimitiveArray, (_, group1, group2) => {
            const valueSanitized = group1.trim();

            if (valueSanitized === '') {
                return '';
            }

            return `"${valueSanitized}"${group2}`;
        });

    return valueParsed;
};

const removeQuotationMarkUnnecessaryInEmptyArray = (match: string = '') => {
    if (match.length <= 3) {
        return match;
    }

    return '[],';
}