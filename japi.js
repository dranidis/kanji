import JishoAPI from "unofficial-jisho-api";

const jisho = new JishoAPI();

// Command line options:
// -u : show alsw uncommon words (default false is to hide them)

const args = process.argv.slice(2);

// Initialize option flags
let showUncommon = false;
let showWordsOnly = false;

// Parse command-line options
args.forEach(arg => {
  if (arg === '-u') {
    showUncommon = true;
  }
  if (arg === '-w') {
    showWordsOnly = true;
  }
});

// Get the first argument that is not an option as the phrase
const phrase = args.find(arg => !arg.startsWith('-'));

jisho.searchForPhrase(phrase).then((result) => {
  if (!result.data) return;

  console.log(result.data);

  result.data.forEach((entry) => {
    if (!entry.is_common && !showUncommon) return;

    var output = "";

    entry.japanese.forEach((japanese) => {
      if (showWordsOnly) {
        output += japanese.word + " ";
      } else {
        output += japanese.word + "\t" + japanese.reading + "\n";
      }
    });

    if (!showWordsOnly && entry.jlpt.length > 0) output += entry.jlpt.join(", ") + "\n";
    if (!showWordsOnly && !entry.is_common) output += "UC\n";

    if (!showWordsOnly) {
      entry.senses.forEach((sense, index) => {
        output += index + 1 + ".\t" + sense.english_definitions.join(", ") + "\n";
      });
    }

    output += "\n";

    console.log(output);
  });
});

// jisho.scrapeForPhrase(phrase).then((data) => {
//   //   console.log(JSON.stringify(data, null, 2));
//   console.log(data.query);
//   console.log(data.tags);
//   data.meanings.forEach((meaning) => {
//     console.log(meaning.definition);
//   });
// });
