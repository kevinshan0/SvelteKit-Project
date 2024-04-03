<script>
    import { goto, afterNavigate } from '$app/navigation';
    import { state } from '$lib/stores/state.js'

    $: place = places[$state];

    let places = [
        {
            name: 'Hokkaido',
            src: '../Hokkaido.jpg'
        },
        {
            name: 'Kyoto',
            src: '../Kyoto.webp'
        },
        {
            name: 'Osaka',
            src: '../Osaka.webp'
        },
        {
            name: 'Tokyo',
            src: '../Tokyo.jpg'
        }
    ]

    afterNavigate(() => {
        addEventListener('wheel', updatePage);
        addEventListener('keydown', updatePage);
    })

    async function updatePage(e) {
        removeEventListener('wheel', updatePage);
        removeEventListener('keydown', updatePage);

        if ((e.type == ' wheel' && e.deltaY > 0) || (e.type == 'keydown' && e.keyCode == 40))
            state.update(n => (n + 1) % places.length);

        if ((e.type == 'wheel' && e.deltaY < 0) || (e.type == 'keydown' && e.keyCode == 38))
            state.update(n => (places.length + n - 1) % places.length);

        goto(`../${places[$state].name}`);
    }
</script>

<h1>{place.name}</h1>
<img src={place.src} alt={place.name}>