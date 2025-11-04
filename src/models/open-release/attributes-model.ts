import { ReleaseChannel } from './release-channel'

type ReleaseAttributes = {
  name: string
  version: string
  channel: ReleaseChannel
  tag: string
}

export { ReleaseAttributes }
