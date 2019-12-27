
import { element } from '../utility/html';

export const paragraph = (label, attrs) => element('p', label, attrs);
export const strong    = (label, attrs) => element('strong', label, attrs);
export const title     = (label, attrs) => element('h2', label, attrs);
export const subTitle  = (label, attrs) => element('h3', label, attrs);
export const small     = (label, attrs) => element('small', label, attrs);