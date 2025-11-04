
import { ReleaseAttributes } from "../models/open-release/attributes-model";
import { ReleaseChannel } from "../models/open-release/release-channel";
import { ReleaseRelationships } from "../models/open-release/relationship-model";
import { createRelease } from "../services/keygen-service";
import { OpenReleaseModel } from "../models/open-release/open-release-model";

export async function openRelease(
  githubTag: string,
  releaseChannel: ReleaseChannel,
  releaseName: string,
  productID: string,
  keygenAuthKey: string,
  keygenAccountID: string
): Promise<string> {

  const parsedTagVersion = `${githubTag.replace('v', '')}${releaseChannel !== "stable" ? `-${releaseChannel}` : ""}`;
  const releaseAttributes: ReleaseAttributes = { name: releaseName, version: parsedTagVersion, channel: releaseChannel, tag: githubTag };
  const releaseRelationships: ReleaseRelationships = {
    product: {
      data: {
        type: "product",
        id: productID
      }
    }
  };
  const release = new OpenReleaseModel(releaseAttributes, releaseRelationships);
  return await createRelease(release.toJson(), keygenAuthKey, keygenAccountID);

}
