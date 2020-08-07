export const shuffleArray = (array: string[]) => {
  let arrayLength = array.length;

  for (var i = 0; i < arrayLength; i++) {
    let randomIndex = Math.floor(Math.random() * 9 + 1);

    let temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};
