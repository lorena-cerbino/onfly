<template>
	<div>
		<p>{{ title }}</p>
		<ul>
			<li>
				{{ hotel?.id }} - {{ hotel?.name }} - {{ hotel?.description }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { Hotel } from './models';

	interface Props {
		title: string;
		hotel?: Hotel;
	};

	withDefaults(defineProps<Props>(), {
	});
</script>
