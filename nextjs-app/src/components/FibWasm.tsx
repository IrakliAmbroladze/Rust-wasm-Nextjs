"use client";

import { useEffect, useState } from "react";
import * as wasm from "fib_wasm";

export default function FibWasm() {
  const [value, setValue] = useState<number | null>(null);
  const [variable, setVariable] = useState<number>(0);
  const [t0, setT0] = useState<number>(0);
  const [t1, setT1] = useState<number>(0);
  const minVariable = 0;
  const maxVariable = 40;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= minVariable && val <= maxVariable) {
      setVariable(val);
    } else {
      alert(`please enter values between ${minVariable}-${maxVariable}`);
    }
  };

  // useEffect(() => {
  //   const result = wasm.fib(variable);
  //   setValue(result);
  // }, [variable]);

  useEffect(() => {
    setT0(performance.now());
    const result = wasm.fib(variable);
    setT1(performance.now());
    setValue(result);
  }, [variable]);

  return (
    <div>
      <h2>Rust + wasm + Nextjs app</h2>
      <div>
        This is a fibonacci calcularor using Rust compiled in web assembly
      </div>
      <div>
        Please, enter a value between {minVariable}-{maxVariable}:{" "}
      </div>
      <input
        type="number"
        className="border"
        value={variable}
        onChange={handleChange}
      />
      {value !== null ? (
        <>
          <p>
            fib({variable}) = {value}
          </p>
          <p>computed in {t1 - t0} ms</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
