"use client";

import { useEffect, useState } from "react";
import * as wasm from "fib_wasm";

export default function FibWasm() {
  const [value, setValue] = useState<number | null>(null);
  const variable = 15;

  useEffect(() => {
    (async () => {
      const result = wasm.fib(variable);
      setValue(result);
    })();
  }, []);

  return (
    <div>
      <h2>Rust + Wasm</h2>
      {value !== null ? (
        <p>
          fib({variable}) = {value}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
