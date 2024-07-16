// Example of result
// furiganaLine: とくしゅほうじん にっぽんほうそうきょうかい    ほうそうほう       せんきゅうひゃくごじゅうねん
// kanjiLine:    特殊法人        日本放送協会            は、放送法     に基づき 1950年                  に設立された。

const example = {
  kanji: "特殊法人日本放送協会は、放送法に基づき1950年に設立された。",
  kana: "とくしゅほうじんにっぽんほうそうきょうかいは、ほうそうほうに基づきせんきゅうひゃくごじゅうねんにせつりつされた。",
  english:
    "The Japan Broadcasting Corporation, a special corporation, was established in 1950 based on the Broadcasting Law.",
  pieces: [
    { lifted: "とくしゅほうじん", unlifted: "特殊法人" },
    { lifted: "にっぽんほうそうきょうかい", unlifted: "日本放送協会" },
    { lifted: "", unlifted: "は、" },
    { lifted: "ほうそうほう", unlifted: "放送法" },
    { lifted: "", unlifted: "に基づき" },
    { lifted: "せんきゅうひゃくごじゅうねん", unlifted: "1950年" },
    { lifted: "", unlifted: "に設立された。" },
  ],
};

// take the pieces array and iterate over it
// if the lifted key is empty, then the furigana should be spaces as long as the unlifted key
// and the kanjiLine should be the unlifted key
// a space should be inserted between each piece in both lines
// if the lifted key is not empty, then the furigana should be the lifted key and the kanjiLine
// should be filled with spaces to match the length of the unlifted key
// Example of result
// とくしゅほうじん にっぽんほうそうきょうかい    ほうそうほう       せんきゅうひゃくごじゅうねん
// 特殊法人        日本放送協会            は、放送法     に基づき 1950年

export function furigana(example, maxLineLength = 40) {
  let furiganaLine = "";
  let kanjiLine = "";

  let furiganaLines = [];
  let kanjiLines = [];

  if (!example.pieces) return example.kanji;

  example.pieces.forEach((piece) => {
    const maxLength = Math.max(
      [...piece.unlifted].length,
      [...piece.lifted].length
    );

    // use for the padding the japanese space unicode U+3000
    const japaneseSpace = "　";

    const addTofuriganaLine = piece.lifted.padEnd(maxLength, japaneseSpace);
    const addTokanjiLine = piece.unlifted.padEnd(maxLength, japaneseSpace);

    if (furiganaLine.length + addTofuriganaLine.length > maxLineLength) {
      furiganaLines.push(furiganaLine);
      kanjiLines.push(kanjiLine);
      furiganaLine = "";
      kanjiLine = "";
    }

    furiganaLine += addTofuriganaLine;
    kanjiLine += addTokanjiLine;
  });
  furiganaLines.push(furiganaLine);
  kanjiLines.push(kanjiLine);

  let result = "";
  for (let i = 0; i < furiganaLines.length; i++) {
    result += furiganaLines[i] + "\n" + kanjiLines[i] + "\n\n";
  }
  return result;
}

// Assuming example object is defined as per the initial description
// console.log(furigana(example));
