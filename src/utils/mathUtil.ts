/**

 @param min
 @param max
 @returns 
 @throws 
 
 */

export const generateRandomInteger = (min: number, max: number): number => {
    if (min > max) {
       throw new Error(
            "Value has to be lower or equal to maximum."
       );
    }
 
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
 
    return randomInteger;
 };