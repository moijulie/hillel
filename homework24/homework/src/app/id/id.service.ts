import * as fs from "fs";
import { promisify } from "util";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "../../utils/error.util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const FILE_PATH = "./operation.json";

class InputOperation {
  id: string;
  constructor(public operation: string) {
    this.id = uuid();
  }
}
type State = InputOperation[];

export const InputService = class InputService {
  async summary(oper: string, el1: number, el2: number) {
    const result = el1 + el2;
    await this.log(oper, el1, el2, result);
  }
  async substraction(oper: string, el1: number, el2: number) {
    const result = el2 + el1;
    await this.log(oper, el1, el2, result);
  }
  async multiplication(oper: string, el1: number, el2: number) {
    const result = el1 * el2;
    await this.log(oper, el1, el2, result);
  }
  async division(oper: string, el1: number, el2: number) {
    const result = el1 / el2;
    await this.log(oper, el1, el2, result);
  }
  async toPower(oper: string, el1: number, el2: number) {
    const result = el1 ** el2;
    await this.log(oper, el1, el2, result);
  }

  private async log(
    func: string,
    arg1: number,
    arg2: number,
    result: number
  ): Promise<void> {
    const state = await this.getState();
    switch (func) {
      case "sum":
        const sum = new InputOperation(`${arg1} + ${arg2} = ${result}`);
        state.push(sum);
        break;
      case "subst":
        const subst = new InputOperation(`${arg2} - ${0 - arg1} = ${result}`);
        state.push(subst);
        break;
      case "mul":
        const mul = new InputOperation(`${arg1} * ${arg2} = ${result}`);
        state.push(mul);
        break;
      case "div":
        const div = new InputOperation(`${arg1} / ${arg2} = ${result}`);
        state.push(div);
        break;
      case "pow":
        const pow = new InputOperation(`${arg1} ** ${arg2} = ${result}`);
        state.push(pow);
        break;
      default:
        break;
    }
    await this.setState(state);
  }

  async handleRes(value: string, oper: string): Promise<void> {
    const [el1, el2] = value.split(",");
    const firstNum = Number(el1);
    const secondNum = Number(el2[0]);
    if (oper === "sum") {
      await this.summary(oper, firstNum, secondNum);
    } else if (oper === "subst") {
      await this.substraction(oper, firstNum, secondNum);
    } else if (oper === "mul") {
      await this.multiplication(oper, firstNum, secondNum);
    } else if (oper === "div") {
      await this.division(oper, firstNum, secondNum);
    } else if (oper === "pow") {
      await this.toPower(oper, firstNum, secondNum);
    } else {
      throw new NotFoundError();
    }
  }

  async handleGet(value: string): Promise<InputOperation> {
    const state = await this.getState();

    const match = state.find((todo) => todo.id === value);
    if (!match) {
      throw new NotFoundError();
    }
    return match;
  }
  async handleList(): Promise<State> {
    const state = await this.getState();
    if (state.length < 1) {
      throw new NotFoundError();
    }
    return state;
  }

  async handleClear(): Promise<void> {
    const state = await this.getState();
    state.length = 0;
    await this.setState(state);
  }

  private async getState(): Promise<State> {
    let data = "[]";
    try {
      data = await readFile(FILE_PATH, "utf-8");
    } catch {
      await writeFile(FILE_PATH, data);
    } finally {
      return JSON.parse(data);
    }
  }

  private async setState(state: State): Promise<void> {
    try {
      await writeFile(FILE_PATH, JSON.stringify(state));
    } catch (error) {
      throw error;
    }
  }
};