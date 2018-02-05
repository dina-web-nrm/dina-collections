import { COLLECTION_MAMMALS_SET_ACCORDION_ACTIVE_INDEX } from '../actionTypes'

export default function setAccordionActiveIndex({ accordion, activeIndex }) {
  return {
    payload: { accordion, activeIndex },
    type: COLLECTION_MAMMALS_SET_ACCORDION_ACTIVE_INDEX,
  }
}
