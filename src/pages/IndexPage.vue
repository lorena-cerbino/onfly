<template>
	<q-page class="row items-center justify-evenly">
		<hotel-card
			title="Hotels list"
			active
			:todos="todos"
			:hotel="hotels[0]"
			:meta="meta"
		></hotel-card>
	</q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Todo, Meta, Hotel } from 'components/models';
import HotelCard from 'components/HotelCard.vue';

defineOptions({
	name: 'IndexPage'
});

const todos = ref<Todo[]>([
	{
		id: 1,
		content: 'ct1'
	},
	{
		id: 2,
		content: 'ct2'
	},
	{
		id: 3,
		content: 'ct3'
	},
	{
		id: 4,
		content: 'ct4'
	},
	{
		id: 5,
		content: 'ct5'
	}
]);

const hotels = ref<Hotel[]>([
	{
		id: 430,
		favorite: true,
		name: 'Nacional Inn Belo Horizonte',
		description: 'Localizado no coração comercial e financeiro de Belo Horizonte, próximo aos principais centros de decisão da capital mineira, centros de convenções (Minascentro, Expominas), principais avenidas da cidade, fácil acesso as saídas e entradas para a cidade e ',
		stars: '3',
		thumb: 'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_10.JPG',
		amenities: [
			{
				key: 'WI_FI',
				label: 'Internet'
			},
			{
				key: 'RESTAURANT',
				label: 'Restaurante'
			},
			{
				key: 'ROOM_SERVICE',
				label: 'Serviço de quarto'
			}
		],
		hasBreakFast: true,
		hasRefundableRoom: true,
		hasAgreement: false,
		nonRefundable: null,
		address: {
			street: 'Rua Espírito Santo',
			number: '215',
			district: 'Centro',
			city: 'Belo Horizonte',
			state: 'MG',
			country: 'BR',
			zipCode: null,
			fullAddress: 'Rua Espírito Santo, 215 - Centro'
		},
		images: [
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_10.JPG',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_11.JPG',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_12.JPG',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_13.JPG',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_3.jpg',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_5.jpg',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_6.jpg',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_7.jpg',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_8.jpg',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_9.jpg',
			'https://s3.amazonaws.com/e-htl/uploads/hotels/logotipos/10415.jpg'
		],
		deals: null,
		roomsQuantity: 2,
		price: 100
	},
])

const meta = ref<Meta>({
	totalCount: 1200
});
</script>
  