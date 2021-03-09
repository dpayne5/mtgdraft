import { API } from "aws-amplify";

export async function submitDraft(playercards) {
  let draftPreJsonString = "{";
  for (let card of playercards) {
    //card.id is just a placeholder since I'm not doing anything with the data ultimately.
    //This is just practice for how to use my POST endpoint from serverless.

    draftPreJsonString = draftPreJsonString.concat(
      `"${card.name}":"${card.id}",`
    );
  }
  draftPreJsonString = draftPreJsonString.concat("}");

  console.log(draftPreJsonString);
  let result = await putdraft(draftPreJsonString);
  console.log(result);
  return result;

  // return result;
}

async function putdraft(setname) {
  let result = API.post("mtgAPI", "submitdraft", { body: setname });
  return result;
}
