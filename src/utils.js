
export function removeWords(inputString, number) {
    // Split the string into an array of words
    const wordsArray = inputString.split(' ');
  
    // Remove the first two elements from the array
    wordsArray.splice(0, number);
  
    // Join the remaining words back into a string
    const resultString = wordsArray.join(' ');
    
    return resultString;
  }