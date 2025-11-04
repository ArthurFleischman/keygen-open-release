type RelationshipProduct = {
  data: {
    type: 'product'
    id: string
  }
}

export type ReleaseRelationships = {
  product: RelationshipProduct
  // constraints: RelationshipConstraints; //OPTIONAL IMPLEMENT LATTER
}
