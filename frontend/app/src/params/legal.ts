import type { ParamMatcher } from '@sveltejs/kit';
import { legalPages } from '$lib/pages/legal/data/legal.service';

export const match: ParamMatcher = (param) => legalPages.includes(param);
