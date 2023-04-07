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
        - ハンドラから情報を受け取り、CLIOutputDivにDOMparagraphを追加する、専用のビュー関数で生成されるレスポンス 
*/

export class MTools {
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

  /*
        StringArray : 文字列トークンに変換されたコマンドライン入力
        return String : 数学演算の結果
        このメソッドは、与えられたコマンドに基づいて、JavaScriptにデフォルトで組み込まれているmath関数を呼び出すことで、CLIOutputDiv内に表示されるコンテンツを生成します。
   */
  static evaluatedResultsStringFromParsedStringInputArray(
    parsedStringInputArray: string[],
  ): string {
    let result = 0;
    const argsArray = parsedStringInputArray[2]
      .split(',')
      .map((stringArgument) => Number(stringArgument));
    const argA = argsArray[0];
    const argB = argsArray[1];
    const commandName = parsedStringInputArray[1];

    if (commandName == 'add') result = argA + argB;
    else if (commandName == 'subtract') result = argA - argB;
    else if (commandName == 'multiply') result = argA * argB;
    else if (commandName == 'divide') result = argA / argB;
    else if (commandName == 'exp') result = Math.pow(argA, argB);
    else if (commandName == 'log') result = Math.log(argB) / Math.log(argA);
    else if (commandName == 'sqrt') result = Math.sqrt(argA);
    else if (commandName == 'abs') result = Math.abs(argA);
    else if (commandName == 'round') result = Math.round(argA);
    else if (commandName == 'ceil') result = Math.ceil(argA);
    else if (commandName == 'floor') result = Math.floor(argA);
    else
      console.log('MTools.evaluatedResultsStringFromParsedStringInputArray:: invalid command name');

    return `your result is: ${result}`;
  }
}
