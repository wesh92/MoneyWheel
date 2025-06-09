// src/routes/+layout.server.ts

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	// Read the environment variables from the private scope (which we know works on the server)
	// and pass them to the client-side layout.
	return {
		session: await getSession(),
		supabaseUrl: SUPABASE_URL,
		supabaseKey: SUPABASE_ANON_KEY
	};
};
