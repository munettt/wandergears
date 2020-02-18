<template>
  <Layout class="px-5 md:px-1">
    <h1 class="mb-2 text-2xl">About us</h1>
    <form name="contact" method="POST" data-netlify="true" class="min-h-screen">
      <p class="mb-3">
        <label>
          Your Name:
          <input type="text" name="name" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " required />
        </label>
      </p>
      <p class="mb-3">
        <label>
          Your Email:
          <input type="email" name="email" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " required />
        </label>
      </p>
      <p class="mb-3">
        <label>
          Message:
          <textarea name="message" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " required></textarea>
        </label>
      </p>
      <p>
        <button type="submit" class="bg-purple-600 hover:bg-purple-700 focus:outline-none text-white py-1 px-4 rounded">Send</button>
      </p>
    </form>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Contact us"
  }
};
</script>
