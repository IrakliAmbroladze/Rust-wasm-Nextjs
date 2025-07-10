"use client";

import { useEffect, useState } from "react";
import * as wasm from "fib_wasm";
import { useDebounce } from "use-debounce";

export default function FibWasm() {
  const [value, setValue] = useState<number | null>(null);
  const [variable, setVariable] = useState<number>(0);
  const [debouncedVariable] = useDebounce(variable, 100);
  const [t0, setT0] = useState<number>(0);
  const [t1, setT1] = useState<number>(0);

  const minVariable = 0;
  const maxVariable = 40;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= minVariable && val <= maxVariable) {
      setVariable(val);
    } else {
      alert(`Please enter a value between ${minVariable} and ${maxVariable}`);
    }
  };

  useEffect(() => {
    setT0(performance.now());
    const result = wasm.fib(debouncedVariable);
    setT1(performance.now());
    setValue(result);
  }, [debouncedVariable]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
        🧮 Rust + wasm + Next.js Fibonacci
      </h2>
      <div className="text-gray-700 text-center mb-6">
        <div className="font-bold">W E L C O M E</div>
        <div>This is a Fibonacci calculator powered</div>
        <div> by </div>
        <div>Rust compiled to WebAssembly.</div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="fibInput"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Enter a number between {minVariable} and {maxVariable}:
        </label>
        <input
          id="fibInput"
          type="number"
          min={minVariable}
          max={maxVariable}
          value={variable}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 text-black"
        />
      </div>

      {value !== null ? (
        <div className="bg-indigo-50 p-4 rounded-lg shadow-inner text-indigo-700">
          <p className="text-lg font-semibold">
            fib({debouncedVariable}) = {value}
          </p>
          <p className="text-sm text-gray-800 mt-1">
            Computed in {(t1 - t0).toFixed(8)} ms
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}
