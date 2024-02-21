<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const router = useRouter();

// Contoh data yang akan dikirim ke server
const orderData = ref({
    transaction_details: {
        order_id: "A11236544416tX0dQ4H297ID-1",
        gross_amount: 40000
    },
    item_details: [
        {
            id: "item01",
            price: 5000,
            quantity: 4,
            name: "Laptop Asus",
            brand: "BrandA",
            category: "KategoriA",
            merchant_name: "MerchantA"
        },
        {
            id: "item02",
            price: 10000,
            quantity: 1,
            name: "Laptop Acer",
            brand: "BrandB",
            category: "KategoriB",
            merchant_name: "MerchantB"
        },
        {
            id: "item03",
            price: 5000,
            quantity: 2,
            name: "Laptop Lenovo",
            brand: "BrandC",
            category: "KategoriC",
            merchant_name: "MerchantC"
        }
    ],
    customer_details: {
        first_name: "Achmat",
        last_name: "Fajri",
        email: "achmatfajri@gmail.com",
        phone: "081232819399",
        shipping_address: {
            first_name: "Laptop",
            last_name: "In",
            phone: "081232819399",
            address: "Jalani aja dulu",
            city: "Jakarta",
            postal_code: "12345",
            country_code: "IDN"
        }
    }
});

const startPayment = async () => {
  try {
    const response = await axios.post('http://localhost:3000/create-transaction', orderData.value);

    const transactionToken = response.data.token;

    window.snap.pay(transactionToken, {
      onSuccess: function(result) {
        console.log('Success', result);
        router.push('/success');

      },
      onPending: function(result) {
        console.log('Pending', result);
        router.push('/unfinish');
      },
      onError: function(result) {
        console.error('Error', result);
        router.push('/error');
      },
      onClose: function() {
        console.log('Customer closed the popup without finishing the payment');
      }
    });
  } catch (error) {
    console.error('Failed to fetch transaction token:', error);
  }
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
  script.setAttribute('data-client-key', 'SB-Mid-client-HVrRjIfqqZwv0T9U');
  document.head.appendChild(script);
});

// const transactionData = ref(null);

// const fetchTransactionData = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/transaction/A1342168725216tX0dQ4H297ID-1`);
//     transactionData.value = response.data;
//     console.log(transactionData.value);
//   } catch (error) {
//     console.error('Error fetching transaction data:', error);
//   }
// };

// onMounted(() => {
//   fetchTransactionData();
// });

// console.log(transactionData.value);
</script>

<template>
    <div v-if="transactionData">
    <h2>Transaction Details</h2>
    <p>Order ID: {{ transactionData.order_id }}</p>
    <p>Status: {{ transactionData.transaction_status }}</p>
    <p>Gross Amount: {{ transactionData.gross_amount }}</p>
  </div>
  <div>
    <button @click="startPayment">Bayar Sekarang</button>
  </div>
</template>