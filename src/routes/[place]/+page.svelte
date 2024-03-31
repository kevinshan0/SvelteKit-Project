<script>
    import { goto, afterNavigate } from '$app/navigation';
    import { state } from '$lib/stores/state.js'

    let places = [
        'Hokkaido',
        'Kyoto',
        'Osaka',
        'Tokyo'
    ]

    afterNavigate(() => {
        addEventListener('wheel', updatePage, {once: true});
        addEventListener('keydown', updatePage, {once: true});
    })

    async function updatePage(e) {
        if ((e.type == 'wheel' && e.deltaY > 0) || (e.type == 'keydown' && e.keyCode == 40))
            state.update(n => (n + 1) % places.length);

        if ((e.type == 'wheel' && e.deltaY < 0) || (e.type == 'keydown' && e.keyCode == 38))
            state.update(n => (places.length + n - 1) % places.length);

        goto(`../${places[$state]}`);
    }
</script>

<div>{places[$state]}</div>