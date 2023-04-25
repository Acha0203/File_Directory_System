export default {
  help: {
    description: `
    help: help toolName
      Display helpful information about builtin tools.
    `,
  },
  MTools: {
    description: `
      MTools: MTools commandName arguments
        You can do a variety of calculations with MTools.
        The available commands are as follows:
          add x,y = x + y
          subtract x,y = x - y
          multiply x,y = x * y
          divide x,y = x / y
          exp a,b = a ^ b
          log a,b = log b / log a
          sqrt x = a square root of x
          abs x = an absolute value of x
          round x = round x off to the nearest whole number
          ceil x = round x up to the nearest whole number
          floor x = discard decimals
          `,
  },
};
