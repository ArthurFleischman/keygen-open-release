import { ReleaseAttributes } from './attributes-model'
import { ReleaseRelationships } from './relationship-model'

export class OpenReleaseModel {
  type = 'release'
  attributes: ReleaseAttributes
  relationships: ReleaseRelationships

  constructor(
    attributes: ReleaseAttributes,
    relationships: ReleaseRelationships
  ) {
    this.attributes = attributes
    this.relationships = relationships
  }
  toJson(): string {
    return JSON.stringify({ data: this })
  }
}
