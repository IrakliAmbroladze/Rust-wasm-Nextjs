import * as wasm from "./fib_wasm_bg.wasm";
export * from "./fib_wasm_bg.js";
import { __wbg_set_wasm } from "./fib_wasm_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
