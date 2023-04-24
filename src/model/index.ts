import type { ValidationResult } from '../types';
/*
    GOAL: 
        一般的な基本的な数学操作のインターフェースとしてコマンドラインベースの数学ツールを構築する
    REQUIREMENTS:
        - ユーザはコマンドを "MTools mathOperation arguments "の形式でテキストとして入力する必要があります。
        - 結果はスクリーンに表示される必要があります。
        - 有効な引数の組み合わせ:
            = 'add x y': 2つの数値を足す
            = 'subtract x y ': 2つの数値を引く
            = 'multiply x y': 2つの数値を掛ける
            = 'divide x y ': 2つの数値を割る
            = 'exp a b': 指数を使って、a^bを計算する
            = 'log a b': 対数を計算する (logb / loga)
            = 'sqrt x': 数値の平方根を見つける
            = 'abs x': 数値の絶対値を見つける
            = 'round x': 数値を丸める
            = 'ceil x': 小数点以下の繰り上げ
            = 'floor x': 小数点以下の繰り下げ
    DESIGN CHOICES:
      - 入力文字列を空白で分割して文字列の配列に変換します。
      - この文字列の入力配列には、3つの要素 パッケージ名 コマンド 引数が含まれる必要があります。
      - parsedStringInputArrayが有効な場合は、専用ハンドラに渡して適切な組み込みJSを実行し、文字列のレスポンスを生成します。
      - 入力の検証を2つのステップに分けます: すべてのコマンドを対象とした検証と、特定のコマンドを対象とした入力の検証です。
      - 入力が有効でない場合は、エラーメッセージを生成して、ユーザーが別の方法でどうすれば良いかを伝えます。
      - ハンドラから情報を受け取り、CLIOutputDivにDOMparagraphを追加する、専用のビュー関数で生成されるレスポンス
*/

export class CommandLine {
  /*
    String CLIInputString : コマンドラインから取得した文字列としての入力全体 
    return StringArray : CLIInputStringを空白で区切った文字列の配列で、要素はpackageName, mathOperation, argumentA, argumentB(オプション)を表します。 
        
    NOTE: これはMTools用に特別に作られたコマンドラインパーサー（解析器）です。
    このメソッドは、CLIInputStringを文字列の配列に解析しますが、エラーチェックや入力の検証は行いません。
  */
  static commandLineParser(CLIInputString: string): string[] {
    const parsedStringInputArray = CLIInputString.trim().split(' ');
    return parsedStringInputArray;
  }
}
export class MTools {
  /*
    StringArray parsedStringInputArray : " "で分割されて文字列の配列になった元のコマンドライン入力。
    return {'isValid': <Boolean>, 'errorMessage': <String>} : booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定されます。  

    すべてのコマンドで有効なトークンに必要な Mtoolsのルールは以下の通りです。
      - トークンの数は3である必要があります。
      - 最初のトークンは "MTools" である必要があります。
      - 第二トークンは以下の1つになります。 {"add", "subtract", "multiply", "divide", "exp", "log", "abs","sqrt", "round", "ceil", "floor"}
      - 第三のトークンの引数は、変換された数値を、","で分割することで、さらに解析できるようにする必要があります。
  */
  static universalMToolsValidator(parsedStringInputArray: string[]): ValidationResult {
    const validCommandList = [
      'add',
      'subtract',
      'multiply',
      'divide',
      'exp',
      'log',
      'abs',
      'sqrt',
      'round',
      'ceil',
      'floor',
    ];
    if (parsedStringInputArray[0] !== 'MTools') {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `only MTools package supported by this app. input must start with 'MTools'`,
      };
    }
    if (parsedStringInputArray.length !== 3) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command line input must contain exactly 3 elements: 'packageName commandName arguments'`,
      };
    }
    if (validCommandList.indexOf(parsedStringInputArray[1]) === -1) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `MTools only supports the following commands: ${validCommandList.join(',')}`,
      };
    }
    if (!MTools.allStringElementsOfArrayContainNumbers(parsedStringInputArray[2].split(','))) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `last element of command line input, arguments, should contain only numbers and commas`,
      };
    }

    return { tool: 'MTools', isValid: true, errorMessage: '' };
  }
  /*
    StringArray parsedStringInputArray : " "で分割されて文字列の配列になった元のコマンドライン入力。
    return {'isValid': <Boolean>, 'errorMessage': <String>} : booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定されます。

    このメソッドは、与えられたコマンドが1つか2つかの引数を必要とするかどうかに応じて、validatorをさらに呼び出します。
  */
  static commandArgumentsValidator(commandArgsArray: string[]): ValidationResult {
    const singleArgumentCommands = ['abs', 'sqrt', 'ceil', 'round', 'floor'];
    const doubleArgumentCommands = ['add', 'subtract', 'divide', 'multiply', 'exp', 'log'];
    const argsArray = commandArgsArray[1].split(',').map((stringArg) => Number(stringArg));
    let isSingle = false;

    // 与えられたコマンドが単一の引数を必要とする場合、コマンドと引数をsingle argument validatorに渡します。
    if (singleArgumentCommands.indexOf(commandArgsArray[0]) !== -1) {
      isSingle = true;
    }

    // 与えられたコマンドが2つの引数を必要とする場合、コマンドと引数をdouble argument validatorに渡します。
    if (doubleArgumentCommands.indexOf(commandArgsArray[0]) !== -1) {
      isSingle = false;
    }

    return isSingle
      ? MTools.singleArgValidator(commandArgsArray[0], argsArray)
      : MTools.doubleArgValidator(commandArgsArray[0], argsArray);
  }

  /*
    StringArray parsedStringInputArray : " "で分割されて文字列の配列になった元のコマンドライン入力。
    return {'isValid': <Boolean>, 'errorMessage': <String>} : booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定されます。
    
    MToolsの単一引数コマンドにおける有効なトークンのルール:
      - 引数の数はちょうど1である必要があります。
      - 二番目のトークンが'sqrt'の場合、引数は負の値であってはいけません。
  */
  static singleArgValidator(commandName: string, argsArray: number[]): ValidationResult {
    if (argsArray.length !== 1)
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command ${commandName} requires exactly 1 argument`,
      };
    if (commandName === 'sqrt' && argsArray[1] < 0)
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command ${commandName} only supports arguments with value >= 0`,
      };

    return { tool: 'MTools', isValid: true, errorMessage: '' };
  }

  /*
    StringArray parsedStringInputArray : " "で分割されて文字列の配列になった元のコマンドライン入力。
    return {'isValid': <Boolean>, 'errorMessage': <String>} : booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定されます。

    MToolsの2つの引数コマンドにおける有効なトークンのルール:
      - 引数の数はちょうど2である必要があります。
      - 二番目のトークンが'sqrt'の場合、引数は負の値であってはいけません。
      - 二番目のトークンが'log'の場合、最初の引数は1より大きい必要があります。
      - 二番目のトークンが'divide'の場合、第二引数は0であってはいけません。
  */
  static doubleArgValidator(commandName: string, argsArray: number[]): ValidationResult {
    if (argsArray.length !== 2) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command ${commandName} requires exactly 2 arguments`,
      };
    }
    if (commandName === 'divide' && argsArray[1] === 0) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command ${commandName} requires divisors !== 0`,
      };
    }
    if ((commandName === 'log' && argsArray[0] <= 0) || argsArray[0] === 1) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command ${commandName} requires a base > 0 and not equal to 1`,
      };
    }
    if ((commandName === 'log' && argsArray[0] <= 0) || argsArray[0] === 1) {
      return {
        tool: 'MTools',
        isValid: false,
        errorMessage: `command ${commandName} requires a positive antilogarithm`,
      };
    }

    return { tool: 'MTools', isValid: true, errorMessage: '' };
  }
  /*
    StringArray inputArray : 文字列の配列
    return Boolean : すべての文字列を数値に解析できる場合はtrue、そうでない場合はfalse
    note: 変換された文字列がデータ型"number"を持っているかどうかを確認したいのですが、文字を含む文字列(例:"one")を与えた場合、変換された文字列は"NaN"を生成し、これは数値とみなされてしまうので注意が必要です。 

    変換された文字列がNumber型であること、またNaN型でないことを確認するために、追加のチェックが必要です。
  */
  static allStringElementsOfArrayContainNumbers(inputArray: string[]): boolean {
    return inputArray.reduce((elementsAreNumbers, currentElement) => {
      const parsedNum = Number(currentElement);
      return elementsAreNumbers && typeof parsedNum === 'number' && !isNaN(parsedNum);
    }, true);
  }

  /*
    StringArray : 文字列トークンに変換されたコマンドライン
    return String : 演算結果

    このメソッドは、CLIOutputDivに表示されるコンテンツを生成します。
  */
  static evaluatedResultsStringFromParsedCLIArray(PCA: string[]): string {
    let result = 0;
    const argsArray = PCA[2].split(',').map((stringArgument) => Number(stringArgument));
    const argA = argsArray[0];
    const argB = argsArray[1];

    if (PCA[1] === 'add') result = argA + argB;
    else if (PCA[1] === 'subtract') result = argA - argB;
    else if (PCA[1] === 'multiply') result = argA * argB;
    else if (PCA[1] === 'divide') result = argA / argB;
    else if (PCA[1] === 'exp') result = Math.pow(argA, argB);
    else if (PCA[1] === 'log') result = Math.log(argB) / Math.log(argA);
    else if (PCA[1] === 'sqrt') result = Math.sqrt(argA);
    else if (PCA[1] === 'abs') result = Math.abs(argA);
    else if (PCA[1] === 'round') result = Math.round(argA);
    else if (PCA[1] === 'ceil') result = Math.ceil(argA);
    else if (PCA[1] === 'floor') result = Math.floor(argA);
    else console.log('MTools.evaluatedResultsStringFromParsedCLIArray:: invalid command name');

    return `your result is: ${result}`;
  }
}

export class Validator {
  static universalValidator(parsedStringInputArray: string[]): ValidationResult {
    const validToolList = ['MTools', 'help'];
    if (validToolList.indexOf(parsedStringInputArray[0]) !== -1) {
      return {
        tool: parsedStringInputArray[0],
        isValid: true,
        errorMessage: '',
      };
    }
    if (parsedStringInputArray[0] === '') {
      return {
        tool: '',
        isValid: true,
        errorMessage: '',
      };
    }

    return {
      tool: 'Invalid tool',
      isValid: false,
      errorMessage: `This command line system only supports the following tools: ${validToolList.join(
        ',',
      )}`,
    };
  }

  /*
    StringArray parsedStringInputArray : " "で分割されて文字列の配列(トークンと呼ばれる)になった元のコマンドライン入力。
    return AssociativeArray : {'isValid': <Boolean>, 'errorMessage': <String>} の形。ここでは、'isValid'はコマンドラインからの入力が有効な場合には真、無効な場合には偽となります。
    返される連想配列は、与えられた文字列配列が有効なトークンに対するMToolsのルールに従っているかどうかに応じて、'isValid'キーに対してtrueあるいはfalseを返すことができます。入力が有効でない場合は、errorMessageが設定されます。

    このメソッドは、最初にすべてのコマンドのエラーをチェックし、入力がそのチェックを通過した場合、余分な制約（例えば、0で除算することができない等）がある場合には、各コマンドに対して固有のエラーをチェックします。

    入力検証(universal, commandArguments)の各レベルには個別のチェックが含まれていますが、ここでは参考までにすべてのチェックのリストを示しています。
      - 総トークン数は3である必要があります。
      - packageNameを表す最初のトークンは、"MTools"である必要があります。
      - commandNameを表す2番目のトークンは、以下のいずれか1つだけになります : {add"、"subtract"、"multiply"、"divide"、"exp"、"log"、"abs"、"sqrt"、"round"、"ceil"、"floor"}。

      - 引数を表す第三のトークンは、変換された数値を、","で分割することで、さらに解析できるようにする必要があります。
      - 第二のトークンが {"abs", "round", "ceil", "floor", "sqrt"}の場合、1つの引数だけ与えられます。
      - 第二のトークンが {"add", "subtract", "multiply", "divide", "exp", "log"}の場合、2つの引数が与えられます。

      - 第二のトークンが'divide'の場合、第二引数は0となってはいけません。
      - 第二のトークンが'sqrt'の場合、引数は負の数となってはいけません。
      - 第二のトークンが'log'の場合、第一引数は1より大きく、第二引数は正の数でなければなりません。
  */

  static parsedArrayValidator(parsedStringInputArray: string[]): ValidationResult {
    // すべてのコマンドに適用されるルールに照らし合わせて入力をチェックします。
    let validatorResponse = Validator.universalValidator(parsedStringInputArray);
    if (!validatorResponse.isValid) return validatorResponse;

    // 入力が最初のvalidatorを通過した場合、どのコマンドが与えられたかに基づいて、より具体的な入力の検証を行います。
    if (validatorResponse.tool === 'MTools') {
      validatorResponse = MTools.universalMToolsValidator(parsedStringInputArray);
      if (!validatorResponse.isValid) return validatorResponse;

      validatorResponse = MTools.commandArgumentsValidator(parsedStringInputArray.slice(1, 3));
      if (!validatorResponse.isValid) return validatorResponse;

      return { tool: 'MTools', isValid: true, errorMessage: '' };
    }

    if (validatorResponse.tool === 'help') {
      return { tool: 'help', isValid: true, errorMessage: '' };
    }

    return { tool: '', isValid: true, errorMessage: '' };
  }
}
