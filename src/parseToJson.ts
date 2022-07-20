export const parseToJson = (content: string) => {
    const removeClassNameRegex = new RegExp('\\w+(?={)','g');
    const addQuotationMarkToKeys = new RegExp('(?<=[{\\s])([a-zA-Z0-9]+)=','g');
    const addQuotationMarkToValues = new RegExp('(?<=":\\s)([^{}"\\[]+)(?=[,}])','g');
    const addQuotationMarkToSomeValueInArrays = new RegExp('(?<=":\\s\\[)[^\\{\\}]+(?=\\])','g');
    const removeQuotationMarkOfBooleanValues = new RegExp('"(true|false)"','g');

    const contentInJson = content
    .replace(removeClassNameRegex, '')
    .replace(addQuotationMarkToKeys,(match, group1, offset, string)=> `"${group1}": `)
    .replace(addQuotationMarkToValues,(match, group1, offset, string)=> `"${group1}"`)
    .replace(addQuotationMarkToSomeValueInArrays,(match, offset, string) => parseArrayOfStrings(match))
    .replace(removeQuotationMarkOfBooleanValues,(match, group1, offset, string)=> group1);
    
    return contentInJson;
};

const parseArrayOfStrings = (value: string = '') => {
    return value.split(",")
    .map((value: string) => `"${value.trimStart().trimEnd()}"`)
    .join(",");
}; 