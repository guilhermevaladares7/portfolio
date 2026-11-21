import { copy } from '../data/copy'
import { STOPS } from '../scene/stops'

export const SECTIONS = [
  { key: 'about', stop: STOPS.about, until: STOPS.firstProject - 1, label: copy.nav.about },
  { key: 'projects', stop: STOPS.firstProject, until: STOPS.experience - 1, label: copy.nav.projects },
  { key: 'experience', stop: STOPS.experience, until: STOPS.experience, label: copy.nav.experience },
  { key: 'contact', stop: STOPS.contact, until: STOPS.contact, label: copy.nav.contact },
] as const
