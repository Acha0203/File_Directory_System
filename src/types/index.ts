export type FDSState = {
  fileDirectorySystem: {
    inputCommand: string;
    history: Command[];
  };
};

export type Command = {
  id: number;
  command: string;
  isValid: boolean;
  result: string;
};

export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
}
