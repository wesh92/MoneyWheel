// src/routes/+page.server.ts

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	// Securely get the user from the server
	const {
		data: { user }
	} = await supabase.auth.getUser();

	// If the user is not logged in, redirect them to the login page
	if (!user) {
		throw redirect(303, '/login');
	}

	// Pass the secure user object to the page
	return {
		user
	};
};
