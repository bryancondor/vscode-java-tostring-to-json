export const parseToJson = (content: string) => {
    const removeClassNameRegex = new RegExp('[a-zA-Z0-9]+(?={)', 'g');
    const addQuotationMarkToKeys = new RegExp('\\s?(?<=[{\\s])([a-zA-Z0-9]+)=', 'g');
    const addQuotationMarkToValues = new RegExp('(?<=":)([^"\\{\\}]*)(?=[,}])', 'g');
    const getPrimitivesArrays = new RegExp('("\\[[^\\{\\}]*\\]")', 'g');
    const removeQuotationMarkOfBooleanValues = new RegExp('"(true|false)"', 'g');
    const removeQuotationMarkUnnecessaryInEmptyArrays = new RegExp('(?<=":)["]*\\[\\]["]*,["]?(?=")', 'g');

    const contentInJson = content
        .replace(removeClassNameRegex, '')
        .replace(addQuotationMarkToKeys, (match, group1, offset, string) => `"${group1}":`)
        .replace(addQuotationMarkToValues, (match, group1, offset, string) => `"${group1}"`)
        .replace(getPrimitivesArrays, (match, group1, offset, string) => parseArrayOfStrings(group1))
        .replace(removeQuotationMarkOfBooleanValues, (match, group1, offset, string) => group1)
        .replace(removeQuotationMarkUnnecessaryInEmptyArrays, (match, group1, offset, string) => removeQuotationMarkUnnecessaryInEmptyArray(match))

    return contentInJson;
};

const parseArrayOfStrings = (value: string = '') => {
    const stringToArray = new RegExp('"(.*)"', 'g');
    const selectValuesFromPrimitiveArray = new RegExp('([^\\[\\],]+)([\\]\\,]?)', 'g');

    const valueParsed = value
        .replace(stringToArray, (match, group1, offset, string) => group1)
        .replace(selectValuesFromPrimitiveArray,
            (match, group1, group2, offset, string) => {
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
        return match
    }

    return '[],';
}