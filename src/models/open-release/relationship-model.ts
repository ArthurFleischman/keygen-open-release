import { ReleaseChannel } from "./release-channel";

type RelationshipProduct = {
  "data": {
    "type": "product",
    "id": string
  };
};


// export type RelationshipConstraint = {
//   "type": "constraint",
//   "relationships": {
//     "entitlement": {
//       "data": { "type": "entitlement", "id": "2f9397b0-bbde-4219-a761-1307f338261f" }
//     }
//   }
// };

// export type RelationshipConstraints = {
//   "data": RelationshipConstraint[]
// };


export type ReleaseRelationships = {
  product: RelationshipProduct,
  // constraints: RelationshipConstraints; //OPTIONAL IMPLEMENT LATTER
};
