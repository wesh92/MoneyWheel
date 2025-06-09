// src/routes/+layout.server.ts

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	// Securely get the user and session on the server
	const {
		data: { user }
	} = await supabase.auth.getUser();
	const {
		data: { session }
	} = await supabase.auth.getSession();

	return {
		user,
		session,
		supabaseUrl: SUPABASE_URL,
		supabaseKey: SUPABASE_ANON_KEY
	};
};

