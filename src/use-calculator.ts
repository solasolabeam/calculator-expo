import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState<number>(0);
  const [currentOperator, setCurrentOperator] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [tempInput, setTempInput] = useState(0);
  const [tempOperator, setTempOperator] = useState<string | null>(null);
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  // const hasInput = input ? true : false;
  const hasInput = !!input;

  const onPressNum = (num: number) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      // const newInput = input + num; // bad case
      const newInput = Number(`${input}${num}`); // good case
      setInput(newInput);
    }
  };

  const onPressOperator = (operator: string) => {
    if (operator !== "=") {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      if (result == null) {
        console.error("Result is null, cannot perform operation.");
      } else {
        let finalResult = result;
        const finalInput = isClickedEqual ? tempInput : input;
        const finalOperator = isClickedEqual ? tempOperator : currentOperator;
        switch (finalOperator) {
          case "+":
            finalResult = result + finalInput;
            break;
          case "-":
            finalResult = result - finalInput;
            break;
          case "*":
            finalResult = result * finalInput;
            break;
          case "/":
            finalResult = result / finalInput;
            break;
          default:
            break;
        }
        setResult(finalResult);
        setInput(finalResult);
        setTempInput(finalInput);
        setCurrentOperator(null);
        setTempOperator(finalOperator);
        setIsClickedEqual(true);
      }
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(0);
      setTempOperator(null);
    }
  };

  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
