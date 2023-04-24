export type FDSState = {
  fileDirectorySystem: {
    inputCommand: string;
    history: Command[];
  };
};

export type Command = {
  id: number;
  tool: string;
  command: string;
  isValid: boolean;
  result: string;
};

export type ValidationResult = {
  tool: string;
  isValid: boolean;
  errorMessage: string;
}
