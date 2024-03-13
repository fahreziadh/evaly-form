import { db } from '$lib/db/db';
import { form } from '$lib/db/schemas';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		form:await data.getFormById(params.id),
	};
}) satisfies PageServerLoad;

const data = {
	getFormById: async (id: string) => {
		if (!id) throw new Error('Need id bruh!');

		return await db.query.form.findFirst({
            with: {
                contents: true
            },
			where(fields, { eq }) {
				return eq(fields.id, id ?? '');
			}
		});
	},
};

/* ================ACTIONS================ */

import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const title = data.get('title')?.toString();

		await db
			.update(form)
			.set({
				title: title ?? ''
			})
			.where(eq(form.id, id ?? ''));
	}
} satisfies Actions;
