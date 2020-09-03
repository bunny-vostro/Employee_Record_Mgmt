function parseString(inputString) { 
    return JSON.parse(inputString);
}

function getUniqueContries(parsedString) {
    return parsedString.map(ele => ele[0]).filter((x, i, a) => a.indexOf(x) === i);
}

function getIndependentCountryBasedScores(parsedString, countryName) {
    let scoreOfCountry =  parsedString.filter(ele => ele[0] === countryName);
    let totalScore = scoreOfCountry.reduce((a, b) => a + (b[1] || 0), 0);
    let averageScore =  (totalScore/scoreOfCountry.length).toFixed(3);
    return {
        countryName: countryName,
        avgScore: averageScore
    };
}

function groupBasedOnCountry(parsedString) {
    const listCountries =  getUniqueContries(parsedString);
    let countryBasedAvgScore = [];
    listCountries.map(country => countryBasedAvgScore.push(getIndependentCountryBasedScores(parsedString, country)));
    return countryBasedAvgScore;     
}

function getListOfCountriesWithMaxAvg(jsonInput) {
    let maximunAvgRuns =  Math.max.apply(Math, jsonInput.map(function(o) { return o.avgScore; })).toFixed(3);
    let sameHighestAvgCountries = jsonInput.filter(performance => performance.avgScore === maximunAvgRuns);
    return sameHighestAvgCountries.map(country => country.countryName);
}

function main(inputString) {
    const parsedInput = parseString(inputString);
    let groupedData = groupBasedOnCountry(parsedInput);
    let finalOutput = getListOfCountriesWithMaxAvg(groupedData);
    console.log(finalOutput);
    return finalOutput.toString();
}