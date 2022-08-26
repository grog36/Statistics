/**
 * @Author Gregory Ecklund
 * @Version August 2022
 * Calculates probabilities using Binomial Distribution
 */


const erf = require("math-erf"); //Error function for calculations


class BinomialDistribution {

    /**
     * Calculates the probability of the amount of successes or less occurring in a certain number of trials.
     * @param {Number} numberOfSuccesses The number of successes from the trials.
     * @param {Number} numberOfTrials The number of trials ran.
     * @param {Number} successProb The probability (as a decimal) of a success occurring.
     * @returns The probability (as a decimal) of the amount of successes or less in the number of trials.
     */
    cumulativeProbabilityLeft(numberOfSuccesses, numberOfTrials, successProb) {
        let currentTotalProbability = 0;
        for (let i = 0; i < numberOfSuccesses; i++) {
            currentTotalProbability += probability(i, numberOfTrials, successProb);
        }
        return currentTotalProbability;
    }
    
    /**
     * Calculates the probability of the amount of successes or more ocurring in a certain number of trials.
     * @param {Number} numberOfSuccesses The number of successes from the trials.
     * @param {Number} numberOfTrials The number of trials ran.
     * @param {Number} successProb The probability (as a decimal) of a success occurring.
     * @returns The probability (as a decimal) of the amount of successes or more in the number of trials.
     */
    cumulativeProbabilityRight(numberOfSuccesses, numberOfTrials, successProb) {
        let currentTotalProbability = 0;
        for (let i = numberOfSuccesses; i <= numberOfTrials; i++) {
            currentTotalProbability += probability(i, numberOfTrials, successProb)
        }
        return currentTotalProbability;
    }
    
    /**
     * Calculates the probability of the amount of successes occuring in a certain number of trials.
     * @param {Number} numberOfSuccesses The number of successes from the trials.
     * @param {Number} numberOfTrials The number of trials ran.
     * @param {Number} successProb The probability (as a decimal) of a success occurring.
     * @returns The probability (as a decimal) of the amount of successes occurring in the number of trials.
     */
    singleProbability(numberOfSuccesses, numberOfTrials, successProb) {
        let nCr = (factorial(numberOfTrials)) / (factorial(numberOfSuccesses) * (factorial(numberOfTrials - numberOfSuccesses)));
        let answer = nCr * (successProb ** numberOfSuccesses) * ((1-successProb) ** (numberOfTrials - numberOfSuccesses));
        return answer;
    }
    
}


class NormalDistribution {
    
    /**
     * Calculates the probability of a single occurrence on a normal distribution graph.
     * @param {Number} x The x-value of the data point.
     * @param {Number} mean The mean of the data.
     * @param {Number} standardDeviation The standard deviation of the data.
     * @returns The probability (as a decimal) of x occurring (assuming normal distribution).
     */
    singleProbability(x, mean, standardDeviation) {
        let coefficient = 1/(Math.sqrt(2 * Math.PI) * standardDeviation);
        let exponent = ((-1 * ((x - mean) ** 2)) / (2 * (standardDeviation ** 2)));
        let answer = coefficient * (Math.E ** exponent);
        return answer;
    }

    /**
     * Calculates the probability of anything to the left of x occurring (assuming normal distribution).
     * @param {Number} x The x-value of the data point.
     * @param {Number} mean The mean of the data.
     * @param {Number} standardDeviation The standard deviation of the data.
     * @returns The probability (as a decimal) of anything to the left of x occurring.
     */
    leftCumulativeProbability(x, mean, standardDeviation) {
        let half = .5;
        let numerator = x - mean;
        let denominator = standardDeviation * Math.sqrt(2);
        let answer = half * (1 + erf(numerator/denominator));
        return answer;
    }
    
    /**
     * Calculates the probability of anything to the right of x occurrring (assuming normal distribution).
     * @param {Number} x The x-value of the data point.
     * @param {Number} mean The mean of the data.
     * @param {Number} standardDeviation The standard deviation of the data.
     * @returns The probability (as a decimal) of anything to the right of x occurring.
     */
    rightCumulativeProbability(x, mean, standardDeviation) {
        return (1 - this.leftCumulativeProbability(x, mean, standardDeviation));
    }

    //WIP
    inverseProbabilityLeft(percentile, mean, standardDeviation) {
        console.log("WIP");
    }
    
}


/**
 * Calculates a number's factorial (every integer greater than 1 and less than itself multiplied together).
 * @param {Number} number 
 * @returns The number's factorial.
 */
function factorial(number) {
    let output = 1;
    for (let i = number; i > 1; i--) {
        output *= i;
    }
    return output;
}


//Main Code
