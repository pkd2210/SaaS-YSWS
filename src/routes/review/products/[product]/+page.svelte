<script>
  import { page } from '$app/stores';

  $: id = $page.params.product;
</script>

<h1>Number: {id}</h1>