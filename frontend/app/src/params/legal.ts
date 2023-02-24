import type { ParamMatcher } from '@sveltejs/kit';

const legalPages = ['imprint', 'privacy'];
export const match: ParamMatcher = (param) => legalPages.includes(param);
