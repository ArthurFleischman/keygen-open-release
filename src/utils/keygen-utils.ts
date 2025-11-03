import { OpenReleaseModel } from "src/models/open-release/open-release-model";
import { ReleaseAttributes } from "src/models/open-release/attributes-model";
import { ReleaseChannel } from "src/models/open-release/release-channel";
import { ReleaseRelationships } from "src/models/open-release/relationship-model";
import { createRelease } from "src/services/keygen-service";

export async function openRelease(githubTag: string,
  releaseChannel: ReleaseChannel,
  releaseName: string,
  productID: string,
  keygenAuthKey: string,
  keygenAccountID: string
): Promise<string> {
  const parsedTagVersion = githubTag.replace('v', '');
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

  //   JSON.stringify({
  //   "data": {
  //     "type": "release",
  //     "attributes": {
  //       "version": parsedTagVersion,
  //       "channel": releaseChannel,
  //       "tag": githubTag
  //     },
  //     "relationships": {
  //       "product": {
  //         "data": {
  //           "type": "product",
  //           "id": "${{secrets.KEYGEN_PRODUCT_ID}}"
  //         }
  //       },
  //       "package": {
  //         "data": {
  //           "type": "package",
  //           "id": "${{secrets.KEYGEN_PACKAGE_ID}}"
  //         }
  //       }
  //     }
  //   }
  // })

}
