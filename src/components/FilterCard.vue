<template>
	<q-card class="no-border bg-white container" flat bordered>
		<q-card-section>
            <span class="text-h5 text-grey-8">Reservar hotel</span>
		</q-card-section>
        <q-separator color="grey-6" />
        <q-card-section>
            <span class="text-caption text-grey-8">Destino</span>
            <span class="text-caption text-red">*</span>
            <q-select
                :model-value="place"
                outlined
                dense
                stack-label
                input-class="q-py-none"
                use-input
                input-debounce="0"
                :options="options"
                hide-dropdown-icon
            />
		</q-card-section>
        <q-card-actions align="right">
            <q-btn unelevated rounded color="primary" label="Alterar busca" size="md" :loading="false" :disable="false" click="() => {}" class="q-mr-sm q-mb-sm" padding="sm lg" />
        </q-card-actions>
	</q-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    interface Option {
        value: number | string;
        [key: string]: unknown;
    }

	interface Props {
		place?: string;
        options: Option[]
	};

	const props = withDefaults(defineProps<Props>(), {
        place: ''
    });

    const place = ref(props.place);

	// const filterFn = (val: string | number, update: (callback: () => void) => void) => {
    //     update(() => {
    //         const needle = String(val).toLowerCase()
    //         options.value = options.filter((v) =>
    //             String(v.value).toLowerCase().includes(needle)
    //         )
    //     })
    // }
</script>

<style lang="scss">
    .container {
        width: 90%;
    }
</style>