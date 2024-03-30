<script>
    import { goto } from '$app/navigation';

    function clickHandler() {
        goto('/Hokkaido');
    }
</script>

<button on:click={clickHandler}></button>