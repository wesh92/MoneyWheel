// src/routes/login/+page.server.ts

import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	// Securely check if a user is already logged in
	const {
		data: { user }
	} = await supabase.auth.getUser();
	if (user) {
		throw redirect(303, '/');
	}
};

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

		return {
			message: 'Please check your email to confirm your account before logging in.'
		};
	},
	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/login');
	}
};

