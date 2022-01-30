import { Logger } from "../../utils/logger.util";
import { InputService } from "./id.service";
import { BadRequestError } from "../../utils/error.util";

export const IdController = class IdController {
  constructor(
    private readonly service = new InputService(),
    private readonly logger = new Logger()
  ) {}

  async handle(argv: string): Promise<void> {
    try {
      const [option, value] = argv.split("=");
      switch (option) {
        case "show":
          if (value) {
            const id = await this.service.handleGet(value);

            this.logger.notify("Operation is found:", id);
            break;
          }

          const IDs = await this.service.handleList();
          this.logger.notify("All Operations:", IDs);

          break;

        case "clear": {
          await this.service.handleClear();
          this.logger.notify("Successfully deleted");
          break;
        }
        default:
          throw new BadRequestError();
      
        case "f":
          const [operation, argum] = value.split("(");
          await this.service.handleRes(argum, operation);
              this.logger.notify("Successfully added");          
          break;
      }      
    } catch (error) {
      this.logger.warn(error as Error);
    }
  }
};