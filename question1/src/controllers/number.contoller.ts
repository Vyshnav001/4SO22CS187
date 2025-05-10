import axios from "axios";

const AuthHeader = {
    Authorization: "Bearer " + process.env.BEARER_TOKEN,
    "Content-Type": "application/json",
};
const windowSize = 10;
let numbers: number[] = [];

export const fetchNumberAndCalculate = async (numberId: string) => {
    let idToFetch: string;

    const validNumberIds = ["p", "f", "e", "r"];
    //throw error if the numberId is not correct
    if (!validNumberIds.includes(numberId)) {
        throw new Error("Invalid number id");
    }
    // Map the numberId to the original id
    const idToOriginal: Record<string, string> = {
        p: "primes",
        f: "fibo",
        e: "even",
        r: "rand",
    };
    try {
        // Convert the numberId to the original id
        idToFetch = idToOriginal[numberId];
        var response = await axios.get(`http://20.244.56.144/evaluation-service/${idToFetch}`, {
            timeout: 500,
            headers: AuthHeader,
        });
    } catch (error) {
        console.error("Error fetching number:", error);
        throw new Error("Service Unavailable");
    }

    // store the previous state before making any changes
    const windowPrevState: number[] = [...numbers];
    // get unique numbers from the response
    const newNumbers: number[] = [...new Set(response.data.numbers as number[])];
    // merge with existing numbers while maintaining uniqueness
    const mergedNumbers: number[] = [...new Set([...numbers, ...newNumbers])];
    // update numbers array based on window size
    if (mergedNumbers.length <= windowSize) {
        numbers = mergedNumbers;
    } else {
        // keep the most recent windowSize numbers
        numbers = mergedNumbers.slice(-windowSize);
    }
    // calculate the average
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
 //return the response
    return {
        windowPrevState: windowPrevState,
        windowCurrState: numbers,
        numbers: response.data.numbers,
        avg: average.toFixed(2),
    };
};
