// src/routes/login/+page.server.ts

import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());

		const { error } = await supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		throw redirect(303, '/');
	},
	signup: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());

		const { error } = await supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid email or password.'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		throw redirect(303, '/');
	},
	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/login');
	}
};

