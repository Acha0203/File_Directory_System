export type FDSState = {
  fileDirectorySystem: {
    inputCommand: string;
    history: Command[];
  };
};

export type Command = {
  id: number;
  command: string;
}
