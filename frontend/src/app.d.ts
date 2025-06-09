// src/app.d.ts

import { SupabaseClient, Session, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		// We no longer need the getSession helper on locals
		interface Locals {
			supabase: SupabaseClient;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
			supabaseUrl: string;
			supabaseKey: string;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};

