import JishoAPI from "unofficial-jisho-api";
import { furigana } from "./furigana.js";

const jisho = new JishoAPI();

const phrase = process.argv[2];

jisho.searchForExamples(phrase).then((result) => {
  console.log("Jisho Uri: " + result.uri);
  console.log();

  for (let i = 0; i < 3; ++i) {
    let example = result.results[i];
    console.log(furigana(example));

    // console.log(example.kanji);
    // console.log(example.kana);
    console.log(example.english);
    // console.log(JSON.stringify(example.pieces));
    console.log();
  }
});
