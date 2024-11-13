<template>
	<q-card class="no-border bg-white filter" flat bordered>
		<q-card-section>
            <span class="text-h5 text-grey-8">Reservar hotel</span>
		</q-card-section>
        <q-separator color="grey-6" />
        <q-card-section class="q-gutter-xs">
            <div>
                <span class="text-caption text-grey-8">Destino</span>
                <span class="text-caption text-red">*</span>
                <q-select
                    v-model="selected"
                    outlined
                    dense
                    stack-label
                    input-class="q-py-none"
                    use-input
                    hide-selected
                    fill-input
                    :options="filteredOptions"
                    hide-dropdown-icon
                    option-value="value"
                    option-label="label"
                    @update:model-value="updateValue"
                    @filter="filterFn"
                />
            </div>
            <div>
                <span class="text-caption text-grey-8">Nome do hotel</span>
                <q-input
                    v-model="nameFilter"
                    @update:model-value="updateName"
                    outlined
                    dense
                    use-input
                />
            </div>
		</q-card-section>
        <q-card-actions align="right">
            <q-btn unelevated rounded style="background-color: #009EFB; color: white;" :label="btnLabel" size="md" :loading="false" :disable="place === 0" @click="btnAction" class="q-mr-sm q-mb-sm" padding="sm xl" />
        </q-card-actions>
	</q-card>
</template>

<script setup lang="ts">
    import { ref, watch, defineProps, defineEmits } from 'vue';

    interface Option {
        value: number | string;
        [key: string]: unknown;
    }

	const props = defineProps<{
        place?: string | number;
        options: Option[];
        btnLabel?: string;
        btnAction?: () => void;
    }>();
    
    const emit = defineEmits(['update:place', 'update:name']);
	const selected = ref(props.options.find(option => option.value === props.place) || props.options[0])
    const nameFilter = ref(props.name)

    watch(() => props.place, (newVal) => {
        selected.value = props.options.find(option => option.value === newVal) || props.options[0];
    });
    watch(() => props.name, (newVal) => {
        nameFilter.value = newVal;
    });

    const updateValue = (newValue: string | number) => {
        emit('update:place', newValue);
    }

    const updateName = (newValue: string) => {
        emit('update:name', newValue)
    }

    const filteredOptions = ref(props.options)
	const filterFn = (val: string | number, update: (callback: () => void) => void) => {
        update(() => {
            const needle = String(val).toLowerCase()
            filteredOptions.value = props.options.filter((v: Option) =>
                String(v.label).toLowerCase().includes(needle)
            )
        })
    }
</script>

<style lang="scss">
    .filter {
        width: 100%;
    }
</style>