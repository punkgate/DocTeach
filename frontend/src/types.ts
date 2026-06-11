export interface TerminalLine {
  type:
    | "system"
    | "command"
    | "response"
    | "success"
    | "error";

  content: string;
}