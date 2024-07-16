import JishoAPI from "unofficial-jisho-api";

const jisho = new JishoAPI();

// get the first argument from command line
const phrase = process.argv[2];

jisho.searchForPhrase(phrase).then((result) => {
  if (!result.data) return;

  result.data.forEach((entry) => {
    // if (!entry.is_common) return;

    var output = "";

    entry.japanese.forEach((japanese) => {
      output += japanese.word + "\t" + japanese.reading + "\n";
    });

    if (entry.jlpt.length > 0) output += entry.jlpt.join(", ") + "\n";
    if (!entry.is_common) output += "UC\n";

    entry.senses.forEach((sense, index) => {
      output += index + 1 + ".\t" + sense.english_definitions.join(", ") + "\n";
    });
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
